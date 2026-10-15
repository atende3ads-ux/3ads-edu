import { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { ActionLink } from './ActionLink';
import { ProgramHighlight } from './ProgramHighlight';

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSource, setVideoSource] = useState<string>();

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let timer = 0;
    let cancelled = false;
    const enableVideo = () => {
      if (!cancelled && !media.matches && !connection?.saveData) setVideoSource('./media/edu-hero-2.mp4');
    };
    const deferVideo = () => { timer = window.setTimeout(enableVideo, 1800); };
    const scheduleVideo = () => {
      if (document.readyState === 'complete') deferVideo();
      else window.addEventListener('load', deferVideo, { once: true });
    };
    const syncPlayback = () => {
      if (media.matches) videoRef.current?.pause();
      else void videoRef.current?.play().catch(() => undefined);
    };
    scheduleVideo();
    syncPlayback();
    media.addEventListener('change', syncPlayback);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.removeEventListener('load', deferVideo);
      media.removeEventListener('change', syncPlayback);
    };
  }, []);

  useEffect(() => {
    if (videoSource) void videoRef.current?.play().catch(() => undefined);
  }, [videoSource]);

  return (
    <section id="inicio" className="hero-section relative w-full overflow-hidden bg-black" aria-labelledby="hero-title">
      <video ref={videoRef} className="hero-video absolute inset-0 h-full w-full object-cover" loop muted playsInline src={videoSource} poster="./media/edu-hero-2-poster.webp" preload="none" aria-hidden="true" />
      <div className="hero-shade absolute inset-0" />
      <div className="hero-topline"><span className="status-dot" /> Educação para empresas. Evolução para pessoas.</div>
      <div className="hero-content">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">3ADS EDU · Educação para empresas</p>
          <h1 id="hero-title">O próximo salto<br className="desktop-break" /> da sua empresa<br className="desktop-break" /> começa <span>no seu time.</span></h1>
          <p className="hero-description">Desenvolva sua equipe em IA, marketing e vendas com programas práticos, construídos para os desafios do seu negócio.</p>
          <div className="hero-actions">
            <ActionLink variant="light">Quero desenvolver meu time</ActionLink>
            <a className="hero-secondary" href="#programas">Explorar programas <ArrowDown size={16} aria-hidden="true" /></a>
          </div>
        </div>
        <ProgramHighlight />
      </div>
      <div className="hero-bottom"><span>Treinamentos · Workshops · Mentorias · Consultorias</span></div>
    </section>
  );
}
