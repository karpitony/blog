'use client';
import { useRef, useEffect, useState } from 'react';

const FadeContent = ({
  children,
  blur = false,
  duration = 1000,
  easing = 'ease-out',
  threshold = 0.1,
  initialOpacity = 0,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        opacity: inView ? 1 : initialOpacity,
        transition: `opacity ${duration}ms ${easing}, filter ${duration}ms ${easing}`,
        filter: blur ? (inView ? 'blur(0px)' : 'blur(10px)') : 'none',
      }}
    >
      {children}
    </div>
  );
};

export default FadeContent;