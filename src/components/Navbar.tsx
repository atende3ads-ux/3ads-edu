import { useEffect, useRef, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { navigation } from '../content';
import { ActionLink } from './ActionLink';
import { Logo } from './Logo';

export function Navbar({ menuOpen, onMenuChange }: { menuOpen: boolean; onMenuChange: (open: boolean) => void }) {
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = () => { if (desktop.matches) onMenuChange(false); };
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      window.removeEventListener('scroll', onScroll);
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, [onMenuChange]);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const frame = requestAnimationFrame(() => menuRef.current?.querySelector('a')?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); onMenuChange(false); }
      if (event.key !== 'Tab') return;
      const items = menuRef.current?.querySelectorAll<HTMLElement>('button, a[href]');
      if (!items?.length) return;
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      if (!window.matchMedia('(min-width: 1024px)').matches) toggleRef.current?.focus();
    };
  }, [menuOpen, onMenuChange]);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="main-nav" aria-label="Navegação principal">
        <a href="#inicio" aria-label="3ADS EDU — início" tabIndex={menuOpen ? -1 : undefined}><Logo variant={scrolled ? 'color' : 'light'} /></a>
        <div className="desktop-navigation">
          <div className="nav-links">{navigation.map(({ label, href }) => <a key={href} href={href}>{label}</a>)}</div>
          <ActionLink variant={scrolled ? 'dark' : 'light'} />
        </div>
        <div ref={menuRef} role={menuOpen ? 'dialog' : undefined} aria-modal={menuOpen || undefined} aria-label={menuOpen ? 'Menu de navegação' : undefined} className={`mobile-navigation ${menuOpen ? 'is-open' : ''}`}>
          <button ref={toggleRef} type="button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => onMenuChange(!menuOpen)} className="menu-toggle">
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
          <div id="mobile-menu" inert={!menuOpen} aria-hidden={!menuOpen} className="mobile-menu">
            <div className="eyebrow">Seu próximo passo começa aqui.</div>
            {navigation.map(({ label, href }, index) => <a href={href} key={href} onClick={() => onMenuChange(false)}><span className="menu-index">0{index + 1}</span>{label}<ArrowUpRight size={24} aria-hidden="true" /></a>)}
            <ActionLink variant="blue" onClick={() => onMenuChange(false)}>Vamos conversar</ActionLink>
            <p>Gente preparada.<br />Empresas em movimento.</p>
          </div>
        </div>
      </nav>
    </header>
  );
}
