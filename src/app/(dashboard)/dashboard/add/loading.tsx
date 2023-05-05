import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface LoadingProps {}

const Loading: FC<LoadingProps> = ({}) => {
  return (
    <div className="flex w-full flex-col gap-3">
      <Skeleton className="mb-4" height={60} width={500} />
      <Skeleton width={150} height={20} />
      <Skeleton width={400} height={50} />
    </div>
  );
};

export default Loading;