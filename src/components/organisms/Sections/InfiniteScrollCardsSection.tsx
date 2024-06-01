import { useInfiniteSearchCards } from "@/src/queries";
import { ISearchCard } from "@/src/services";
import { memo, useEffect, useRef } from "react";

type Props = {
  filterParams: ISearchCard | null;
};

const InfiniteScrollCardsSection: React.FC<Props> = ({ filterParams }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteSearchCards(filterParams);

  const observerElem = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    const observedElement = observerElem.current;

    if (observedElement) {
      observer.observe(observedElement);
    }

    return () => {
      if (observedElement) {
        observer.unobserve(observedElement);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <section>
      <div ref={observerElem} className="h-px" />
    </section>
  );
};

export default memo(InfiniteScrollCardsSection);