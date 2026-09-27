import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className={cn(
      "fixed bottom-8 right-8 z-50 transition-all duration-300 transform",
      isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
    )}>
      <Button
        onClick={scrollToTop}
        size="icon"
        className="h-12 w-12 rounded-full shadow-2xl shadow-primary/20 bg-primary/90 backdrop-blur-md hover:bg-primary hover:scale-110 active:scale-95 transition-all outline-none ring-0 border border-white/20"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-6 w-6 text-white" />
      </Button>
    </div>
  );
}
