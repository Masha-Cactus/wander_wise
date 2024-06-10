"use client";

import { ProfileInfoSection } from "@/src/components/organisms";
import {
  RecentlyLikedSection,
  RecentlyReviewsSection,
} from "@/src/components/organisms";
import { Divider } from "../atoms";


const ProfilePage: React.FC = () => {
  return (
    <main className="grow bg-gray-10">
      <Divider />
      <div className="h-full w-full gap-6 p-4 justify-center grid grid-cols-12">
        <div className="col-span-4 h-full">
          <ProfileInfoSection />
        </div>

        <div className="col-span-8 flex flex-col gap-6">
          <RecentlyLikedSection />

          <RecentlyReviewsSection />
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
