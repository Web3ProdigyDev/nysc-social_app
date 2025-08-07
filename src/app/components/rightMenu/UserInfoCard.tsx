import { User } from "@/generated/prisma";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import UserInfoCardInteraction from "./UserInfoCardInteraction";

const UserInfoCard = async ({ user }: { user: User }) => {
  console.log('UserInfoCard: Starting execution at', new Date().toISOString());
  console.log('UserInfoCard: User data', user);

  const createdAtDate = new Date(user.createdAt);
  const formattedDate = createdAtDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  let isUserBlocked = false;
  let isFollowing = false;
  let isFollowingRequestSent = false;

  const { userId: currentUserId } = await auth(); // Ensure await for async auth()
  console.log('UserInfoCard: currentUserId from auth()', currentUserId);

  if (currentUserId) {
    const blockRes = await prisma.block.findFirst({
      where: {
        blockedId: currentUserId, // Now guaranteed to be string
        blockerId: user.id,
      },
    });
    isUserBlocked = !!blockRes;
    console.log('UserInfoCard: Block check result', { isUserBlocked, blockedId: currentUserId, blockerId: user.id });

    const followRes = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: user.id,
      },
    });
    isFollowing = !!followRes;
    console.log('UserInfoCard: Follow check result', { isFollowing, followerId: currentUserId, followingId: user.id });

    const followReqRes = await prisma.followRequest.findFirst({
      where: {
        senderId: currentUserId,
        receiverId: user.id,
      },
    });
    isFollowingRequestSent = !!followReqRes;
    console.log('UserInfoCard: Follow request check result', { isFollowingRequestSent, senderId: currentUserId, receiverId: user.id });
  } else {
    console.log('UserInfoCard: No currentUserId, skipping block/follow checks');
  }

  return (
    <div>
      <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
        {/* TOP */}
        <div className="flex justify-between items-center font-medium">
          <span className="text-gray-500">User Information</span>
          <Link href="/" className="text-green-500 text-xs">
            See All
          </Link>
        </div>
        {/* BOTTOM */}
        <div className="flex flex-col gap-4 text-gray-500">
          <div className="flex items-center gap-2">
            <span className="text-xl text-black">
              {(user.name && user.surname
                ? user.name + " " + user.surname
                : user.username)}
            </span>
            <span className="text-sm">@{user.username}</span>
          </div>
          {user.description && <p>{user.description}</p>}
          {user.city && (
            <div className="flex items-center gap-2">
              <Image src="/map.png" alt="" width={16} height={16} />
              <span>
                Posted to <b>{user.city}</b>
              </span>
            </div>
          )}
          {user.school && (
            <div className="flex items-center gap-2">
              <Image src="/school.png" alt="" width={16} height={16} />
              <span>
                Went to <b>{user.school}</b>
              </span>
            </div>
          )}
          {user.work && (
            <div className="flex items-center gap-2">
              <Image src="/work.png" alt="" width={16} height={16} />
              <span>
                PPA: <b>{user.work}</b>
              </span>
            </div>
          )}
          <div className="flex items-center justify-between">
            {user.website && (
              <div className="flex gap-1 items-center">
                <Image src="/link.png" alt="" width={16} height={16} />
                <Link href={user.website} className="text-green-500 font-medium">
                  {user.website}
                </Link>
              </div>
            )}
            <div className="flex gap-1 items-center">
              <Image src="/date.png" alt="" width={16} height={16} />
              <span>Joined {formattedDate}</span>
            </div>
          </div>
          <UserInfoCardInteraction 
          userId={user.id} 
          currentUserId={currentUserId} 
          isUserBlocked={isUserBlocked} 
          isFollowing={isFollowing} 
          isFollowingRequestSent={isFollowingRequestSent}/>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;