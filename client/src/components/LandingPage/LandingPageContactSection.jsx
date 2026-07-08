import { EmailSvg, TwitterSvg } from "@/assets/icons";

function LandingPageContactSection() {
  return (
    <section className="my-32 scroll-m-20" id="contact">
      <h2 className="text-center font-title text-3xl font-bold md:text-4xl lg:text-5xl">
        Contact Us
      </h2>

      <div className="mt-16 grid grid-cols-1 items-center justify-center gap-4 lg:grid-cols-3 lg:gap-6">
        <p className="col-span-1 p-2 text-sm text-subtext lg:col-span-2">
          <span className="mb-2 inline-block">
            We’d love to hear from you. Whether you have questions, feedback,
            suggestions, or just want to share your experience with ARISE, feel
            free to reach out to our team. Every message helps us improve and
            build a better platform to fight procrastination and support your
            productivity journey. We’re always here to listen, learn, and grow
            with you.
          </span>
          <span className="inline-block">
            You can contact us using the details provided below, or reach out
            directly to the developers through their social handles listed on
            the About page under the Team section. We’re always open to
            connecting and would be happy to assist you.
          </span>
        </p>

        <div className="col-span-1">
          <div className="flex flex-col items-start justify-between overflow-hidden rounded-xl border-2 border-white bg-[#dadaeb]/50 py-2 text-sm text-subtext shadow-[0px_0px_14px_6px_#dadaeb69] backdrop-blur-lg">
            <div className="my-1 px-4">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=dynamosdev0@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-w-0 items-center justify-start break-words underline-offset-2 hover:underline"
              >
                <img
                  src={EmailSvg}
                  alt="Email"
                  loading="lazy"
                  className="mr-6 w-6"
                />
                <span className="min-w-0 transition-all group-hover:opacity-50 group-active:scale-95">
                  dynamosdev0@gmail.com
                </span>
              </a>
            </div>
            <hr className="my-1 w-full border border-white" />
            <div className="my-1 px-4">
              <a
                href="https://x.com/dynamos_dev"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-w-0 items-center justify-start break-words underline-offset-2 hover:underline"
              >
                <img
                  src={TwitterSvg}
                  alt="Twitter"
                  loading="lazy"
                  className="mr-4 w-8"
                />
                <span className="min-w-0 transition-all group-hover:opacity-50 group-active:scale-95">
                  Follow us on X
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingPageContactSection;
