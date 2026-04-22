const navItems = ["Home", "Guide", "Status"];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell-band site-header__inner">
        <div>
          <p className="site-header__eyebrow">Minimal scaffold</p>
          <p className="site-header__title">Project Starter</p>
        </div>

        <nav aria-label="Primary" className="site-header__nav">
          {navItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </nav>
      </div>
    </header>
  );
}
