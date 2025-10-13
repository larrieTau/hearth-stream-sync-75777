import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useGsapFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          delay,
          ease: "power3.out" 
        }
      );
    }
  }, [delay]);

  return ref;
}

export function useGsapStagger(selector: string, delay = 0) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll(selector);
      gsap.fromTo(
        elements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          delay,
          ease: "power3.out"
        }
      );
    }
  }, [selector, delay]);

  return containerRef;
}

export function useGsapScaleIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { scale: 0.8, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.5, 
          delay,
          ease: "back.out(1.7)" 
        }
      );
    }
  }, [delay]);

  return ref;
}

export function useGsapCounter(target: number, duration = 2) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      const obj = { value: 0 };
      gsap.to(obj, {
        value: target,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent = Math.round(obj.value).toString();
          }
        }
      });
    }
  }, [target, duration]);

  return ref;
}
