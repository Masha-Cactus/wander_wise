'use client';

import { useUser } from "@/src/store/user";
import { useState } from "react";
import { Divider, Heading2, Heading5, TextBase } from "../atoms";
import { BackButton, PrimaryButton } from "../moleculs";
import { 
  ChangeUserEmailModal, 
  ChangeUserPasswordModal, 
  RestorePasswordModal,
  ProfileEditForm,
  SocialLinkForm,
} from "@/src/components/organisms";

const ProfileEditPage = () => {
  const { user } = useUser();

  const [isShowChangeEmailModal, setIsShowChangeEmailModal] = useState(false);
  const [isShowChangePassModal, setIsShowChangePassModal] = useState(false);
  const [isShowRestorePasswordModal, setIsShowRestorePasswordModal] 
  = useState(false);

  return (
    <main className="h-full bg-gray10 p-10 flex flex-col 
    gap-8 overflow-scroll">
      <BackButton />
      <article className="w-[670px] self-center flex flex-col gap-6 
      items-center bg-white px-10 py-12 rounded-3xl">
        <Heading2 
          text="Personal information" 
          font="semibold" 
          classes="self-start" 
        />

        <ProfileEditForm />

        <div className="w-full flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <Heading5 text="Email" font="medium" />
              <TextBase 
                text={user?.email || ''} 
                font="normal" 
                classes="text-gray70" 
              />
            </div>
            <div className="w-32">
              <PrimaryButton 
                text="Change" 
                onClick={() => setIsShowChangeEmailModal(true)}
                classes="h-10" 
              />
            </div>
          </div>
          <Divider classes="w-full h-px" />
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <Heading5 text="Password" font="medium" />
              <TextBase 
                text="********" 
                font="normal" 
                classes="text-gray70" 
              />
            </div>
            <div className="w-32">
              <PrimaryButton 
                text="Change" 
                onClick={() => setIsShowChangePassModal(true)} 
                classes="h-10"
              />
            </div>
          </div>
        </div>
      </article>

      <article className="w-[670px] self-center flex flex-col gap-6 
      items-center bg-white px-10 py-12 rounded-3xl">
        <Heading2 
          text="Social networks" 
          font="semibold" 
          classes="self-start" 
        />

        <SocialLinkForm name="Website" />
        <SocialLinkForm name="Instagram" />
        <SocialLinkForm name="Twitter" />
      </article>

      {isShowChangeEmailModal && (
        <ChangeUserEmailModal
          onClose={() => setIsShowChangeEmailModal(false)}
        />
      )}

      {isShowChangePassModal && (
        <ChangeUserPasswordModal
          onClose={() => setIsShowChangePassModal(false)}
          onOpenRestorePasswordModal={() => setIsShowRestorePasswordModal}
        />
      )}

      {isShowRestorePasswordModal && (
        <RestorePasswordModal 
          onClose={() => setIsShowRestorePasswordModal(false)}
        />
      )}
    </main>
  );
};

export default ProfileEditPage;