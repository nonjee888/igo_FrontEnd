import { useRef, useEffect } from "react";

const FetchMore = ({ lastPosts, likedPosts, setCursor }) => {
  const fetchMoreTrigger = useRef(null);
  const fetchMoreObserver = new IntersectionObserver(([{ isIntersecting }]) => {
    if (isIntersecting) setCursor((prev) => lastPosts.at(-1).id);
  });

  useEffect(() => {
    let observerRefValue = null;
    fetchMoreObserver.observe(fetchMoreTrigger.current);
    observerRefValue = fetchMoreTrigger.current;
    return () => {
      if (observerRefValue) fetchMoreObserver.unobserve(observerRefValue);
    };
  }, [lastPosts, likedPosts]);
  return <div className="more-box" ref={fetchMoreTrigger} />;
};

export default FetchMore;
