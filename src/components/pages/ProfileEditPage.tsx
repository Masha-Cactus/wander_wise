'use client';

import { useUser } from "@/src/store/user";
import { useRouter } from "next/navigation";
import { Divider } from "../atoms";
import { BackButton, PrimaryButton } from "../moleculs";
import ProfileEditForm from "../organisms/Forms/ProfileEditForm";
import SocialLinkForm from "../organisms/Forms/SocialLinkForm";

const ProfileEditPage = () => {
  const {user} = useUser();
  const { push } = useRouter();

  return (
    <section className="h-full bg-gray10 p-10 flex flex-col 
    gap-8 overflow-scroll">
      <BackButton />
      <article className=" w-1/3 self-center flex flex-col gap-6 items-center 
      bg-white px-10 py-12 rounded-3xl">
        <h3 className="self-start font-display text-2xl 
        font-bold text-gray-900">
              Personal information
        </h3>

        <ProfileEditForm />

        <div className="w-full flex flex-col gap-4">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h6 className="text-black text-lg">Email</h6>
              <p className="text-gray70">{user?.email}</p>
            </div>
            <div className="w-32">
              <PrimaryButton 
                text="Change" 
                onClick={() => push('/profile/edit/email')} 
              />
            </div>
          </div>
          <Divider classes="w-full h-px" />
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h6 className="text-black text-lg">Password</h6>
              <p className="text-gray70">********</p>
            </div>
            <div className="w-32">
              <PrimaryButton 
                text="Change" 
                onClick={() => push('/profile/edit/password')} 
              />
            </div>
          </div>
        </div>
      </article>

      <article className=" w-1/3 self-center flex flex-col gap-6 items-center 
      bg-white px-10 py-12 rounded-3xl">
        <h3 className="self-start font-display text-2xl 
        font-bold text-gray-900">
              Social networks
        </h3>

        <SocialLinkForm name="Website" />
        <SocialLinkForm name="Instagram" />
        <SocialLinkForm name="Twitter" />
      </article>
    </section>
  );
};

export default ProfileEditPage;