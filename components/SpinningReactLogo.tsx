import Image from 'next/image';

export  function SpinningReactLg() {
  return (
    <div className="w-24 h-24 animate-spin">
      <Image src="/react-logo.svg" alt="React Logo" fill />
    </div>
  );
}

export function SpinningReactSm() {
  return (
    <div className='bg-[#222222] rounded-lg p-[0.125rem] mr-1 md:mr-2'>
      <div className="h-6 w-6 md:h-8 md:w-8 animate-spin">
        <Image src="/react-logo.svg" alt="React Logo" fill />
      </div>
    </div>
  );
}