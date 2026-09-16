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
    openProject: 'Open project',
    photoTitle: 'photo.jpg',
    photoAlt: 'Nikita Chaturov, Infrastructure Engineer',
    terminalReady: 'diagnostics complete / ready for contact',
    explorerMeta: 'Repository file',
    cvStatus: '2 public PDF files available',
    contactStatus: 'Primary channel: Telegram',
    commandProfile: './whoami',
    commandProof: './healthcheck --summary',
    commandWork: 'ls services/*.yaml',
    commandStack: 'cat stack.md',
    shellReady: 'session ready / production infrastructure profile loaded',
    statusOk: 'OK',
    yamlProblem: 'problem',
    yamlAction: 'action',
    yamlResult: 'result',
    yamlStack: 'stack',
    yamlRepo: 'repo',
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
    openProject: 'Открыть проект',
    photoTitle: 'photo.jpg',
    photoAlt: 'Никита Чатуров, Infrastructure Engineer',
    terminalReady: 'diagnostics complete / готов к контакту',
    explorerMeta: 'Файл репозитория',
    cvStatus: '2 публичных PDF-файла доступны',
    contactStatus: 'Основной канал: Telegram',
    commandProfile: './whoami',
    commandProof: './healthcheck --summary',
    commandWork: 'ls services/*.yaml',
    commandStack: 'cat stack.md',
    shellReady: 'session ready / профиль production infrastructure загружен',
    statusOk: 'OK',
    yamlProblem: 'problem',
    yamlAction: 'action',
    yamlResult: 'result',
    yamlStack: 'stack',
    yamlRepo: 'repo',
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

  return (
    <section id="profile" className="hero window" aria-labelledby="hero-title">
      <TitleBar title="nikchester@portfolio:~" lang={lang} setLang={setLang} />
      <nav className="menu-bar" aria-label="Page sections">
        <a className="start-link" href="#profile">{text.commandProfile}</a>
        <a href="#proof">{text.commandProof}</a>
        <a href="#work">{text.commandWork}</a>
        <a href="#stack">{text.commandStack}</a>
        <a href="#cv">{text.cv}</a>
        <a href="#contact">{text.contact}</a>
      </nav>
      <div className="hero-grid window-body">
        <div>
          <p className="shell-line"><span>$</span> {text.commandProfile}</p>
          <p className="eyebrow">{content.hero.eyebrow}</p>
          <h1 id="hero-title">{content.hero.name}</h1>
          <p className="role">{content.hero.role}</p>
          <HtmlBlock html={content.hero.html} />
          <p className="shell-status">[{text.statusOk}] {text.shellReady}</p>
          <div className="actions">
            <a className="button primary" href={siteConfig.telegramUrl}>{content.hero.ctaLabel}</a>
            <a className="button" href={siteConfig.githubUrl}>{content.hero.secondaryLabel}</a>
          </div>
        </div>
        <figure className="photo-window">
          <figcaption className="mini-titlebar">{text.photoTitle}</figcaption>
          <img src={siteConfig.photo} alt={text.photoAlt} width={480} height={480} />
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
              <span className="file-icon" aria-hidden="true" />
              <span>{`services/${String(index + 1).padStart(2, '0')}-${item.slug}.yaml`}</span>
              <span className="project-priority">{item.priority}</span>
            </div>
            <div className="manifest-head">
              <span className="project-meta">{text.explorerMeta}</span>
              <h3>{item.title}</h3>
              <code>status: {text.statusOk.toLowerCase()}</code>
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
              <div>
                <dt>{text.yamlRepo}:</dt>
                <dd>{item.url.replace('https://github.com/', 'github:')}</dd>
              </div>
            </dl>
            <div className="project-footer">
              <a className="button small" href={item.url}>{text.openProject}</a>
            </div>
          </article>
        ))}
      </div>
    </Window>
  );
}

function CvPanel({ lang }: { lang: Language }) {
  const text = labels[lang];
  return (
    <Window title={text.cv} id="cv" className="cv-window">
      <div className="notepad-lines">
        <p>{lang === 'en' ? 'Public CV without phone number.' : 'Публичное CV без телефона.'}</p>
        <p className="muted-line">{text.cvStatus}</p>
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
      <div className="dialog-badge" aria-hidden="true">&gt;_</div>
      <HtmlBlock html={content.contact.html} />
      <div className="link-list">
        <a href={siteConfig.telegramUrl}>Telegram</a>
        <a href={`mailto:${siteConfig.email}`}>{text.email}</a>
        <a href={siteConfig.githubUrl}>{text.github}</a>
        <a href={siteConfig.linkedinUrl}>{text.linkedin}</a>
        <a href={siteConfig.kworkUrl}>{text.kwork}</a>
      </div>
    </>
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
      <div className="window-row bottom-row">
        <CvPanel lang={lang} />
        <Window title={text.contact} id="contact" className="contact-window" status={text.contactStatus}>
          <ContactPanel content={content} lang={lang} />
        </Window>
      </div>
    </main>
  );
}
