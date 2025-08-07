import Link from "next/link";
import Image from "next/image";
import { User } from "@/generated/prisma";

const UserMediaCard = ({ user }: { user: User }) => {
  return (
    <div>
      <div>
        <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
          {/* TOP */}
          <div className="flex justify-between items-center font-medium">
            <span className="text-gray-500">User Media</span>
            <Link href="/" className="text-green-500 text-xs">
              See All
            </Link>
          </div>
          {/* BOTTOM */}
          <div className="flex gap-4 justify-between flex-wrap">
            <div className="relative w-1/5 h-24">
              <Image
                src="https://images.pexels.com/photos/33123984/pexels-photo-33123984.jpeg"
                alt=""
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="relative w-1/5 h-24">
              <Image
                src="https://images.pexels.com/photos/33151108/pexels-photo-33151108.jpeg"
                alt=""
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="relative w-1/5 h-24">
              <Image
                src="https://images.pexels.com/photos/31972432/pexels-photo-31972432.jpeg"
                alt=""
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="relative w-1/5 h-24">
              <Image
                src="https://images.pexels.com/photos/33123984/pexels-photo-33123984.jpeg"
                alt=""
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="relative w-1/5 h-24">
              <Image
                src="https://images.pexels.com/photos/33151108/pexels-photo-33151108.jpeg"
                alt=""
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="relative w-1/5 h-24">
              <Image
                src="https://images.pexels.com/photos/31972432/pexels-photo-31972432.jpeg"
                alt=""
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="relative w-1/5 h-24">
              <Image
                src="https://images.pexels.com/photos/33151108/pexels-photo-33151108.jpeg"
                alt=""
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="relative w-1/5 h-24">
              <Image
                src="https://images.pexels.com/photos/31972432/pexels-photo-31972432.jpeg"
                alt=""
                fill
                className="object-cover rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMediaCard;
