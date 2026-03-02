import Link from "next/link";
import info from "@/data/info.json";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface text-ink mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-15">
          {/* Column 1: Restaurant Info */}
          <div>
            <h3 className="text-ink font-bold text-lg mb-3">{info.name}</h3>
            <p className="text-sm text-ink-muted mb-4">{info.tagline}</p>
            <address className="not-italic text-sm space-y-1 text-ink-muted">
              <p>{info.address.street}</p>
              <p>
                {info.address.city}, {info.address.state} {info.address.zip}
              </p>
              <p className="mt-2">
                <a href={`tel:${info.phone}`} className="hover:text-accent transition-colors">
                  {info.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${info.email}`} className="hover:text-accent transition-colors">
                  {info.email}
                </a>
              </p>
            </address>
            <br/>
            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-ink font-medium text-sm mb-2">Follow Us</h4>
              <div className="flex gap-3">
                {info.socialLinks.map ((link) => (
                  <a
                    key={link.type}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.type}
                  >
                    <img src={link.icon} alt={link.type} className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Hours */}
          <div>
            <h3 className="text-ink font-bold text-lg mb-3">Business Hours</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-fit">
              {info.businessHours.map((bh) => (
                <div key={bh.type}>
                  <h5 className="text-ink-muted font-semibold text-base mb-1">{bh.type}</h5>
                  <ul className="text-sm space-y-1 text-ink-muted">
                    {bh.details.map((d) => (
                      <li key={d.days} className="flex flex-col">
                        <span className="font-medium text-ink">{d.days}</span>
                        <span>{d.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-ink/20 text-center text-xs text-ink-muted">
          <p>
            &copy; {currentYear} {info.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
