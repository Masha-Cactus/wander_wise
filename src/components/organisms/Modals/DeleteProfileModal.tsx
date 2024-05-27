"use client";

import { memo, useState } from "react";
import ModalSkeleton from "./ModalSkeleton";
import { ErrorText, Heading, Heading4 } from "@/src/components/atoms";
import { RoundedButton } from "@/src/components/moleculs";
import { useDeleteUser } from "@/src/queries";
import { normalizeError } from "@/src/lib/helpers";

interface DeleteProfileModalProps {
  onClose: () => void;
}

const DeleteProfileModal: React.FC<DeleteProfileModalProps> = ({
  onClose,
}) => {
  const { isPending, mutate, isError } = useDeleteUser();

  const [errorMessage, setErrorMessage] = useState("");

  const handleError = (error: any) => {
    setErrorMessage(normalizeError(error.message));
  };

  const handleDeleteProfile = () => {
    mutate(undefined, { 
      onError: handleError,
      onSuccess: () => onClose(),
    });
  };

  return (
    <ModalSkeleton onClose={onClose}>
      <Heading text="Delete your profile?" font="normal"/>
      <Heading4 text="This action cannot be undone 🫣" font="normal"/>

      <div className="flex w-full gap-5 justify-between">
        <RoundedButton
          text="Delete"
          onClick={handleDeleteProfile}
          classes="grow"
          style='red'
          disabled={isPending}
        />
        <RoundedButton
          text="Cancel"
          onClick={onClose}
          classes="grow"
          style="light"
        />
      </div>

      {isError && <ErrorText errorText={errorMessage} />}
    </ModalSkeleton>
  );
};

export default memo(DeleteProfileModal);