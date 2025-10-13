import { useEffect, useRef } from "react";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import gsap from "gsap";

interface AnimatedStatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "accent" | "success" | "warning";
  delay?: number;
}

export function AnimatedStatsCard({ 
  title, 
  value, 
  icon: Icon, 
  trend,
  variant = "default",
  delay = 0
}: AnimatedStatsCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLParagraphElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance animation
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.6, 
          delay,
          ease: "power3.out" 
        }
      );

      // Counter animation
      if (counterRef.current) {
        const obj = { value: 0 };
        gsap.to(obj, {
          value,
          duration: 2,
          delay: delay + 0.3,
          ease: "power2.out",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = Math.round(obj.value).toLocaleString();
            }
          }
        });
      }

      // Icon pulse animation
      gsap.to(iconRef.current, {
        scale: 1.1,
        duration: 0.3,
        delay: delay + 0.5,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      });
    });

    return () => ctx.revert();
  }, [value, delay]);

  const handleHover = () => {
    gsap.to(cardRef.current, {
      y: -5,
      duration: 0.3,
      ease: "power2.out"
    });
    gsap.to(iconRef.current, {
      rotate: 360,
      duration: 0.6,
      ease: "power2.inOut"
    });
  };

  const handleHoverExit = () => {
    gsap.to(cardRef.current, {
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <Card 
      ref={cardRef}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverExit}
      className={cn(
        "relative overflow-hidden p-6 cursor-pointer",
        variant === "primary" && "border-primary/20 bg-gradient-primary text-primary-foreground",
        variant === "accent" && "border-accent/20 bg-gradient-blood text-accent-foreground",
        variant === "success" && "border-success/20 bg-gradient-success text-success-foreground",
        variant === "warning" && "border-warning/20",
        variant === "default" && "hover:border-primary/30"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className={cn(
            "text-sm font-medium",
            variant === "default" ? "text-muted-foreground" : "opacity-90"
          )}>
            {title}
          </p>
          <p ref={counterRef} className="text-3xl font-bold">0</p>
          {trend && (
            <p className={cn(
              "text-xs font-medium",
              variant === "default" 
                ? trend.isPositive ? "text-success" : "text-destructive"
                : "opacity-80"
            )}>
              {trend.isPositive ? "↑" : "↓"} {trend.value}
            </p>
          )}
        </div>
        <div 
          ref={iconRef}
          className={cn(
            "rounded-lg p-3",
            variant === "default" && "bg-primary/10",
            variant !== "default" && "bg-white/20"
          )}
        >
          <Icon className={cn(
            "h-6 w-6",
            variant === "default" && "text-primary"
          )} />
        </div>
      </div>
    </Card>
  );
}
