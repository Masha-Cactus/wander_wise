'use client';

import { useUser } from "@/src/store/user";
import { useState } from "react";
import { Divider, Heading2, Heading5, TextBase } from "@/src/components/atoms";
import { PrimaryButton } from "@/src/components/moleculs";
import { 
  ChangeUserEmailModal, 
  ChangeUserPasswordModal, 
  RestorePasswordModal,
  ProfileEditForm,
  SocialLinkForm,
  ConfirmEmailModal,
} from "@/src/components/organisms";
import { FormPageLayout } from "@/src/components/layouts";

const ProfileEditPage = () => {
  const { user } = useUser();

  const [isShowChangeEmailModal, setIsShowChangeEmailModal] = useState(false);
  const [isShowChangePassModal, setIsShowChangePassModal] = useState(false);
  const [isShowRestorePasswordModal, setIsShowRestorePasswordModal] 
  = useState(false);
  const [isShowConfirmEmailModal, setIsShowConfirmEmailModal] 
  = useState(false);

  const handleRestorePassOpen = () => {
    setIsShowChangePassModal(false);
    setIsShowRestorePasswordModal(true);
  };

  const handleConfirmEmailOpen = () => {
    setIsShowChangeEmailModal(false);
    setIsShowConfirmEmailModal(true);
  };

  return (
    <FormPageLayout>
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
          onOpenConfirmEmail={handleConfirmEmailOpen}
        />
      )}

      {isShowChangePassModal && (
        <ChangeUserPasswordModal
          onClose={() => setIsShowChangePassModal(false)}
          onOpenRestorePasswordModal={handleRestorePassOpen}
        />
      )}

      {isShowRestorePasswordModal && (
        <RestorePasswordModal 
          onClose={() => setIsShowRestorePasswordModal(false)}
        />
      )}

      {isShowConfirmEmailModal && (
        <ConfirmEmailModal
          onClose={() => setIsShowConfirmEmailModal(false)}
          type="Update"
        />
      )}
    </FormPageLayout>
  );
};

export default ProfileEditPage;