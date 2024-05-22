'use client';

// import Image from "next/image";
import { IconButton } from "@/src/components/moleculs";
import { Icons, TextBase, Heading5 } from "@/src/components/atoms";
import { DeleteReviewModal, Stars } from "@/src/components/organisms";
import { IComment } from "@/src/services";
import { memo, useState } from "react";
import CreateReportModal from "../Modals/CreateReportModal";

type Props = {
  review: IComment;
};

const Review: React.FC<Props> = ({ review }) => {
  const stars = new Array(5).fill(0).fill(1, 0, review.stars);
  const [isDeleteReviewModal, setIsDeleteReviewModal] = useState(false);
  const [isReportReviewModal, setIsReportReviewModal] = useState(false);

  return (
    <div 
      className="bg-white flex flex-col gap-4 rounded-2xl p-6 group w-[440px]"
    >
      <div className="flex gap-4 items-start justify-between">
        <div className="flex gap-4">
          {/* <Image
            src={review.rewiewImage}
            alt="User image"
            width={50}
            height={50}
            className="rounded-full"
          /> */}

          <div className="flex flex-col gap-1">
            <Heading5 text={review.author} font="semibold" />
            <Stars stars={stars} />
          </div>
        </div>

        <div className="flex gap-4">
          <IconButton
            icon={<Icons.delete />}
            classes="hidden group-hover:block"
            onClick={() => setIsDeleteReviewModal(true)}
          />
          <IconButton 
            icon={<Icons.report />} 
            classes=""
            onClick={() => setIsReportReviewModal(true)}
          />
        </div>
      </div>
      
      <TextBase text={review.text} font="normal" classes="text-gray80" />

      {isDeleteReviewModal && (
        <DeleteReviewModal 
          commentId={review.id} 
          onClose={() => setIsDeleteReviewModal(false)} 
        />
      )}

      {isReportReviewModal && (
        <CreateReportModal 
          onClose={() => setIsReportReviewModal(false)}
          type="Comment"
          comment={review}
        />
      )}
    </div>
  );
};

export default memo(Review);
