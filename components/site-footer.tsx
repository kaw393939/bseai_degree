import Link from "next/link";

type SiteFooterProps = {
  mode?: "standard" | "presentation";
};

const standardHandoutLinks = [
  { href: "/why-bseai", label: "Why BSEAI" },
  { href: "/from-freshman-to-professional", label: "Curriculum Path" },
  { href: "/engineering-english", label: "Engineering English" },
  { href: "/how-this-was-made", label: "How This Was Made" },
  { href: "/author-context", label: "Author Context" },
  { href: "https://discord.gg/PuKVYQ86ms", label: "BSEAI Discord", external: true },
];

const presentationHandoutLinks = [
  { href: "/why-bseai", label: "Why BSEAI" },
  { href: "/from-freshman-to-professional", label: "Curriculum Path" },
  { href: "/engineering-english", label: "Engineering English" },
  { href: "https://discord.gg/PuKVYQ86ms", label: "BSEAI Discord", external: true },
];

export function SiteFooter({ mode = "standard" }: SiteFooterProps) {
  const links = mode === "presentation" ? presentationHandoutLinks : standardHandoutLinks;
  const eyebrow = mode === "presentation" ? "Handouts" : "Printable handouts";

  return (
    <footer className={`site-footer site-footer--${mode}`}>
      <div className={`site-footer__inner site-footer__inner--${mode}`}>
        {mode === "presentation" ? (
          <div className="site-footer__folio">
            <span className="site-footer__folio-mark">NJIT</span>
            <span className="site-footer__folio-separator" aria-hidden="true">/</span>
            <span className="site-footer__folio-title">B.S. in Enterprise AI</span>
          </div>
        ) : (
          <div className="site-footer__brand">
            <img src="/njit_logo.svg" alt="NJIT" className="site-footer__logo" />
            <div className="site-footer__brand-copy">
              <p className="site-footer__label">NJIT</p>
              <p className="site-footer__title">B.S. in Enterprise AI</p>
            </div>
          </div>
        )}

        <div className="site-footer__handouts">
          <span className="site-footer__eyebrow">{eyebrow}</span>
          <div className="site-footer__links">
            {links.map((link) => (
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="site-footer__link site-footer__link--external"
                >
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href} className="site-footer__link">
                  {link.label}
                </Link>
              )
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
