import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Pause, Play } from 'lucide-react';
import { ActionLink } from './ActionLink';
import { ProgramHighlight } from './ProgramHighlight';

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPlayback = () => {
      if (media.matches) videoRef.current?.pause();
      else void videoRef.current?.play().catch(() => setPlaying(false));
    };
    syncPlayback();
    media.addEventListener('change', syncPlayback);
    return () => media.removeEventListener('change', syncPlayback);
  }, []);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => setPlaying(false));
    else video.pause();
  };

  return (
    <section id="inicio" className="hero-section relative w-full overflow-hidden bg-black" aria-labelledby="hero-title">
      <video ref={videoRef} className="hero-video absolute inset-0 h-full w-full object-cover" loop muted playsInline src="./media/edu-hero-2.mp4" poster="./media/edu-hero-2-poster.jpg" preload="metadata" aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
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
      <div className="hero-bottom"><span>Treinamentos · Workshops · Mentorias · Consultorias</span><button type="button" onClick={toggleVideo} aria-label={playing ? 'Pausar vídeo de fundo' : 'Reproduzir vídeo de fundo'} className="video-control">{playing ? <Pause size={13} aria-hidden="true" /> : <Play size={13} aria-hidden="true" />}<span>{playing ? 'Pausar vídeo' : 'Reproduzir vídeo'}</span></button></div>
    </section>
  );
}
