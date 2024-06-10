import { CollectionsPage } from "@/src/components/pages";
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Collections',
};

export default function Page() {
  return <CollectionsPage />;
}
