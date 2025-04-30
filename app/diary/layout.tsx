import React from 'react';

export default async function DiaryLayout({ 
  children 
}: {
  children: React.ReactNode 
}) {
  return (
    <div className='relative flex flex-col w-full max-w-full md:max-w-3xl px-0 md:px-1'>
      <main>
        {children}
      </main>
    </div>
  );
}
