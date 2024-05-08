import Stars from "../organisms/Stars";
import Image from "next/image";
import IconButton from "./IconButton";
import Icons from "./Icons";
import { IComment } from "@/src/types/Comment";

type Props = {
  review: IComment;
};

const Review: React.FC<Props> = ({ review }) => {
  const stars = new Array(5).fill(0);

  stars.fill(1, 0, review.stars);

  return (
    <div className="bg-white flex flex-col gap-4 span-1 round p-6 group">
      <div className="flex gap-4 items-start justify-between">
        <div className="flex gap-4">
          <Image
            src={review.rewiewImage}
            alt="User image"
            width={50}
            height={50}
            className="rounded-full"
          />

          <div className="flex flex-col justify-between">
            <p>{review.author}</p>
            <Stars stars={stars} />
          </div>
        </div>

        <div className="flex gap-4">
          <IconButton
            icon={<Icons.delete />}
            classes="hidden group-hover:block"
          />
          <IconButton icon={<Icons.report />} classes="" />
        </div>
      </div>
      <p>{review.text}</p>
    </div>
  );
};

export default Review;
