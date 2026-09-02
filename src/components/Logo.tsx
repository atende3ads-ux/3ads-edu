export function Logo({ variant = 'light' }: { variant?: 'light' | 'color' }) {
  return (
    <img
      className="brand"
      src={variant === 'color' ? './brand/3ads-edu-blue.png' : './brand/3ads-edu-white.png'}
      alt="3ADS EDU"
      width="1505"
      height={variant === 'color' ? 484 : 485}
    />
  );
}
