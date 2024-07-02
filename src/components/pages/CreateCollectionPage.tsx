import { Heading3 } from "@/src/components/atoms";
import { CreateCollectionForm } from "@/src/components/organisms";
import { StandardPageLayout } from "@/src/components/templates";

const CreateCollectionPage = () => {
  return (
    <StandardPageLayout>
      <article 
        className="flex w-[670px] flex-col items-center gap-6 
        self-center rounded-3xl bg-white px-10 py-12"
      >
        <Heading3 
          text="Create new collection" 
          classes="self-start" 
        />

        <CreateCollectionForm />
      </article>
    </StandardPageLayout>
  );
};

export default CreateCollectionPage;