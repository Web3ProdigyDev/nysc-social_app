import Feed from "@/app/components/feed/Feed";
import LeftMenu from "@/app/components/leftMenu/LeftMenu";
import RightMenu from "@/app/components/rightMenu/RightMenu";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { notFound } from "next/navigation";

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  console.log('ProfilePage: Starting execution at', new Date().toISOString());

  const username = params.username;

  const user = await prisma.user.findFirst({
    where: {
      username,
    },
    include: {
      _count: {
        select: {
          posts: true,
          followers: true,
          followings: true,
        },
      },
    },
  });
  console.log('ProfilePage: Prisma user query result', user);

  if (!user) {
    console.log('ProfilePage: User not found for username', username);
    return notFound();
  }

  const { userId: currentUserId } = await auth(); // Add await for async auth()
  console.log('ProfilePage: currentUserId from auth()', currentUserId);

  let isBlocked = false;

  if (currentUserId) {
    const res = await prisma.block.findFirst({
      where: {
        blockedId: currentUserId, // TypeScript now satisfied since currentUserId is string
        blockerId: user.id,
      },
    });
    isBlocked = !!res;
    console.log('ProfilePage: Block check result', { isBlocked, blockedId: currentUserId, blockerId: user.id });
  } else {
    console.log('ProfilePage: No currentUserId, skipping block check');
  }

  if (isBlocked) {
    console.log('ProfilePage: User is blocked, returning notFound');
    return notFound();
  }

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="profile" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full h-64 relative">
              <Image
                src={user.cover || "/noCover.jpg"}
                alt=""
                fill
                className="rounded-md object-cover"
              />
              <Image
                src={user.avatar || "/noAvatar.png"}
                width={128}
                height={128}
                alt=""
                className="w-32 h-32 rounded-full absolute left-1/2 -translate-x-1/2 -bottom-16 ring-4 ring-white object-cover"
              />
            </div>
            <h1 className="mt-20 mb-4 text-2xl font-medium">
              {user.name && user.surname
              ? user.name + "" + user.surname 
              : user.username}
            </h1>
            <div className="flex items-center justify-center gap-12 mb-4">
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.posts}</span>
                <span className="text-sm">Posts</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.followers}</span>
                <span className="text-sm">Followers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.followings}</span>
                <span className="text-sm">Following</span>
              </div>
            </div>
          </div>
          <Feed />
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu user={user} />
      </div>
    </div>
  );
};

export default ProfilePage;