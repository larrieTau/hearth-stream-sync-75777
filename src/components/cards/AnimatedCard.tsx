import { ReactNode, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import gsap from "gsap";

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function AnimatedCard({ children, delay = 0, className }: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.6, 
          delay,
          ease: "power3.out" 
        }
      );
    }
  }, [delay]);

  const handleHover = () => {
    gsap.to(cardRef.current, {
      y: -8,
      boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleHoverExit = () => {
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <Card
      ref={cardRef}
      className={className}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverExit}
    >
      {children}
    </Card>
  );
}
