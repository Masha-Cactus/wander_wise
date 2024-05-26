import { memo } from "react";
import { Heading } from "@/src/components/atoms";
import { 
  ModalSkeleton, 
  UploadProfileImageForm 
} from "@/src/components/organisms";

interface AddProfileImageModalProps {
  onClose: () => void;
}

const AddProfileImageModal: React.FC<AddProfileImageModalProps> = ({
  onClose,
}) => {
  return (
    <ModalSkeleton onClose={onClose}>
      <Heading text="Add your profile picture" font="normal"/>

      <UploadProfileImageForm
        closeModal={onClose}
      />

    </ModalSkeleton>
  );
};

export default memo(AddProfileImageModal);