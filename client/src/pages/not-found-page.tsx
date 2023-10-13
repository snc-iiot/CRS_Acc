import { FadeIn } from "@/components/common/framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { Link } from "react-router-dom";

const NotFoundPage: FC = () => {
  return (
    <FadeIn>
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
        <img src="/404.svg" alt="404" className="h-1/2 w-1/2" />
        <h1 className="text-center text-4xl font-bold">Page Not Found</h1>
        <Link to="/" className={cn(buttonVariants())}>
          Back to Home
        </Link>
      </div>
    </FadeIn>
  );
};

export default NotFoundPage;
