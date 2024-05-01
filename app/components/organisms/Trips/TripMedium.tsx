import Image from "next/image";
import Link from "next/link";

import { Divider } from "@/app/components/atoms";
import { IconButton, PrimaryBtn, Icons } from "@/app/components/moleculs/";
import { TripLongType } from "../../../types/TripType";
import { useUser } from "@/app/store/user";
import { UserType } from "@/app/types/User";

type Props = {
  card: TripLongType;
};

const classes = "bg-gray80 text-white rounded-full px-4 py-2";

const TripMedium: React.FC<Props> = ({ card }) => {
  const { setUser, user } = useUser();

  const saveTrip = (id: number) => {
    const tripIndex = user?.saved.findIndex((trip) => trip.id === id);
    const newSaved = [...(user?.saved || [])];
  
    if (tripIndex) {
      newSaved.splice(tripIndex, 1);
    } else {
      newSaved.push(card);
    }
  
    const newUser: UserType = {
      ...(user as UserType),
      saved: newSaved,
    };
  
    setUser(newUser);
  };

  return (
    <article
      className="flex flex-col gap-4 justify-between items-center 
      round bg-white p-4"
    >
      <Link href={`/trips/${card.id}`} className="w-full">
        <Image
          src={card.image}
          alt={card.name}
          width={200}
          height={200}
          className="w-full h-full object-cover round"
        />
      </Link>
      <Link href={`/trips/${card.id}`} className="flex flex-col gap-4">
        <div className="flex gap-2">
          <IconButton
            icon={<Icons.heart />}
            text={card.likes.toString()}
            classes={classes}
          />

          <IconButton icon={<Icons.share />} text="Share" classes={classes} />

          <IconButton icon={<Icons.report />} text="Report" classes={classes} />

          <IconButton
            icon={<Icons.user />}
            text={card.author === "AI" ? "AI" : "User"}
            classes={classes}
          />
        </div>
        <Divider classes="w-full h-px" />
        <h2 className="text-xl font-medium">{card.name}</h2>
        <p className="text-base font-regular">{card.location}</p>
      </Link>

      <PrimaryBtn text="Save" onClick={() => saveTrip(card.id)} />
    </article>
  );
};

export default TripMedium;
