
import React from 'react';
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen bg-background">
      <div className={cn("w-full mx-auto animate-fade-in", className)}>
        {children}
      </div>
    </div>
  );
};

export const Section = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={cn(
        "py-16 md:py-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    />
  );
});
Section.displayName = "Section";

export default Layout;
