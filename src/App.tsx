import { useEffect, useState } from 'react';
import { siteContent } from './generated/content';
import { siteConfig } from './siteConfig';
import type { Language, PageContent } from './types';

const labels = {
  en: {
    work: 'Selected work',
    stack: 'Stack',
    cv: 'CV',
    contact: 'Contact',
    downloadEn: 'Download EN CV',
    downloadRu: 'Download RU CV',
    email: 'Email',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    kwork: 'Kwork',
    freelance: 'Freelance',
    contactViaKwork: 'Contact via Kwork',
    contactViaTelegram: 'Contact via Telegram',
    caseDetails: 'Case details',
    personal: 'Personal',
    openProject: 'Open project',
    openRedditPost: 'Reddit post',
    photoTitle: 'photo.jpg',
    photoAlt: 'Nikita Chaturov, Infrastructure Engineer',
    terminalReady: 'diagnostics complete / ready for contact',
    contactStatus: 'Primary channel: Telegram',
    commandProfile: './whoami',
    commandProof: './healthcheck --summary',
    commandWork: 'ls services/*.yaml',
    commandStack: 'cat stack.md',
    shellReady: 'profile loaded / automation, monitoring, incidents',
    commandRole: 'cat role.txt',
    commandContact: './healthcheck --contact',
    statusOk: 'OK',
    yamlProblem: 'problem',
    yamlAction: 'action',
    yamlResult: 'result',
    yamlStack: 'stack',
    internalCase: 'Internal case',
  },
  ru: {
    work: 'Работы',
    stack: 'Стек',
    cv: 'CV',
    contact: 'Контакты',
    downloadEn: 'Скачать EN CV',
    downloadRu: 'Скачать RU CV',
    email: 'Email',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    kwork: 'Kwork',
    freelance: 'Фриланс',
    contactViaKwork: 'Написать через Kwork',
    contactViaTelegram: 'Написать в Telegram',
    caseDetails: 'Подробнее',
    personal: 'Личное',
    openProject: 'Открыть проект',
    openRedditPost: 'Пост на Reddit',
    photoTitle: 'photo.jpg',
    photoAlt: 'Никита Чатуров, Infrastructure Engineer',
    terminalReady: 'diagnostics complete / готов к контакту',
    contactStatus: 'Основной канал: Telegram',
    commandProfile: './whoami',
    commandProof: './healthcheck --summary',
    commandWork: 'ls services/*.yaml',
    commandStack: 'cat stack.md',
    shellReady: 'profile loaded / автоматизация, мониторинг, инциденты',
    commandRole: 'cat role.txt',
    commandContact: './healthcheck --contact',
    statusOk: 'OK',
    yamlProblem: 'problem',
    yamlAction: 'action',
    yamlResult: 'result',
    yamlStack: 'stack',
    internalCase: 'Внутренний кейс',
  },
} as const;

function HtmlBlock({ html }: { html: string }) {
  return <div className="html-block" dangerouslySetInnerHTML={{ __html: html }} />;
}

function extractParagraphs(html: string) {
  return [...html.matchAll(/<p><strong>([^<:]+):<\/strong>\s*([\s\S]*?)<\/p>/g)].map((match) => ({
    label: match[1].toLowerCase(),
    text: match[2].replace(/<[^>]+>/g, '').trim(),
  }));
}

function TitleBar({ title, lang, setLang }: { title: string; lang: Language; setLang?: (lang: Language) => void }) {
  return (
    <div className="titlebar">
      <span>{title}</span>
      {setLang ? (
        <div className="titlebar-controls" aria-label="Language switch">
          <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')} type="button">EN</button>
          <button className={lang === 'ru' ? 'active' : ''} onClick={() => setLang('ru')} type="button">RU</button>
        </div>
      ) : (
        <span className="titlebar-status">Ready</span>
      )}
    </div>
  );
}

function Window({
  title,
  children,
  className = '',
  id,
  status,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
  status?: string;
}) {
  return (
    <section id={id} className={`window ${className}`} aria-labelledby={`${title.replace(/\W+/g, '-').toLowerCase()}-title`}>
      <TitleBar title={title} lang="en" />
      <div className="window-body" id={`${title.replace(/\W+/g, '-').toLowerCase()}-title`}>{children}</div>
      {status ? <div className="statusbar">{status}</div> : null}
    </section>
  );
}

