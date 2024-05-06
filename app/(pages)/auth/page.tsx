import ModalSkeleton from "../../components/organisms/Modals/ModalSkeleton";
import MetaForm from "../../components/organisms/Modals/MetaForm";

const AuthPage = ({}) => {
  return (
    <div className="scroll-none">
      <ModalSkeleton path="back">
        <MetaForm />
      </ModalSkeleton>
    </div>
  );
};

export default AuthPage;
