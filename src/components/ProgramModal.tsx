import { type FormEvent, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, Check, Clock3, X } from 'lucide-react';
import { contactUrl } from '../content';
import type { ProgramDetail } from '../programDetails';

type ProgramModalProps = {
  open: boolean;
  program: ProgramDetail;
  image: string;
  imageAlt: string;
  onClose: () => void;
};

export function ProgramModal({ open, program, image, imageAlt, onClose }: ProgramModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (!open) return;

    previousFocus.current = document.activeElement as HTMLElement | null;
    const root = document.getElementById('root');
    const rootWasInert = root?.hasAttribute('inert') ?? false;
    const previousOverflow = document.body.style.overflow;
    root?.setAttribute('inert', '');
    document.body.style.overflow = 'hidden';
    setValidated(false);

    const frame = requestAnimationFrame(() => closeButtonRef.current?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not(:disabled), input:not(:disabled), textarea:not(:disabled), a[href]',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (!rootWasInert) root?.removeAttribute('inert');
      previousFocus.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidated(true);
  };

  return createPortal(
    <div className="program-modal-overlay" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <div ref={dialogRef} id={`program-modal-${program.slug}`} className="program-modal" role="dialog" aria-modal="true" aria-labelledby="program-modal-title" aria-describedby="program-modal-headline">
        <div className="program-modal-scroll">
        <header className="program-modal-header">
          <div>
            <p className="eyebrow">{program.type} · 3ADS EDU</p>
            <h2 id="program-modal-title">{program.title}</h2>
          </div>
          <button ref={closeButtonRef} type="button" className="program-modal-close" onClick={onClose} aria-label="Fechar detalhes do programa">
            <X size={24} aria-hidden="true" />
          </button>
        </header>

        <figure className="program-modal-visual">
          <img src={image} alt={imageAlt} width="1400" height="800" decoding="async" />
        </figure>

        <div className="program-modal-body">
          <div className="program-modal-content">
            <p id="program-modal-headline" className="program-modal-headline">{program.headline}</p>
            <p className="program-modal-duration"><Clock3 size={18} aria-hidden="true" /> {program.duration}</p>

            <section className="program-modal-section" aria-labelledby="program-learning-title">
              <p className="eyebrow">Escopo do programa</p>
              <h3 id="program-learning-title">Neste curso você vai aprender:</h3>
              <ul className="program-learning-list">
                {program.learning.map((item) => <li key={item}><Check size={17} aria-hidden="true" /><span>{item}</span></li>)}
              </ul>
            </section>

            <section className="program-modal-section" aria-labelledby="program-overview-title">
              <h3 id="program-overview-title">Sobre o curso:</h3>
              <p>{program.overview}</p>
            </section>

            <section className="program-modal-section" aria-labelledby="program-audience-title">
              <h3 id="program-audience-title">Esse curso é para você?</h3>
              <p>{program.audience}</p>
            </section>

            {program.gallery.length > 0 && (
              <section className="program-modal-section program-gallery" aria-labelledby="program-gallery-title">
                <p className="eyebrow">Experiências 3ADS EDU</p>
                <h3 id="program-gallery-title">Confira como foram outras edições</h3>
                <p>Veja alguns momentos dos encontros em um movimento contínuo.</p>
                <div className="program-gallery-viewport" aria-label={`Fotos de edições anteriores de ${program.title}`} tabIndex={0}>
                  <div className="program-gallery-track">
                    {[false, true].map((duplicate) => (
                      <div key={duplicate ? 'duplicate' : 'original'} className="program-gallery-set" role={duplicate ? undefined : 'list'} aria-hidden={duplicate ? 'true' : undefined}>
                        {program.gallery.map((photo) => (
                          <figure key={`${duplicate ? 'duplicate' : 'original'}-${photo.src}`} className="program-gallery-item" role={duplicate ? undefined : 'listitem'}>
                            <img
                              src={`./images/${photo.src}`}
                              alt={duplicate ? '' : photo.alt}
                              width={photo.width}
                              height={photo.height}
                              style={{ objectPosition: photo.position }}
                              loading="lazy"
                              decoding="async"
                            />
                          </figure>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>

          <aside className="program-contact-card" aria-labelledby="program-contact-title">
            <p className="eyebrow">Fale com um especialista</p>
            <h3 id="program-contact-title">Tem interesse em saber mais sobre “{program.title}”?</h3>
            <p>Preencha seus dados e receba o contato da nossa equipe com todos os detalhes.</p>

            <form className="program-contact-form" onSubmit={handleSubmit}>
              <label htmlFor="program-contact-name">Nome <span className="program-form-required" aria-hidden="true">*</span></label>
              <input id="program-contact-name" name="name" type="text" autoComplete="name" required />

              <div className="program-form-row">
                <div>
                  <label htmlFor="program-contact-phone">Telefone/WhatsApp <span className="program-form-required" aria-hidden="true">*</span></label>
                  <input id="program-contact-phone" name="phone" type="tel" autoComplete="tel" minLength={8} required />
                </div>
                <div>
                  <label htmlFor="program-contact-email">E-mail <span className="program-form-required" aria-hidden="true">*</span></label>
                  <input id="program-contact-email" name="email" type="email" autoComplete="email" required />
                </div>
              </div>

              <label htmlFor="program-contact-company">Nome da empresa</label>
              <input id="program-contact-company" name="company" type="text" autoComplete="organization" />

              <label htmlFor="program-contact-message">Mensagem</label>
              <textarea id="program-contact-message" name="message" rows={5} />

              <label className="program-form-terms" htmlFor="program-contact-terms">
                <input id="program-contact-terms" name="terms" type="checkbox" required />
                <span>Li e concordo com a <a href="https://3ads.com.br/politica-de-privacidade-e-termos-de-uso/" target="_blank" rel="noopener noreferrer">Política de Privacidade e os Termos de Uso</a>.</span>
              </label>

              <button className="program-form-submit" type="submit">Validar interesse <ArrowUpRight size={19} aria-hidden="true" /></button>
            </form>

            <div className="program-form-status" role="status" aria-live="polite">
              {validated && <p>Validação concluída. Nenhum dado foi enviado, pois esta página ainda não possui um endpoint de formulário confirmado. <a href={contactUrl} target="_blank" rel="noopener noreferrer">Continuar pelo WhatsApp</a>.</p>}
            </div>
          </aside>
        </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
