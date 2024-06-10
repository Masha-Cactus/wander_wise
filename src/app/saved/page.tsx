import { SavedPage } from "@/src/components/pages";
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Saved',
};

export default function Page() {
  return <SavedPage />;
}
