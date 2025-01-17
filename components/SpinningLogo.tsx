import Image from 'next/image';

export  function SpinningReactLg() {
  return (
    <div 
      className="w-20 h-20 animate-spin"
      style={{ animationDuration: '2s' }}
    >
      <Image 
        src="/react-logo.svg"
        alt="React Logo"
        width={80}
        height={80}
      />
    </div>
  );
}

export function SpinningReactSm() {
  return (
    <div className='bg-[#222222] rounded-lg p-[0.125rem] mr-1 md:mr-2'>
      <div 
        className="h-6 w-6 md:h-8 md:w-8 animate-spin"
        style={{ animationDuration: '3s' }}
      >
        <Image
          src="/react-logo.svg"
          alt="React Logo"
          width={80}
          height={80} 
        />
      </div>
    </div>
  );
}

export function SpinningSvelteLg() {
  return (
    <div 
      className="w-20 h-20 animate-spin"
      style={{ animationDuration: '2s' }}
    >
      <Image
        src="/svelte-logo.svg"
        alt="Svelte Logo" 
        width={80}
        height={80}
      />
    </div>
  );
}

export function SpinningNextjsLg() {
  return (
    <div 
      className="w-20 h-20 animate-spin"
      style={{ animationDuration: '2s' }}
    >
      <Image
        src="/nextjs-logo.svg"
        alt="Next.js Logo"
        width={80}
        height={80}
      />
    </div>
  );
}