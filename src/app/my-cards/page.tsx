import { MyCardsPage } from "@/src/components/pages";
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'My cards',
};

export default function Page() {
  return <MyCardsPage />;
}
