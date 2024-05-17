import { Heading2 } from "@/src/components/atoms";
import { EditCardForm } from "@/src/components/organisms";
import { FormPageLayout } from "@/src/components/layouts";

const EditCardPage = () => {
  return (
    <FormPageLayout>
      <article className="w-[670px] self-center flex flex-col gap-6 
      items-center bg-white px-10 py-12 rounded-3xl">
        <Heading2 
          text="Edit your card" 
          font="semibold" 
          classes="self-start" 
        />

        <EditCardForm />
      </article>
    </FormPageLayout>
  );
};

export default EditCardPage;