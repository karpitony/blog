import React from 'react';

export default async function DiaryLayout({ 
  children 
}: {
  children: React.ReactNode 
}) {
  return (
    <div className='relative flex flex-col items-center w-full max-w-full md:max-w-3xl'>

      <main style={{ padding: '1rem' }}>
        {children}
      </main>
    </div>
  );
}
