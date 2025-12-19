import React from 'react';

interface WongojiTitleProps {
  text: string;
}

function WongojiTitle({ text }: WongojiTitleProps) {
  const themeHexaCode = '#9B111E';

  // 공백 무시하고 숫자 두 자리씩 묶기
  const tokens: string[] = [];
  const chars = text.split('');
  let i = 0;

  while (i < chars.length) {
    const current = chars[i];
    const next = chars[i + 1];

    if (current === ' ') {
      i += 1;
      continue;
    }

    if (/\d/.test(current) && /\d/.test(next)) {
      tokens.push(current + next);
      i += 2;
    } else {
      tokens.push(current);
      i += 1;
    }
  }

  return (
    <div
      className="flex flex-wrap w-fit py-1 bg-transparent"
      style={{
        border: `1px solid ${themeHexaCode}`,
      }}
    >
      {tokens.map((token, idx) => {
        const isFirst = idx === 0;

        return (
          <span
            key={idx}
            className="flex items-center justify-center font-semibold"
            style={{
              width: 'clamp(28px, 6vw, 48px)',
              height: 'clamp(28px, 6vw, 48px)',
              fontSize: 'clamp(12px, 2.5vw, 24px)',
              textAlign: 'center',
              backgroundColor: 'transparent',
              borderTop: `1px solid ${themeHexaCode}`,
              borderBottom: `1px solid ${themeHexaCode}`,
              borderLeft: isFirst ? 'none' : `1px solid ${themeHexaCode}`,
              borderRight: 'none',
            }}
          >
            {token}
          </span>
        );
      })}
    </div>
  );
}

export default WongojiTitle;
