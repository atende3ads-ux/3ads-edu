import { ArrowUpRight } from 'lucide-react';
import { contactUrl } from '../content';

type ButtonLinkProps = {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  variant?: 'light' | 'dark' | 'blue';
  onClick?: () => void;
};

export function ActionLink({ children = 'Vamos conversar', className = '', href = contactUrl, variant = 'dark', onClick }: ButtonLinkProps) {
  const external = href.startsWith('https://');
  return (
    <a href={href} className={`button-link button-${variant} ${className}`} onClick={onClick} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
      <span>{children}</span>
      <span className="button-arrow"><ArrowUpRight size={20} strokeWidth={1.6} aria-hidden="true" /></span>
    </a>
  );
}
