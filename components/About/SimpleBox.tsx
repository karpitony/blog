import cn from '@yeahx4/cn';
import AnimatedContent from '@/components/ReactBits/AnimatedContent';

export default function SimpleBox({ children }: { children: React.ReactNode }) {
  return (
    <AnimatedContent
      distance={150}
      direction="horizontal"
      reverse={false}
      config={{ tension: 80, friction: 20 }}
      initialOpacity={0.2}
      animateOpacity
      scale={1.1}
      threshold={0.2}
    >
      <div
        className={cn('bg-gray-300 dark:bg-gray-900 bg-opacity-50 rounded-lg p-4 md:p-8 shadow-lg')}
      >
        {children}
      </div>
    </AnimatedContent>
  );
}
