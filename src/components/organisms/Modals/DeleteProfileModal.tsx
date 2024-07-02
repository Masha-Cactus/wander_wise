"use client";

import { memo } from "react";
import { ModalTemplate } from "@/src/components/organisms";
import { ErrorText } from "@/src/components/atoms";
import { RoundedButton } from "@/src/components/molecules";
import { useDeleteUser } from "@/src/queries";
import { useNormalizedError } from "@/src/hooks";

interface DeleteProfileModalProps {
  onClose: () => void;
}

const DeleteProfileModal: React.FC<DeleteProfileModalProps> = ({
  onClose,
}) => {
  const { isPending, mutate } = useDeleteUser();

  const [errorMessage, setErrorMessage] = useNormalizedError();

  const handleDeleteProfile = () => {
    mutate(undefined, { 
      onError: (e) => setErrorMessage(e),
      onSuccess: onClose,
    });
  };

  return (
    <ModalTemplate 
      onClose={onClose}
      title="Delete your profile?"
      subtitle="This action cannot be undone 🫣"
    >
      <div className="grid w-full grid-cols-2 gap-5">
        <RoundedButton
          text="Delete"
          onClick={handleDeleteProfile}
          style='red'
          disabled={isPending}
        />
        <RoundedButton
          text="Cancel"
          onClick={onClose}
          style="light"
        />
      </div>

      {errorMessage && <ErrorText errorText={errorMessage} />}
    </ModalTemplate>
  );
};

export default memo(DeleteProfileModal);