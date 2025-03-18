import * as React from "react";
import { LoaderCircle } from "lucide-react";

import { cn } from "@/libs/utils";

const spinnerVariants = "w-16 h-16 rounded-full animate-spin-slow";

interface LoadingSpinnerProps extends React.HTMLAttributes<SVGSVGElement> {
  className?: string;
}

const LoadingSpinner = React.forwardRef<SVGSVGElement, LoadingSpinnerProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <LoaderCircle
        ref={ref}
        className={cn(spinnerVariants, className)}
        {...rest}
      />
    );
  },
);

LoadingSpinner.displayName = "LoadingSpinner";

export { LoadingSpinner };
