const UserInfoCardInteraction = ({
    currentUserId,
    userId,
    isUserBlocked,
    isFollowing,
    isFollowingRequestSent,
} : {
    currentUserId: string;
    userId: string;
    isUserBlocked: boolean;
    isFollowing: boolean;
    isFollowingRequestSent: boolean;
}) => {
  return (
    <>
    <form action="">
        <button className="w-full bg-green-500 text-white text-sm rounded-md p-2">
            {isFollowing 
            ? "Following"
            : isFollowingRequestSent
            ? "Follow Request Sent"
            : "Follow"
        }
          </button>
    </form>
    <form action="" className="self-end">
          <span className="text-red-400 text-xs cursor-pointer">
            { isUserBlocked ? "Unblock User" : "Block User"}
          </span>
    </form>
    </>
  );
};

export default UserInfoCardInteraction
