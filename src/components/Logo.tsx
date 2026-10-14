export function Logo({ variant = 'light' }: { variant?: 'light' | 'color' }) {
  return (
    <img
      className="brand"
      src={variant === 'color' ? './brand/3ads-edu-blue-360.webp' : './brand/3ads-edu-white-360.webp'}
      alt="3ADS EDU"
      width="360"
      height="116"
    />
  );
}
