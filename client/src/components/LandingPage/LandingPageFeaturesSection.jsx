import {
  FeatureRank,
  FeatureRoom,
  FeatureRoomChat,
  FeatureRoomPage,
  FeatureTask,
} from "@/assets/images";

function LandingPageFeaturesSection() {
  return (
    <section className="my-32 scroll-m-20" id="features">
      <h2 className="text-center font-title text-3xl font-bold md:text-4xl lg:text-5xl">
        Features
      </h2>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3">
        <div className="relative flex h-[24rem] flex-col justify-between overflow-hidden border-b-2 border-r-2 border-white p-2 md:col-span-2">
          <div className="z-[5]">
            <p className="text-[0.7rem] font-extrabold tracking-[0.3rem] text-purple-500">
              TASK LIST
            </p>
            <p className="mt-2 font-title text-xl font-bold md:text-3xl">
              Personal Task Management
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Organize and prioritize your tasks with our intuitive interface.
            </p>
          </div>

          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={FeatureTask}
              alt="Arise task management feature preview"
              loading="eager"
              decoding="async"
              width="1200"
              height="800"
              className="h-full w-full object-cover object-left lg:object-center"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to top, black 0%, transparent 60%)",
                maskImage: "linear-gradient(to top, black 0%, transparent 60%)",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
              }}
            />
          </div>
        </div>

        <div className="relative col-span-1 flex h-[24rem] flex-col justify-between overflow-hidden border-b-2 border-l-2 border-white p-2">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={FeatureRoom}
              alt="Arise room collaboration feature preview"
              loading="eager"
              decoding="async"
              width="1000"
              height="800"
              className="h-full w-full object-cover object-left lg:object-top"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to top, black 0%, transparent 60%)",
                maskImage: "linear-gradient(to top, black 0%, transparent 60%)",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
              }}
            />
          </div>

          <div className="z-[5] text-right">
            <p className="text-[0.7rem] font-extrabold tracking-[0.3rem] text-purple-500">
              ROOMS
            </p>
            <p className="mt-2 font-title text-xl font-bold md:text-3xl">
              Collaborate
              <br />
              with your team
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Create a room to collaborate And organize tasks with team in
              real-time.
            </p>
          </div>
        </div>

        <div className="relative flex h-[24rem] flex-col justify-center overflow-hidden border-y-2 border-white p-2 md:col-span-3">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={FeatureRoomPage}
              alt="Arise shared room workspace preview"
              loading="eager"
              decoding="async"
              width="1400"
              height="800"
              className="h-full w-full object-cover object-left-top"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, black 0%, transparent 50%)",
                maskImage:
                  "linear-gradient(to right, black 0%, transparent 50%)",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
              }}
            />
          </div>

          <div className="z-[5] text-right">
            <p className="text-[0.7rem] font-extrabold tracking-[0.3rem] text-purple-500">
              ROOM FEATURES
            </p>
            <p className="mt-2 font-title text-xl font-bold md:text-3xl">
              Sync with Team in Real-Time
            </p>
            <p className="mt-1 text-sm text-gray-500">
              <span>
                Stay organized and on top of your tasks with our shared task
                lists.
              </span>
              <br />
              <span className="my-2 inline-block">
                Communicate with your team in real-time through our intuitive
                chat interface.
              </span>
              <br />
              <span>
                Get rewarded for your efforts and contributions with an engaging
                points system.
              </span>
            </p>
          </div>
        </div>

        <div className="relative col-span-1 flex h-[24rem] flex-col justify-between overflow-hidden border-r-2 border-t-2 border-white p-2">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={FeatureRoomChat}
              alt="Arise team chat feature preview"
              loading="eager"
              decoding="async"
              width="1000"
              height="800"
              className="h-full w-full object-cover object-left lg:object-top"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 0%, transparent 60%)",
                maskImage:
                  "linear-gradient(to bottom, black 0%, transparent 60%)",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
              }}
            />
          </div>

          <div className="absolute bottom-0 right-0 z-[5]">
            <p className="text-[0.7rem] font-extrabold tracking-[0.3rem] text-purple-500">
              CHAT
            </p>
            <p className="mt-2 font-title text-xl font-bold md:text-3xl">
              Stay Updated <br /> with Your Team
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Chat with your team in real-time, share updates, and stay
              connected
            </p>
          </div>
        </div>

        <div className="relative flex h-[24rem] flex-col justify-between overflow-hidden border-l-2 border-t-2 border-white p-2 md:col-span-2">
          <div className="absolute bottom-0 right-0 z-[5] text-right">
            <p className="text-[0.7rem] font-extrabold tracking-[0.3rem] text-purple-500">
              LEADERBOARD
            </p>
            <p className="mt-2 font-title text-xl font-bold md:text-3xl">
              Compete and Earn Rewards
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Stack up points, climb the leaderboard, and earn rewards for your
              hard work.
            </p>
          </div>

          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={FeatureRank}
              loading="eager"
              decoding="async"
              width="1200"
              height="800"
              className="h-full w-full object-cover object-left-top"
              alt="Arise leaderboard feature preview"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 0%, transparent 60%)",
                maskImage:
                  "linear-gradient(to bottom, black 0%, transparent 60%)",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingPageFeaturesSection;
