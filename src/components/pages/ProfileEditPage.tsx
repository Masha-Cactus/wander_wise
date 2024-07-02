'use client';

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useUser } from "@/src/store/user";
import { Divider, Heading2, Heading5, TextBase } from "@/src/components/atoms";
import { PrimaryButton, RoundedButton } from "@/src/components/molecules";
import { 
  ChangeUserEmailModal, 
  ChangeUserPasswordModal, 
  RestorePasswordModal,
  ProfileEditForm,
  SocialLinkForm,
  ConfirmEmailModal,
  DeleteProfileModal
} from "@/src/components/organisms";
import { StandardPageLayout } from "@/src/components/templates";

const ProfileEditPage = () => {
  const { user } = useUser();

  const [isShowChangeEmailModal, setIsShowChangeEmailModal] = useState(false);
  const [isShowChangePassModal, setIsShowChangePassModal] = useState(false);
  const [isShowRestorePasswordModal, setIsShowRestorePasswordModal] 
  = useState(false);
  const [isShowConfirmEmailModal, setIsShowConfirmEmailModal] 
  = useState(false);
  const [isShowDeleteProfileModal, setIsShowDeleteProfileModal] 
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
    <StandardPageLayout>
      <article 
        className="flex w-[670px] flex-col items-center gap-6 
        self-center rounded-3xl bg-white px-10 py-12"
      >
        <Heading2 
          text="Personal information" 
          font="semibold" 
          classes="self-start" 
        />

        <ProfileEditForm />

        <div className="flex w-full flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <Heading5 text="Email" font="medium" />
              <TextBase 
                text={user?.email || ''} 
                font="normal" 
                classes="text-gray-50" 
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
          <Divider />
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <Heading5 text="Password" font="medium" />
              <TextBase 
                text="********" 
                font="normal" 
                classes="text-gray-50" 
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

      <article className="flex w-[670px] flex-col items-center gap-6 
      self-center rounded-3xl bg-white px-10 py-12">
        <Heading2 
          text="Social networks" 
          font="semibold" 
          classes="self-start" 
        />

        <SocialLinkForm name="Website" />
        <SocialLinkForm name="Instagram" />
        <SocialLinkForm name="Twitter" />

      </article>

      <div className="w-[670px] self-center">
        <RoundedButton 
          text="Delete profile" 
          style="red"
          onClick={() => setIsShowDeleteProfileModal(true)}
        />
      </div>

      <AnimatePresence>
        {isShowChangeEmailModal && (
          <ChangeUserEmailModal
            key="changeUserEmailModal"
            onClose={() => setIsShowChangeEmailModal(false)}
            onOpenConfirmEmail={handleConfirmEmailOpen}
          />
        )}

        {isShowChangePassModal && (
          <ChangeUserPasswordModal
            key="changeUserPasswordModal"
            onClose={() => setIsShowChangePassModal(false)}
            onOpenRestorePasswordModal={handleRestorePassOpen}
          />
        )}

        {isShowRestorePasswordModal && (
          <RestorePasswordModal 
            key="restorePasswordModal"
            onClose={() => setIsShowRestorePasswordModal(false)}
          />
        )}

        {isShowConfirmEmailModal && (
          <ConfirmEmailModal
            key="confirmEmailModal"
            onClose={() => setIsShowConfirmEmailModal(false)}
          />
        )}

        {isShowDeleteProfileModal && (
          <DeleteProfileModal 
            key="deleteProfileModal"
            onClose={() => setIsShowDeleteProfileModal(false)}
          />
        )}
      </AnimatePresence>
    </StandardPageLayout>
  );
};

export default ProfileEditPage;