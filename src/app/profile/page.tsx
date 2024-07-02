import { ProfilePage } from "@/src/components/pages";
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Profile',
};

export default function Page () {
  return <ProfilePage />;
}

