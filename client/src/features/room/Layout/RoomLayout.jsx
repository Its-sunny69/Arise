import ShinyText from "@/shared/components/ShinyText";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function RoomLayout() {
  const location = useLocation();

  const crumbs = [{ label: "👥 | Room", to: "/room" }];

  if (location.pathname.includes("/create-join")) {
    crumbs.push({ label: "Create or Join" });
  }

  if (location.pathname.includes("/chat/")) {
    crumbs.push({ label: "Chat Room" });
  }

  return (
    <div className="gradient-bg mask-bg relative h-full overflow-y-auto rounded-xl border-2 border-white px-6">
      <div className="my-20 sm:my-10">
        <div className="flex w-fit gap-2 rounded-full border border-gray-400 px-5 py-1 text-sm">
          {crumbs.map((crumb, index) => (
            <div key={crumb.label} className="flex gap-2">
              {index > 0 ? <div className="text-gray-400">&gt;</div> : null}
              {crumb.to && crumbs.length > 1 ? (
                <Link to={crumb.to}>
                  <ShinyText
                    text={crumb.label}
                    disabled={false}
                    speed={3}
                    className="underline-offset-4 hover:underline"
                  />
                </Link>
              ) : (
                <ShinyText
                  text={crumb.label}
                  disabled={false}
                  speed={3}
                  className={`${!crumb.to && crumbs.length > 1 ? "text-[#6a51a3]" : ""}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <Outlet />
    </div>
  );
}
