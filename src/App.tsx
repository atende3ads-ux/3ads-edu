import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Plus, Minus, Check, Globe2 } from 'lucide-react';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { ActionLink } from './components/ActionLink';
import { Logo } from './components/Logo';
import { Reveal } from './components/Reveal';
import { ClientLogos } from './components/ClientLogos';
import { formats, mentors, navigation, programs, questions, steps } from './content';

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow section-label">{children}</p>;
}

function Programs() {
  const featured = programs[0];
  return (
    <section id="programas" className="section-space programs-section" aria-labelledby="programs-title">
      <div className="page-container">
        <Reveal className="section-heading">
          <div><SectionLabel>Os programas</SectionLabel><h2 id="programs-title">O que seu time precisa<br /><span className="muted">dominar agora?</span></h2></div>
          <p className="section-intro">Comece pelo desafio. Explore os programas que podem ajudar sua equipe a avançar.</p>
        </Reveal>
        <Reveal>
          <article className="featured-program">
            <div className="ai-art" aria-hidden="true">
              <div className="art-top"><span>IA + INTELIGÊNCIA HUMANA</span><span>01 / 07</span></div>
              <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
              <div className="ai-core">IA<span>possibilidades em movimento</span></div>
              <span className="orbit-node node-one">ideias</span><span className="orbit-node node-two">pessoas</span><span className="orbit-node node-three">negócios</span>
              <div className="art-bottom"><span className="status-dot" /> O FUTURO JÁ ESTÁ NA SUA ROTINA.</div>
            </div>
            <div className="featured-program-copy">
              <span className="tag">Inteligência artificial</span>
              <div><h3>{featured.title}</h3><p>{featured.description}</p></div>
              <div className="flex flex-wrap gap-2">{featured.tags.map(tag => <span key={tag} className="topic-tag">{tag}</span>)}</div>
              <a href={`https://3ads.com.br/produtos-edu/${featured.slug}/`} target="_blank" rel="noopener noreferrer" className="program-link">Conhecer o programa <ArrowUpRight size={21} aria-hidden="true" /></a>
            </div>
          </article>
        </Reveal>
        <div className="program-grid">
          {programs.slice(1).map((program, index) => (
            <Reveal key={program.slug} delay={(index % 2) * 75}>
              <article className="program-card">
                <div className="program-meta"><span>0{index + 2}</span><span>{program.category}</span></div>
                <h3>{program.title}</h3><p>{program.description}</p>
                <a href={`https://3ads.com.br/produtos-edu/${program.slug}/`} target="_blank" rel="noopener noreferrer" className="program-link" aria-label={`Conhecer o programa: ${program.title}`}>Conhecer o programa <ArrowUpRight size={21} aria-hidden="true" /></a>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="program-help"><div><h3>Ainda está entendendo por onde começar?</h3><p>Conte o momento da sua equipe. Vamos conversar sobre as prioridades.</p></div><ActionLink>Encontrar o programa para meu time</ActionLink></Reveal>
      </div>
    </section>
  );
}

function Formats() {
  const [active, setActive] = useState(0);
  return (
    <section id="formatos" className="section-space formats-section" aria-labelledby="formats-title">
      <div className="page-container">
        <Reveal className="section-heading"><div><SectionLabel>Do seu jeito</SectionLabel><h2 id="formats-title">Um formato que acompanha<br /><span className="muted">o seu desafio.</span></h2></div></Reveal>
        <div className="formats-grid">
          <Reveal className="format-list">
            {formats.map((format, index) => <div key={format.name} className={`format-row ${active === index ? 'active' : ''}`}>
              <h3><button type="button" id={`format-trigger-${index}`} aria-expanded={active === index} aria-controls={`format-panel-${index}`} onClick={() => setActive(index)}><span className="format-index">0{index + 1}</span>{format.name}{active === index ? <Minus size={23} aria-hidden="true" /> : <Plus size={23} aria-hidden="true" />}</button></h3>
              <div id={`format-panel-${index}`} role="region" aria-labelledby={`format-trigger-${index}`} hidden={active !== index}><p>{format.description}</p></div>
            </div>)}
            <p className="format-note"><Globe2 size={18} aria-hidden="true" /> Presencial ou online. Onde o seu time estiver.</p>
          </Reveal>
          <Reveal className="format-photo">
            <img key={formats[active].image} src={`./images/${formats[active].image}`} alt={formats[active].alt} loading="lazy" decoding="async" width="700" height="536" />
            <span className="photo-caption"><span className="status-dot" /> Gente aprendendo com gente.</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="faq-section section-space" aria-labelledby="faq-title">
      <div className="page-container faq-grid">
        <Reveal><SectionLabel>Uma boa conversa</SectionLabel><h2 id="faq-title">Vamos tirar<br />suas dúvidas?</h2><p className="faq-intro">Cada equipe tem um momento.<br />Estamos aqui para entender o seu.</p><a href="#contato" className="text-link">Fale com a gente <ArrowUpRight size={18} aria-hidden="true" /></a></Reveal>
        <Reveal className="faq-list">
          {questions.map(({ question, answer }, index) => <div className={`faq-item ${open === index ? 'active' : ''}`} key={question}>
            <h3><button id={`faq-trigger-${index}`} aria-expanded={open === index} aria-controls={`faq-panel-${index}`} onClick={() => setOpen(open === index ? null : index)}><span>{question}</span>{open === index ? <Minus size={22} aria-hidden="true" /> : <Plus size={22} aria-hidden="true" />}</button></h3>
            <div id={`faq-panel-${index}`} role="region" aria-labelledby={`faq-trigger-${index}`} hidden={open !== index}><p>{answer}</p></div>
          </div>)}
        </Reveal>
      </div>
    </section>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Navbar menuOpen={menuOpen} onMenuChange={setMenuOpen} />
      <main id="conteudo" inert={menuOpen}>
        <div className="hero-frame"><Hero /></div>
        <section className="clients-section page-container" aria-label="Clientes da 3ADS">
          <Reveal><div className="clients-heading"><p>Quem investe em gente,<br /><span className="muted">constrói o próximo passo.</span></p><span>Marcas que fazem parte da trajetória da 3ADS.<br /><small>Clientes em diferentes frentes de atuação.</small></span></div></Reveal>
          <ClientLogos />
        </section>
        <section className="challenge-section section-space" aria-labelledby="challenge-title">
          <div className="page-container">
            <Reveal><SectionLabel>O próximo passo</SectionLabel><h2 id="challenge-title" className="challenge-title">Sua empresa tem planos grandes.<br /><span className="muted">Seu time precisa</span> estar pronto<span className="blue-period">.</span></h2></Reveal>
            <Reveal className="challenge-description"><span className="section-symbol" aria-hidden="true">↗</span><p>Adotar novas ferramentas. Melhorar a operação. Encontrar novas formas de vender.</p><p>Cada movimento da empresa pede novas capacidades de quem está nela. A 3ADS EDU conecta esses desafios ao desenvolvimento das pessoas.</p></Reveal>
            <div className="challenge-grid">
              <Reveal className="challenge-photo image-hover"><img src="./images/encontro-3ads.webp" alt="Carlos Costa compartilhando conhecimento com uma equipe durante um encontro da 3ADS" width="759" height="535" loading="lazy" decoding="async" /><div className="photo-caption">Conhecimento que sai da teoria.<ArrowUpRight size={22} aria-hidden="true" /></div></Reveal>
              <Reveal className="benefits-card" delay={100}><p className="eyebrow">APRENDER PARA AVANÇAR</p>{[
                ['Clareza para decidir.', 'Entender o que merece atenção e escolher os próximos passos.'],
                ['Repertório para resolver.', 'Encontrar novas respostas para problemas que se repetem.'],
                ['Confiança para fazer.', 'Colocar o aprendizado em movimento no dia a dia.'],
              ].map(([title, text]) => <div className="benefit" key={title}><Check size={18} strokeWidth={1.7} aria-hidden="true" /><div><h3>{title}</h3><p>{text}</p></div></div>)}</Reveal>
            </div>
          </div>
        </section>
        <Programs />
        <Formats />
        <section id="como-funciona" className="method-section section-space" aria-labelledby="method-title">
          <div className="page-container">
            <Reveal className="section-heading"><div><SectionLabel>Da intenção à prática</SectionLabel><h2 id="method-title">Seu desafio é<br /><span>o ponto de partida.</span></h2></div><p className="section-intro">Nada de uma receita única.<br />Um caminho construído com você,<br />do contexto à evolução.</p></Reveal>
            <div className="steps-grid">{steps.map((step, index) => <Reveal key={step.title} delay={index * 80} className="step"><div className="step-top"><span>0{index + 1}</span><ArrowUpRight size={23} strokeWidth={1.3} aria-hidden="true" /></div><h3>{step.title}</h3><p>{step.text}</p></Reveal>)}</div>
            <Reveal className="method-footer"><span className="status-dot" /><p>Aprender. Aplicar. Evoluir. E seguir em movimento.</p></Reveal>
          </div>
        </section>
        <section id="experiencias" className="experiences-section section-space" aria-labelledby="experiences-title">
          <div className="page-container">
            <Reveal className="section-heading"><div><SectionLabel>Encontros que conectam</SectionLabel><h2 id="experiences-title">O aprendizado ganha força<br /><span className="muted">quando aparece na rotina.</span></h2></div><p className="section-intro">Troca, participação e prática.<br />Um olhar para os encontros<br />de educação da 3ADS.</p></Reveal>
            <div className="experiences-grid">
              <Reveal className="experience-large"><figure><div className="experience-image image-hover"><img src="./images/turma-3ads.png" alt="Participantes e facilitadores reunidos após um encontro de formação da 3ADS" loading="lazy" decoding="async" width="700" height="536" /><span className="image-pill">Conexões que ficam</span></div><figcaption><h3>O próximo passo se constrói junto.</h3><span>Gente aprendendo com gente</span></figcaption></figure></Reveal>
              <Reveal className="experience-small" delay={100}><figure><div className="experience-image image-hover"><img src="./images/workshop-3ads.png" alt="Participantes acompanhando uma explicação de Carlos Costa em um workshop" loading="lazy" decoding="async" width="479" height="354" /><span className="image-pill">Aprendizado em ação</span></div><figcaption><h3>Da conversa para a prática.</h3><span>Espaço para experimentar e trocar</span></figcaption></figure><a className="experience-cta" href="#contato"><span>Que tal levar essa troca<br />para o seu time?</span><ArrowUpRight size={35} strokeWidth={1.3} aria-hidden="true" /></a></Reveal>
            </div>
          </div>
        </section>
        <section id="mentores" className="mentors-section section-space" aria-labelledby="mentors-title">
          <div className="page-container">
            <Reveal className="section-heading"><div><SectionLabel>Quem caminha com você</SectionLabel><h2 id="mentors-title">Aprenda com quem<br /><span className="muted">também está fazendo.</span></h2></div><p className="section-intro">Profissionais que conectam experiência de mercado e desenvolvimento de pessoas.</p></Reveal>
            <div className="mentors-grid">{mentors.map((mentor, index) => <Reveal key={mentor.name} delay={index * 90}><article className="mentor-card"><div className="mentor-photo image-hover"><img src={`./images/${mentor.image}`} alt={mentor.name} loading="lazy" decoding="async" width="576" height="576" /><span className="mentor-specialty">{mentor.specialty}</span></div><h3>{mentor.name}</h3><p>{mentor.bio}</p></article></Reveal>)}</div>
          </div>
        </section>
        <FAQ />
        <section id="contato" className="contact-section" aria-labelledby="contact-title">
          <div className="contact-decoration" aria-hidden="true"><span /><span /><span /></div>
          <div className="page-container">
            <Reveal><SectionLabel>Vamos dar o próximo passo?</SectionLabel><h2 id="contact-title">Qual é o próximo<br />desafio <span>do seu time?</span></h2><div className="contact-bottom"><p>Conte para a gente. Vamos pensar juntos no desenvolvimento que pode ajudar sua empresa a avançar.</p><ActionLink>Conversar sobre meu time</ActionLink></div></Reveal>
          </div>
        </section>
      </main>
      <footer className="site-footer" inert={menuOpen}>
        <div className="page-container">
          <div className="footer-top"><a href="#inicio" aria-label="3ADS EDU — voltar ao início"><Logo /></a><p>Gente preparada.<br />Empresas em movimento.</p><a className="back-top" href="#inicio" aria-label="Voltar ao início"><ArrowDown className="rotate-180" size={22} aria-hidden="true" /></a></div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} 3ADS EDU</span><nav aria-label="Navegação do rodapé">{navigation.map(link => <a href={link.href} key={link.href}>{link.label}</a>)}</nav><a href="https://3ads.com.br/" target="_blank" rel="noopener noreferrer">Parte do ecossistema 3ADS <ArrowUpRight size={14} aria-hidden="true" /></a></div>
        </div>
      </footer>
    </>
  );
}
