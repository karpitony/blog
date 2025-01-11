import cn from '@yeahx4/cn';

export default function SimpleBox({ children }: { children: React.ReactNode }) {
  return (
    <div 
      className={cn(
        "bg-gray-900 bg-opacity-50 rounded-lg p-4 md:p-8 shadow-lg"
      )}
    >
      {children}
    </div>
  )
}