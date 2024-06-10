'use client';

import { IconButton } from "@/src/components/molecules";
import { Icons, TextBase, Heading5 } from "@/src/components/atoms";
import { DeleteReviewModal, Stars } from "@/src/components/organisms";
import { IComment } from "@/src/services";
import { memo, useState } from "react";
import CreateReportModal from "../Modals/CreateReportModal";
import { useUser } from "@/src/store/user";

type Props = {
  review: IComment;
};

const ReviewCard: React.FC<Props> = ({ review }) => {
  const stars = new Array(5).fill(0).fill(1, 0, review.stars);
  const [isDeleteReviewModal, setIsDeleteReviewModal] = useState(false);
  const [isReportReviewModal, setIsReportReviewModal] = useState(false);
  const { user } = useUser();
  const isReviewedByUser = user?.pseudonym === review.author;

  return (
    <div 
      className="bg-white flex flex-col gap-4 rounded-2xl p-6 w-[440px]"
    >
      <div className="flex gap-4 items-start justify-between">
        <div className="flex gap-4">
          <div className="flex flex-col gap-1">
            <Heading5 text={review.author} font="semibold" />
            <Stars stars={stars} />
          </div>
        </div>

        <div className="flex gap-4">
          
          <IconButton 
            icon={<Icons.report className="w-6 h-6" />} 
            classes="p-0"
            onClick={() => setIsReportReviewModal(true)}
          />

          {isReviewedByUser && (
            <IconButton
              icon={<Icons.delete className="w-6 h-6" />}
              classes="p-0"
              onClick={() => setIsDeleteReviewModal(true)}
            />
          )}
        </div>
      </div>
      
      <TextBase text={review.text} font="normal" classes="text-gray-80" />

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

export default memo(ReviewCard);
