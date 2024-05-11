"use client";

import { ProfileInfoSection } from "@/src/components/organisms";
import {
  RecentlyLikedSection,
  RecentlyReviewsSection,
} from "@/src/components/organisms";


const ProfilePage: React.FC = () => {
  return (
    <div
      className="flex gap-6 p-4 justify-center 
    bg-gray10 grid grid-cols-12 grid-rows-auto h-full"
    >
      <div className="col-span-4 row-span-all">
        <ProfileInfoSection />
      </div>

      <div className="col-span-8 flex flex-col gap-6">
        <RecentlyLikedSection />

        <RecentlyReviewsSection />
      </div>
    </div>
  );
};

export default ProfilePage;