function Hero({ content, lang, setLang }: { content: PageContent; lang: Language; setLang: (lang: Language) => void }) {
  const text = labels[lang];
  const [showAnsi, setShowAnsi] = useState(false);

  return (
    <section id="profile" className="hero window" aria-labelledby="hero-title">
      <TitleBar title="nikchester@portfolio:~" lang={lang} setLang={setLang} />
      <nav className="menu-bar" aria-label="Page sections">
        <a className="start-link" href="#profile">{text.commandProfile}</a>
        <a href="#proof">{text.commandProof}</a>
        <a href="#work">{text.commandWork}</a>
        <a href="#freelance">{text.freelance}</a>
        <a href="#stack">{text.commandStack}</a>
        <a href="#cv">{text.cv}</a>
        <a href="#contact">{text.contact}</a>
      </nav>
      <div className="hero-grid window-body">
        <div className="hero-terminal">
          <p className="shell-line"><span>$</span> {text.commandProfile}</p>
          <p className="eyebrow">{content.hero.eyebrow}</p>
          <h1 id="hero-title">{content.hero.name}</h1>
          <p className="shell-line"><span>$</span> {text.commandRole}</p>
          <p className="role">{content.hero.role}</p>
          <HtmlBlock html={content.hero.html} />
          <p className="shell-line"><span>$</span> {text.commandContact}</p>
          <p className="shell-status">[{text.statusOk}] {text.shellReady}</p>
          <div className="actions">
            <a className="button primary" href={siteConfig.telegramUrl}>{content.hero.ctaLabel}</a>
            <a className="button" href={siteConfig.githubUrl}>{content.hero.secondaryLabel}</a>
          </div>
        </div>
        <figure
          className={`photo-window ${showAnsi ? 'show-ansi' : ''}`}
          onClick={() => setShowAnsi((value) => !value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setShowAnsi((value) => !value);
            }
          }}
          tabIndex={0}
        >
          <figcaption className="mini-titlebar">{text.photoTitle}</figcaption>
          <div className="photo-stack">
            <img className="photo-original" src={siteConfig.photo} alt={text.photoAlt} width={480} height={480} />
            <img className="photo-ansi" src={siteConfig.ansiPhoto} alt="" aria-hidden="true" width={480} height={480} />
          </div>
        </figure>
      </div>
    </section>
  );
}

function WorkGrid({ content, lang }: { content: PageContent; lang: Language }) {
  const text = labels[lang];
  return (
    <Window
      title={text.work}
      id="work"
      className="work-window explorer-window"
      status={`${content.work.length} objects selected`}
    >
      <div className="work-grid">
        {content.work.map((item, index) => (
          <article className="project-card" key={item.slug}>
            <div className="project-titlebar">
              <span className="file-icon" aria-hidden="true">&gt;</span>
              <span>{`services/${String(index + 1).padStart(2, '0')}-${item.slug}.yaml`}</span>
              <span className="project-priority">{item.priority}</span>
            </div>
            <div className="manifest-head">
              <h3>{item.title}</h3>
            </div>
            <dl className="manifest-body">
              {extractParagraphs(item.html).map((entry) => (
                <div key={entry.label}>
                  <dt>{entry.label}:</dt>
                  <dd>{entry.text}</dd>
                </div>
              ))}
              <div>
                <dt>{text.yamlStack}:</dt>
                <dd>{item.stack}</dd>
              </div>
            </dl>
            <div className="project-footer">
              {item.url ? <a className="button small" href={item.url}>{text.openProject}</a> : null}
              {item.caseUrl ? <a className="button small" href={item.caseUrl}>{text.caseDetails}</a> : null}
              {!item.url && !item.caseUrl ? <span className="case-note">{text.internalCase}</span> : null}
              {item.redditUrl ? <a className="button small" href={item.redditUrl}>{text.openRedditPost}</a> : null}
            </div>
          </article>
        ))}
      </div>
    </Window>
  );
}

function FreelancePanel({ content, lang }: { content: PageContent; lang: Language }) {
  const text = labels[lang];

  return (
    <Window title={content.freelance.title} id="freelance" className="freelance-window terminal-window" status="intake: scoped ops task">
      <HtmlBlock html={content.freelance.html} />
      <div className="actions compact equal-actions">
        <a className="button" href={siteConfig.kworkUrl}>{text.contactViaKwork}</a>
        <a className="button" href={siteConfig.telegramUrl}>{text.contactViaTelegram}</a>
      </div>
    </Window>
  );
}

