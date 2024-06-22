"use client";

import { memo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ReviewCard, CreateReviewModal } from "@/src/components/organisms";
import { Divider, Heading5, Heading3, Heading4 } from "@/src/components/atoms";
import { IComment } from "@/src/services";
import { useUser } from "@/src/store/user";

interface ReviewsListProps {
  reviews: IComment[];
};

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => {
  const [isPostReviewModal, setIsReviewModal] = useState(false);
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full justify-between">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Heading3 text="Reviews" />
            <Heading4 text={`(${reviews?.length || 0})`} font="normal" classes="text-gray-30" />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsReviewModal(true)}
          disabled={!user || user.banned}
        >
          <Heading5
            text="Post review" 
            font="semibold" 
            classes={
              "underline underline-offset-8 " 
              + (user ? '' : 'text-gray-30')
            }
          />
        </button>
      </div>

      <Divider />

      <div className="flex gap-4 overflow-x-scroll">
        {reviews.map((review) => (
          <ReviewCard review={review} key={review.id} />
        ))}
      </div>

      <AnimatePresence>
        {isPostReviewModal && (
          <CreateReviewModal
            key="createReviewModal"
            onClose={() => setIsReviewModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(ReviewsList);
