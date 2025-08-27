'use client';
import SplitText from '@/components/ReactBits/SplitText';

interface SplitTextNoSSRProps {
  text: string;
  className?: string;
}

export default function SplitTextNoSSR({
  text,
  className = 'mb-4 text-2xl font-bold',
}: SplitTextNoSSRProps) {
  return (
    <h2 className={className}>
      <SplitText
        text={text}
        delay={150}
        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
        easing="easeOutCubic"
        threshold={0.2}
        rootMargin="-50px"
      />
    </h2>
  );
}
