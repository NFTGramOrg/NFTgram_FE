import Leftbar from "@/components/Leftbar";
import Profile from "@/components/Profile";
import Rightsection from "@/components/Rightsection";
import { useRouter } from "next/router";

export default function Account() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="w-full h-full flex justify-center items-center relative bg-bgcolor">
      <div className=" max-w-screen-2xl w-full h-full flex relative">
        <Leftbar />
        <main className="ml-[295px] flex w-[900px] p-6 min-h-screen g-full flex-col border-l-[0.5px] border-r border-accent">
          <Profile accountId={id as string} />
        </main>
        <Rightsection />
      </div>
    </div>
  );
}
