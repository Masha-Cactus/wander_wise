'use client';

import { memo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { IconButton, Stars } from "@/src/components/molecules";
import { Icons, TextBase, Heading5 } from "@/src/components/atoms";
import { 
  DeleteReviewModal, 
  CreateReportModal 
} from "@/src/components/organisms";
import { IComment } from "@/src/services";
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
      className="flex flex-col gap-4 rounded-2xl bg-white p-6"
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex gap-4">
          <div className="flex flex-col gap-1">
            <Heading5 text={review.author} font="semibold" />
            <Stars stars={stars} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <IconButton 
            icon={<Icons.report className="h-6 w-6 text-gray-70" />} 
            classes="p-0"
            onClick={() => setIsReportReviewModal(true)}
          />

          {isReviewedByUser && (
            <IconButton
              icon={<Icons.delete className="h-6 w-6 text-gray-70" />}
              classes="p-0"
              onClick={() => setIsDeleteReviewModal(true)}
            />
          )}
        </div>
      </div>
      
      <TextBase text={review.text} font="normal" classes="text-gray-80" />
      
      <AnimatePresence>
        {isDeleteReviewModal && (
          <DeleteReviewModal 
            key="deleteReviewModal"
            commentId={review.id} 
            onClose={() => setIsDeleteReviewModal(false)} 
          />
        )}

        {isReportReviewModal && (
          <CreateReportModal 
            key="createReportModal"
            onClose={() => setIsReportReviewModal(false)}
            type="Comment"
            comment={review}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(ReviewCard);
