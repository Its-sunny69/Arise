function LandingPageFooterSection() {
  return (
    <footer className="relative m-3 flex min-h-[14rem] flex-col items-center justify-between overflow-hidden rounded-xl border-2 border-white bg-[#dadaeb]/50 p-4 text-xs text-subtext shadow-[0px_0px_14px_6px_#dadaeb69] backdrop-blur-lg md:text-sm lg:m-4">
      <div
        className="flex items-center justify-center font-title text-[8rem] font-bold leading-none text-[#54278f] md:text-[10rem] lg:text-[14rem]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, transparent 70%)",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 70%)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
        }}
      >
        arise
      </div>
      <div className="flex flex-col items-center justify-center gap-2 p-4 lg:flex-row lg:gap-1">
        <span>All rights reserved &copy; 2026 Made with ❤️ by Dev Dynamos</span>
        <span className="hidden lg:inline">|</span>
        <a
          href="https://x.com/dynamos_dev"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all hover:underline hover:opacity-70"
        >
          Follow us on X
        </a>
      </div>
    </footer>
  );
}

export default LandingPageFooterSection;
