import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import PropTypes from "prop-types";

function CardScroll({ data, textSectionDirection = "left" }) {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const cardSectionRef = useRef(null);

  const { scrollY: cardScrollY } = useScroll({
    container: cardSectionRef,
  });

  useMotionValueEvent(cardScrollY, "change", (latest) => {
    const el = cardSectionRef.current;
    if (!el) return;

    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll <= 0) {
      setActiveCardIndex(0);
      return;
    }

    const progress = latest / maxScroll;
    const nextIndex = Math.round(progress * (data.length - 1));
    const clampedIndex = Math.max(0, Math.min(data.length - 1, nextIndex));
    setActiveCardIndex(clampedIndex);
  });

  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
      <div
        className="flex h-80 items-center justify-center p-2 md:p-6"
        style={{
          order: textSectionDirection === "right" ? -1 : 1,
        }}
      >
        <motion.img
          key={activeCardIndex}
          src={data[activeCardIndex].image}
          alt={data[activeCardIndex].title}
          className="h-full w-full rounded-lg object-cover object-left-top shadow-lg"
          initial={{ opacity: 0.35, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      <div
        ref={cardSectionRef}
        className="relative h-[24rem] space-y-8 overflow-y-auto p-2 md:h-80 md:p-6"
        style={{
          direction: textSectionDirection === "right" ? "ltr" : "rtl",
          order: textSectionDirection === "right" ? 1 : -1,
        }}
      >
        {data.map((card, index) => (
          <div
            key={card.title}
            className="sticky top-0 h-full overflow-hidden rounded-2xl border border-white/30 bg-white/40 p-6 shadow-[0px_0px_14px_6px_#ffffff1f] backdrop-blur-xl md:p-8"
            style={{ zIndex: index + 1, direction: "ltr" }}
          >
            <div className="relative z-[5]">
              <p className="font-title text-2xl">{card.title}</p>
              <p className="mt-4 inline-block">{card.body}</p>
            </div>
            <span className="absolute -bottom-0 right-4 z-0 font-title text-[8rem] text-gray-300 md:-bottom-10 md:text-[10rem]">
              {index + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

CardScroll.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ).isRequired,
  textSectionDirection: PropTypes.oneOf(["left", "right"]),
};

export default CardScroll;
