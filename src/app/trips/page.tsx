import { TripsPage } from "@/src/components/pages";
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Trips',
};

export default function Page() {
  return <TripsPage />;
}
