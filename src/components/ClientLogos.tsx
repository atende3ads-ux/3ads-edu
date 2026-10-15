import { clients } from '../content';

export function ClientLogos() {
  return (
    <div className="clients-carousel">
      <div className="clients-marquee">
        <div className="clients-marquee-track">
          {[false, true].map((duplicate) => (
            <ul className="clients-marquee-group" key={String(duplicate)} aria-hidden={duplicate || undefined} aria-label={duplicate ? undefined : 'Marcas da trajetória da 3ADS'}>
              {clients.map((name, index) => (
                <li className="clients-marquee-item" key={name}>
                  <img
                    src={`./brand/clients/client-${index + 1}.png`}
                    alt={duplicate ? '' : name}
                    width="188"
                    height="100"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    draggable={false}
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
