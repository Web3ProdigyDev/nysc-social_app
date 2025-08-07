import Link from "next/link";
import ProfileCard from "./ProfileCard";
import Image from "next/image";
import Ad from "../Ad";

const LeftMenu = ({ type }: { type: "home" | "profile" }) => {
  return (
    <div className="flex flex-col gap-6">
      {type === "home" && <ProfileCard />}
      <div className="p-4 bg-white rounded-lg shadow-md text-sm text-gray-500 flex flex-col gap-2">
        <Link
          href="/"
          className="flex items-center gap-5 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image width="20" height="20" src="/posts.png" alt="" />
          <span>My Posts</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-5 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image width="20" height="20" src="/activity.png" alt="" />
          <span>Activity</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-5 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image width="20" height="20" src="/market.png" alt="" />
          <span>Marketplace</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-5 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image width="20" height="20" src="/events.png" alt="" />
          <span>Events</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-5 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image width="20" height="20" src="/albums.png" alt="" />
          <span>Albums</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-5 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image width="20" height="20" src="/videos.png" alt="" />
          <span>Videos</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-5 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image width="20" height="20" src="/news.png" alt="" />
          <span>News</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-5 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image width="20" height="20" src="/courses.png" alt="" />
          <span>Courses</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-5 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image width="20" height="20" src="/lists.png" alt="" />
          <span>Lists</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-5 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image width="20" height="20" src="/settings.png" alt="" />
          <span>Settings</span>
        </Link>
      </div>
      <Ad size={"sm"} />
    </div>
  );
};

export default LeftMenu;
