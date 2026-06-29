import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimOptions {
  y?: number;
  x?: number;
  scale?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  children?: boolean;
  once?: boolean;
}

export function useScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      y = 60,
      x = 0,
      scale,
      opacity = 0,
      duration = 0.7,
      delay = 0,
      stagger = 0,
      ease = 'power2.out',
      start = 'top 85%',
      scrub = false,
      children = false,
      once = true,
    } = options;

    const targets = children ? el.children : el;

    const fromVars: gsap.TweenVars = { opacity };
    if (y !== 0) fromVars.y = y;
    if (x !== 0) fromVars.x = x;
    if (scale !== undefined) fromVars.scale = scale;

    const toVars: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      x: 0,
      duration,
      delay,
      stagger: stagger || undefined,
      ease,
      scrollTrigger: {
        trigger: el,
        start,
        scrub: scrub === true ? 1 : scrub || false,
        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
      },
    };
    if (scale !== undefined) toVars.scale = 1;

    const ctx = gsap.context(() => {
      gsap.fromTo(targets, fromVars, toVars);
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

export function useParallax<T extends HTMLElement>(speed: number = 0.5) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: () => speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [speed]);

  return ref;
}
