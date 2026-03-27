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
    <div className="grid grid-cols-2">
      <div
        className="flex h-80 items-center justify-center p-6"
        style={{
          order: textSectionDirection === "right" ? -1 : 1,
        }}
      >
        <motion.img
          key={activeCardIndex}
          src={data[activeCardIndex].image}
          alt={data[activeCardIndex].title}
          className="h-full rounded-lg"
          initial={{ opacity: 0.35, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      <div
        ref={cardSectionRef}
        className="relative h-80 space-y-8 overflow-y-auto p-6"
        style={{
          direction: textSectionDirection === "right" ? "ltr" : "rtl",
          order: textSectionDirection === "right" ? 1 : -1,
        }}
      >
        {data.map((card, index) => (
          <p
            key={card.title}
            className="sticky top-0 h-full rounded-2xl border border-white/30 bg-white/40 p-8 shadow-[0px_0px_14px_6px_#ffffff1f] backdrop-blur-xl"
            style={{ zIndex: index + 1, direction: "ltr" }}
          >
            <span className="font-title text-2xl">{card.title}</span>
            <br />
            <span className="mt-4 inline-block">{card.body}</span>
          </p>
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
