"use server";

import { User } from "@/generated/prisma";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import UserInfoCardInteraction from "./UserInfoCardInteraction";
import UpdateUser from "./UpdateUser";

const UserInfoCard = async ({ user }: { user: User }) => {
  const createdAtDate = new Date(user.createdAt);
  const formattedDate = createdAtDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const { userId: currentUserId } = auth();
  let isUserBlocked = false;
  let isFollowing = false;
  let isFollowingRequestSent = false;

  if (currentUserId) {
    const blockRes = await prisma.block.findFirst({
      where: {
        blockedId: { equals: currentUserId },
        blockerId: { equals: user.id },
      },
    });
    isUserBlocked = !!blockRes;

    const followRes = await prisma.follower.findFirst({
      where: {
        followerId: { equals: currentUserId },
        followingId: { equals: user.id },
      },
    });
    isFollowing = !!followRes;

    const followReqRes = await prisma.followRequest.findFirst({
      where: {
        senderId: { equals: currentUserId },
        receiverId: { equals: user.id },
      },
    });
    isFollowingRequestSent = !!followReqRes;
  }

  return (
    <div>
      <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
        {/* TOP */}
        <div className="flex justify-between items-center font-medium">
          <span className="text-gray-500">User Information</span>
          { currentUserId === user.id ? (<UpdateUser />) : (<Link href="/" className="text-green-500 text-xs">
            See all
          </Link>)}
        </div>
        {/* BOTTOM */}
        <div className="flex flex-col gap-4 text-gray-500">
          <div className="flex items-center gap-2">
            <span className="text-xl text-black">
              {(user.name && user.surname) ? `${user.name} ${user.surname}` : user.username}
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
          { currentUserId && currentUserId !== user.id && (
            <UserInfoCardInteraction
            userId={user.id}
            isUserBlocked={isUserBlocked}
            isFollowing={isFollowing}
            isFollowingSent={isFollowingRequestSent}
          />
        )}
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;