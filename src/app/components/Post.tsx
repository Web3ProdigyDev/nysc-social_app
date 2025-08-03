import Image from "next/image"
import Comments from "./Comments";

const Post = () => {
    return (
        <div className="flex flex-col gap-4">
            {/* USER */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Image
                        src="https://images.pexels.com/photos/32360758/pexels-photo-32360758.jpeg"
                        width={40}
                        height={40}
                        alt=""
                        className="w-10 h-10 rounded-full"
                    />
                    <span className="font-medium">Joseph Jombuti</span>
                </div>
                <Image
                    src="/more.png"
                    width={16}
                    height={16}
                    alt=""
                />
            </div>
            {/* DESCRIPTION */}
            <div className="flex flex-col gap-4">
                <div className="w-full min-h-96 relative">
                    <Image
                        src="https://images.pexels.com/photos/33151415/pexels-photo-33151415.jpeg"
                        fill
                        className="object-cover rounded-md"
                        alt=""
                    />
                </div>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero, voluptatum ut. Reiciendis excepturi libero quam aspernatur maiores, quidem ipsam illum nam vitae ducimus, quibusdam veniam repellat laborum est a eligendi.</p>
            </div>
            {/* INTERACTION */}
            <div className="flex items-center justify-between text-sm my-4">
                <div className="flex gap-8">
                    <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-xl">
                        <Image
                            src="/like.png"
                            width={16}
                            height={16}
                            className="cursor-pointer"
                            alt=""
                        />
                        <span className="text-gray-300">Like</span>
                        <span className="text-gray-500">123
                            <span className="hidden md:inline"> Likes</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-xl">
                        <Image
                            src="/comment.png"
                            width={16}
                            height={16}
                            className="cursor-pointer"
                            alt=""
                        />
                        <span className="text-gray-300"></span>
                        <span className="text-gray-500">123
                            <span className="hidden md:inline"> Comments</span>
                        </span>
                    </div>
                </div>
                <div className="">
                    <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-xl">
                        <Image
                            src="/share.png"
                            width={16}
                            height={16}
                            className="cursor-pointer"
                            alt=""
                        />
                        <span className="text-gray-300"></span>
                        <span className="text-gray-500">123
                            <span className="hidden md:inline"> Shares</span>
                        </span>
                    </div>
                </div>
            </div>
            <Comments />
        </div >
    );
};

export default Post
