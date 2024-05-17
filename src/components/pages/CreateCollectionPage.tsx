import { Heading3 } from "@/src/components/atoms";
import { CreateCollectionForm } from "@/src/components/organisms";
import { FormPageLayout } from "@/src/components/layouts";


const CreateCollectionPage = () => {
  return (
    <FormPageLayout>
      <article className="w-[670px] self-center flex flex-col gap-6 
          items-center bg-white px-10 py-12 rounded-3xl">
        <Heading3 
          text="Create new collection" 
          classes="self-start" 
        />

        <CreateCollectionForm />
      </article>
    </FormPageLayout>
  );
};

export default CreateCollectionPage;