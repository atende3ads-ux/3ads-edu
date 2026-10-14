import { ArrowUpRight } from 'lucide-react';
import { contactUrl } from '../content';
import { trackAnalyticsEvent } from '../privacy';

type ButtonLinkProps = {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  variant?: 'light' | 'dark' | 'blue';
  ctaId?: string;
  onClick?: () => void;
};

export function ActionLink({ children = 'Vamos conversar', className = '', href = contactUrl, variant = 'dark', ctaId = 'whatsapp_contact', onClick }: ButtonLinkProps) {
  const external = href.startsWith('https://');
  return (
    <a href={href} className={`button-link button-${variant} ${className}`} onClick={() => { trackAnalyticsEvent('cta_click', { cta_id: ctaId, destination_type: href.includes('wa.me') ? 'whatsapp' : external ? 'external_url' : 'internal_link' }); onClick?.(); }} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
      <span>{children}</span>
      <span className="button-arrow"><ArrowUpRight size={20} strokeWidth={1.6} aria-hidden="true" /></span>
    </a>
  );
}
