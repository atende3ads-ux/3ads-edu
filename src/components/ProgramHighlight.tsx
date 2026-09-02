import { ArrowUpRight } from 'lucide-react';
import { programs } from '../content';

export function ProgramHighlight() {
  return (
    <a href="#programas" className="hero-program-card">
      <div className="flex items-start justify-between">
        <span className="hero-program-number">{String(programs.length).padStart(2, '0')}</span>
        <ArrowUpRight size={24} strokeWidth={1.4} aria-hidden="true" />
      </div>
      <p>programas para<br />o próximo passo.</p>
      <div className="hero-program-foot"><span className="status-dot" /> IA, marketing e vendas</div>
    </a>
  );
}
