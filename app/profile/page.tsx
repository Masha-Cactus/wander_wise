"use client";

import { ProfilePage } from "@/app/components/pages";
import { getUser } from "../services/user";
import { useUser } from "@/app/store/user";

const Page = () => {
  // const { setUser } = useUser();

  // const user = await getUser();

  // setUser(user);
  
  return (<ProfilePage />);
};

export default Page;
