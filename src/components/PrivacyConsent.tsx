import { useEffect, useRef, useState } from 'react';
import { Check, ShieldCheck } from 'lucide-react';
import {
  CONSENT_VERSION,
  PRIVACY_EVENT,
  readConsentPreferences,
  saveConsentPreferences,
  type ConsentPreferences,
} from '../privacy';

type OptionalPreferences = Pick<ConsentPreferences, 'analytics' | 'marketing'>;

const rejected: OptionalPreferences = { analytics: false, marketing: false };
const accepted: OptionalPreferences = { analytics: true, marketing: true };

export function PrivacyConsent() {
  const initial = readConsentPreferences();
  const [decision, setDecision] = useState<ConsentPreferences | null>(initial);
  const [bannerVisible, setBannerVisible] = useState(!initial);
  const [panelVisible, setPanelVisible] = useState(false);
  const [draft, setDraft] = useState<OptionalPreferences>(initial ?? rejected);
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const commit = (preferences: OptionalPreferences) => {
    const saved = saveConsentPreferences(preferences);
    setDecision(saved);
    setDraft(saved);
    setBannerVisible(false);
    setPanelVisible(false);
  };

  const openPanel = () => {
    setDraft(decision ?? rejected);
    setPanelVisible(true);
  };

  useEffect(() => {
    const open = () => openPanel();
    const sync = (event: Event) => {
      const preferences = (event as CustomEvent<ConsentPreferences>).detail;
      if (preferences) setDecision(preferences);
    };
    window.addEventListener('3adsedu:open-privacy-settings', open);
    window.addEventListener(PRIVACY_EVENT, sync);
    return () => {
      window.removeEventListener('3adsedu:open-privacy-settings', open);
      window.removeEventListener(PRIVACY_EVENT, sync);
    };
  }, [decision]);

  useEffect(() => {
    if (!panelVisible) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const frame = requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>('button, input, a')?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setPanelVisible(false);
        if (!decision) setBannerVisible(true);
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), a[href]');
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
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      previousFocus.current?.focus();
    };
  }, [panelVisible, decision]);

  return (
    <>
      {bannerVisible && (
        <section className="privacy-banner" aria-labelledby="privacy-banner-title">
          <div className="privacy-banner-copy">
            <ShieldCheck size={23} aria-hidden="true" />
            <div>
              <h2 id="privacy-banner-title">Suas escolhas de privacidade</h2>
              <p>Usamos armazenamento necessário para lembrar sua decisão. Medição e publicidade só são ativadas após sua escolha.</p>
            </div>
          </div>
          <div className="privacy-banner-actions">
            <button type="button" className="privacy-action privacy-action-primary" onClick={() => commit(accepted)}>Aceitar todos</button>
            <button type="button" className="privacy-action privacy-action-primary" onClick={() => commit(rejected)}>Rejeitar opcionais</button>
            <button type="button" className="privacy-action privacy-action-secondary" onClick={openPanel}>Personalizar</button>
          </div>
        </section>
      )}

      {panelVisible && (
        <div className="privacy-overlay" role="presentation">
          <section ref={panelRef} className="privacy-panel" role="dialog" aria-modal="true" aria-labelledby="privacy-panel-title" aria-describedby="privacy-panel-description">
            <header className="privacy-panel-header">
              <div>
                <p className="eyebrow">Privacidade · versão {CONSENT_VERSION}</p>
                <h2 id="privacy-panel-title">Personalize suas preferências</h2>
              </div>
            </header>
            <p id="privacy-panel-description" className="privacy-panel-intro">As categorias opcionais começam desativadas. Você pode alterar sua decisão depois em “Configurações de privacidade”, no rodapé.</p>

            <div className="privacy-categories">
              <article className="privacy-category">
                <div><h3>Necessários</h3><p>Salvam exclusivamente suas preferências de privacidade e mantêm funções essenciais da página.</p></div>
                <span className="privacy-always"><Check size={15} aria-hidden="true" /> Sempre ativo</span>
              </article>
              <article className="privacy-category">
                <label htmlFor="consent-analytics"><span><strong>Analytics</strong><small>Google Analytics 4 e Microsoft Clarity para entender uso e desempenho.</small></span><input id="consent-analytics" type="checkbox" checked={draft.analytics} onChange={(event) => setDraft((current) => ({ ...current, analytics: event.target.checked }))} /><span className="privacy-switch" aria-hidden="true" /></label>
              </article>
              <article className="privacy-category">
                <label htmlFor="consent-marketing"><span><strong>Marketing</strong><small>Meta Pixel e tecnologias publicitárias para mensuração de campanhas.</small></span><input id="consent-marketing" type="checkbox" checked={draft.marketing} onChange={(event) => setDraft((current) => ({ ...current, marketing: event.target.checked }))} /><span className="privacy-switch" aria-hidden="true" /></label>
              </article>
            </div>

            <p className="privacy-technical-note">O contêiner atual reúne Analytics e Marketing. Por segurança, nenhum rastreador é carregado quando apenas uma categoria opcional está ativa.</p>
            <p className="privacy-contact">Dúvidas sobre privacidade: <a href="mailto:atendimento@3adsedu.com.br">atendimento@3adsedu.com.br</a>.</p>

            <footer className="privacy-panel-actions">
              <button type="button" className="privacy-action privacy-action-primary" onClick={() => commit(accepted)}>Aceitar todos</button>
              <button type="button" className="privacy-action privacy-action-primary" onClick={() => commit(rejected)}>Rejeitar opcionais</button>
              <button type="button" className="privacy-action privacy-action-secondary" onClick={() => commit(draft)}>Salvar preferências</button>
            </footer>
          </section>
        </div>
      )}
    </>
  );
}
