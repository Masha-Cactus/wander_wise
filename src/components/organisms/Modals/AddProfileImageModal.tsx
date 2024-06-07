import { memo } from "react";
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
    <ModalSkeleton 
      onClose={onClose}
      title="Add your profile picture"
    >
      <UploadProfileImageForm
        closeModal={onClose}
      />
    </ModalSkeleton>
  );
};

export default memo(AddProfileImageModal);