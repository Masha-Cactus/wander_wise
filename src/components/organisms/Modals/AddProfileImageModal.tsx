import { memo } from "react";
import { 
  ModalTemplate, 
  UploadProfileImageForm 
} from "@/src/components/organisms";

interface AddProfileImageModalProps {
  onClose: () => void;
}

const AddProfileImageModal: React.FC<AddProfileImageModalProps> = ({
  onClose,
}) => {
  return (
    <ModalTemplate 
      onClose={onClose}
      title="Edit your profile picture"
    >
      <UploadProfileImageForm
        closeModal={onClose}
      />
    </ModalTemplate>
  );
};

export default memo(AddProfileImageModal);