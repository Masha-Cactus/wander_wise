import Image from "next/image";
import Link from "next/link";

import { Icons } from "@/src/components/moleculs";
import { Divider } from "@/src/components/atoms";
// import { useUser } from "@/app/store/user";

const ProfileInfo: React.FC = () => {
  // const { user } = useUser();
  const user = {
    id: 1,
    name: "John Doe",
    lastName: "Doe",
    pseudonym: "johndoe",
    description: "I'm a description",
    email: "nU0wv@example.com",
    location: "Seaside, USA",
    image:
      // eslint-disable-next-line max-len
      "https://images.stockcake.com/public/7/5/2/752210ff-3ce6-447b-8529-7deec989d405_large/wriggling-earthworm-closeup-stockcake.jpg",
    colections: [],
    sotials: ["instagram", "twitter", "facebook"],
    saved: [],
    trips: [],
    reviews: [],
    liked: [],
  };
  const { name, description, location, image, pseudonym, email, sotials } 
  = user!;

  return (
    <div
      className="flex flex-col gap-4 bg-white p-6 rounded-2xl
    text-black text-base font-normal text-center py-12"
    >
      <div className="relative top-0 flex justify-center">
        <Image
          src={
            image
              ? image
              : `https://images.stockcake.com/public/7/5/2/752210ff-3ce6-447b-8529-7deec989d405_large/wriggling-earthworm-closeup-stockcake.jpg`
          }
          alt="profile"
          width={200}
          height={200}
          className="rounded-full w-1/3"
        />

        <div
          className="absolute bg-gray80 h-8 w-8 bottom-0 right-1/3 
          flex items-center justify-center rounded-full"
        >
          <Icons.edit className="text-white h-4 w-4" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-gray70 font-normal text-base">
          {pseudonym ? pseudonym : "beautifultraveler"}
        </p>

        <p className="text-2xl font-medium">{name}</p>
        {description && <p>{description}</p>}
      </div>

      <Divider classes="w-full h-px bg-gray20" />

      <div className="flex flex-col gap-2 text-start">
        {location && (
          <div className="flex items-center gap-2">
            <Icons.location className="text-gray70 h-4 w-4" />
            <p>{location}</p>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Icons.mail className="text-gray70 h-4 w-4" />
          <p>{email}</p>
        </div>
      </div>

      <Divider classes="w-full h-px bg-gray20" />

      {sotials.length > 0 && (
        <>
          <div className="flex flex-col gap-2">
            {sotials.map((sotial) => (
              <p key={sotial} className="text-gray70 text-start">
                {sotial}
              </p>
            ))}
          </div>

          <Divider classes="w-full h-px bg-gray20" />
        </>
      )}

      <Link
        href="/profile/edit"
        className="border border-black rounded-full p-2"
      >
        Edit profile
      </Link>
      <button className="bg-error text-white rounded-full p-2">Logout</button>
    </div>
  );
};

export default ProfileInfo;
