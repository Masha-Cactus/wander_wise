import { Tab } from "@/src/components/organisms";
import { Divider, Heading2, Heading4, Icons } from "@/src/components/atoms";
import {
  IconButton,
  SaveButton,
  LikeButton,
} from "@/src/components/moleculs/";
import { CardImagesSection } from "@/src/components/organisms";
import { ICard } from "@/src/services";
import { memo } from "react";

type Props = {
  card: ICard;
};

const TripLongCard: React.FC<Props> = ({ card }) => {
  const tabs = {
    'Description': card.description,
    "Why this place?": card.whyThisPlace,
    'Map': card.mapLink,
  };

  return (
    <article
      className="flex flex-col gap-2
      justify-between items-center"
    >
      <Heading2 text={card.name} classes="self-start mb-1" font="semibold" />

      <div className="gap-5 w-full grid grid-cols-12">
        <div className="col-span-5 flex flex-col gap-6">
          <div className="w-full flex gap-2">
            <Icons.location className="w-8 h-8" />
            <Heading4 text={card.whereIs} font="normal"/>
          </div>

          <div className="w-full overflow-scroll max-h-[550px]">
            <Tab tabs={tabs} />
          </div>

          <SaveButton cardId={card.id} />
        </div>

        <div className="col-span-7 flex flex-col gap-4">
          <div className="flex gap-4 w-full justify-end h-8">
            <LikeButton
              cardId={card.id}
              cardLikes={card.likes}
              classes=""
            />

            <Divider classes="w-px h-full bg-gray30" />

            <IconButton
              icon={card.author === "AI" ? <Icons.jpt /> : <Icons.user />}
              text={
                card.author === "AI" ? "Generated by AI" : `Created by ${card.author}`
              }
              classes="bg-black text-white rounded-full px-2 py-1"
            />

            <IconButton
              icon={<Icons.report />}
              text="Report Issue"
              classes="bg-transparent border border-error 
              text-error rounded-full px-2 py-1"
            />

            <Divider classes="w-px h-full bg-gray30" />

            <IconButton icon={<Icons.edit />} classes="" />

            <Divider classes="w-px h-full bg-gray30" />

            <IconButton icon={<Icons.share />} classes="" />
          </div>
          <div className="w-full">
            <CardImagesSection images={card.imageLinks} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default memo(TripLongCard);
