import { Loading } from "@/assets/icons";

export default function PageLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <img src={Loading} alt="Loading..." className="h-12 w-12" />
    </div>
  );
}