function CvPanel({ lang }: { lang: Language }) {
  const text = labels[lang];
  return (
    <Window title={text.cv} id="cv" className="cv-window">
      <div className="notepad-lines">
        <p>{lang === 'en' ? 'Download public CV.' : 'Скачать публичное CV.'}</p>
      </div>
      <div className="actions compact">
        <a className="button" href={siteConfig.cv.en}>{text.downloadEn}</a>
        <a className="button" href={siteConfig.cv.ru}>{text.downloadRu}</a>
      </div>
    </Window>
  );
}

function ContactPanel({ content, lang }: { content: PageContent; lang: Language }) {
  const text = labels[lang];
  return (
    <>
      <HtmlBlock html={content.contact.html} />
      <div className="link-list">
        <a href={siteConfig.telegramUrl}>Telegram</a>
        <a href={`mailto:${siteConfig.email}`}>{text.email}</a>
        <a href={siteConfig.githubUrl}>{text.github}</a>
        <a href={siteConfig.linkedinUrl}>{text.linkedin}</a>
        <a href={siteConfig.kworkUrl}>{text.kwork}</a>
      </div>
      <div className="personal-links" aria-label={text.personal}>
        <span>{text.personal}</span>
        <a href={siteConfig.unsplashUrl}>Unsplash</a>
        <a href={siteConfig.youtubeUrl}>YouTube</a>
      </div>
    </>
  );
}

const navItems = [
  ['profile', 'commandProfile'],
  ['proof', 'commandProof'],
  ['work', 'commandWork'],
  ['freelance', 'freelance'],
  ['stack', 'commandStack'],
  ['cv', 'cv'],
  ['contact', 'contact'],
] as const;

function SideNav({ lang }: { lang: Language }) {
  const text = labels[lang];
  const [activeId, setActiveId] = useState('profile');

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const sections = navItems.map(([id]) => document.getElementById(id)).filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveId(visible.target.id);
    }, { rootMargin: '-20% 0px -55% 0px', threshold: [0.1, 0.25, 0.5] });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="side-nav" aria-label="Fixed page sections">
      <span className="side-nav-title">nav</span>
      {navItems.map(([id, key]) => (
        <a key={id} href={`#${id}`} className={activeId === id ? 'active' : ''}>{text[key]}</a>
      ))}
    </nav>
  );
}

function updateHead(lang: Language) {
  const title = lang === 'en' ? 'Nikita Chaturov - Infrastructure Engineer' : 'Никита Чатуров - Infrastructure Engineer';
  const description = lang === 'en' ? siteConfig.description : 'Infrastructure Engineer: Linux production-инфраструктура, автоматизация, мониторинг, бэкапы, сети и разбор инцидентов.';

  document.documentElement.lang = lang;
  document.title = title;

  for (const [name, value] of [
    ['description', description],
    ['og:title', title],
    ['og:description', description],
  ]) {
    const selector = name.startsWith('og:') ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    const element = document.querySelector<HTMLMetaElement>(selector);
    if (element) element.content = value;
  }
}

function installAnalytics() {
  const id = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (window.location.hostname !== new URL(siteConfig.siteUrl).hostname) return;
  if (!id || document.querySelector(`[src*="${id}"]`)) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.append(script);

  window.gtag('js', new Date());
  window.gtag('config', id, { send_page_view: false });
  window.gtag('event', 'page_view', {
    page_location: window.location.href,
    page_path: window.location.pathname,
    page_title: document.title,
  });
}

export function App() {
  const [lang, setLang] = useState<Language>('en');
  const content = siteContent[lang] as PageContent;
  const text = labels[lang];

  useEffect(() => updateHead(lang), [lang]);
  useEffect(() => installAnalytics(), []);

  return (
    <main className="desktop-shell">
      <SideNav lang={lang} />
      <Hero content={content} lang={lang} setLang={setLang} />
      <div className="window-row">
        <Window title={content.proof.title} id="proof" className="proof-window terminal-window log-window" status={text.terminalReady}>
          <HtmlBlock html={content.proof.html} />
        </Window>
        <Window title={text.stack} id="stack" className="stack-window control-panel-window">
          <HtmlBlock html={content.stack.html} />
        </Window>
      </div>
      <WorkGrid content={content} lang={lang} />
      <FreelancePanel content={content} lang={lang} />
      <div className="window-row bottom-row">
        <CvPanel lang={lang} />
        <Window title={text.contact} id="contact" className="contact-window" status={text.contactStatus}>
          <ContactPanel content={content} lang={lang} />
        </Window>
      </div>
    </main>
  );
}
