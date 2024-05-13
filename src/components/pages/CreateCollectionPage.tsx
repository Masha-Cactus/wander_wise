import { BackButton } from "@/src/components/moleculs";
import { Heading3 } from "@/src/components/atoms";
import { CreateCollectionForm } from "@/src/components/organisms";


const CreateCollectionPage = () => {
  return (
    <main className="h-full bg-gray10 p-10 flex flex-col 
        gap-8 overflow-scroll">
      <BackButton />
      <article className="w-[670px] self-center flex flex-col gap-6 
          items-center bg-white px-10 py-12 rounded-3xl">
        <Heading3 
          text="Create new collection" 
          classes="self-start" 
        />

        <CreateCollectionForm />
      </article>
    </main>
  );
};

export default CreateCollectionPage;