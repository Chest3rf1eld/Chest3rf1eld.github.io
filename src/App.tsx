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
    openProject: 'Open project',
    photoTitle: 'PHOTO.EXE',
    photoFallback: 'Hero photo is not attached yet.',
    dialogTitle: 'SYSTEM MESSAGE',
    start: 'Start',
    terminalReady: 'diagnostics complete / ready for contact',
    explorerMeta: 'Repository file',
    stackTab: 'System properties',
    cvStatus: '2 public PDF files available',
    contactStatus: 'Primary channel: Telegram',
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
    openProject: 'Открыть проект',
    photoTitle: 'PHOTO.EXE',
    photoFallback: 'Hero photo пока не добавлено.',
    dialogTitle: 'SYSTEM MESSAGE',
    start: 'Пуск',
    terminalReady: 'diagnostics complete / готов к контакту',
    explorerMeta: 'Файл репозитория',
    stackTab: 'Свойства системы',
    cvStatus: '2 публичных PDF-файла доступны',
    contactStatus: 'Основной канал: Telegram',
  },
} as const;

function HtmlBlock({ html }: { html: string }) {
  return <div className="html-block" dangerouslySetInnerHTML={{ __html: html }} />;
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
        <div className="window-buttons" aria-hidden="true"><span /><span /><span /></div>
      )}
    </div>
  );
}

function Window({
  title,
  children,
  className = '',
  status,
  toolbar,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  status?: string;
  toolbar?: React.ReactNode;
}) {
  return (
    <section className={`window ${className}`} aria-labelledby={`${title.replace(/\W+/g, '-').toLowerCase()}-title`}>
      <TitleBar title={title} lang="en" />
      {toolbar ? <div className="toolbar">{toolbar}</div> : null}
      <div className="window-body" id={`${title.replace(/\W+/g, '-').toLowerCase()}-title`}>{children}</div>
      {status ? <div className="statusbar">{status}</div> : null}
    </section>
  );
}

function Hero({ content, lang, setLang }: { content: PageContent; lang: Language; setLang: (lang: Language) => void }) {
  const text = labels[lang];

  return (
    <section className="hero window" aria-labelledby="hero-title">
      <TitleBar title="NIKCHESTER.EXE" lang={lang} setLang={setLang} />
      <div className="menu-bar" aria-hidden="true">
        <span>{text.start}</span><span>Profile</span><span>Work</span><span>Contact</span>
      </div>
      <div className="hero-grid window-body">
        <div>
          <p className="eyebrow">{content.hero.eyebrow}</p>
          <h1 id="hero-title">{content.hero.name}</h1>
          <p className="role">{content.hero.role}</p>
          <HtmlBlock html={content.hero.html} />
          <div className="actions">
            <a className="button primary" href={siteConfig.telegramUrl}>{content.hero.ctaLabel}</a>
            <a className="button" href={siteConfig.githubUrl}>{content.hero.secondaryLabel}</a>
          </div>
        </div>
        <div className="photo-window" role="img" aria-label={text.photoFallback}>
          <div className="mini-titlebar">{text.photoTitle}</div>
          <div className="photo-fallback">
            <strong>{text.dialogTitle}</strong>
            <span>{text.photoFallback}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkGrid({ content, lang }: { content: PageContent; lang: Language }) {
  const text = labels[lang];
  return (
    <Window
      title={text.work}
      className="work-window explorer-window"
      toolbar={<><span>File</span><span>Edit</span><span>View</span><span>Repository</span></>}
      status={`${content.work.length} objects selected`}
    >
      <div className="work-grid">
        {content.work.map((item, index) => (
          <article className="project-card" key={item.slug}>
            <div className="project-titlebar">
              <span className="file-icon" aria-hidden="true" />
              <span>{`PROJECT_${String(index + 1).padStart(2, '0')}.SYS`}</span>
              <span className="project-priority">{item.priority}</span>
            </div>
            <div className="project-head">
              <span className="project-meta">{text.explorerMeta}</span>
              <h3>{item.title}</h3>
            </div>
            <HtmlBlock html={item.html} />
            <p className="stack-line">{item.stack}</p>
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
    <Window title={text.cv} className="cv-window">
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
      <div className="dialog-badge" aria-hidden="true">?</div>
      <HtmlBlock html={content.contact.html} />
      <div className="link-list">
        <a href={siteConfig.telegramUrl}>Telegram</a>
        <a href={`mailto:${siteConfig.email}`}>{text.email}</a>
        <a href={siteConfig.githubUrl}>{text.github}</a>
        <a href={siteConfig.linkedinUrl}>{text.linkedin}</a>
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

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.append(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', id);
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
        <Window title={content.proof.title} className="proof-window terminal-window" status={text.terminalReady}>
          <HtmlBlock html={content.proof.html} />
        </Window>
        <Window title={text.stack} className="stack-window control-panel-window" toolbar={<><span>{text.stackTab}</span><span>Hardware</span><span>Network</span></>}>
          <HtmlBlock html={content.stack.html} />
        </Window>
      </div>
      <WorkGrid content={content} lang={lang} />
      <div className="window-row bottom-row">
        <CvPanel lang={lang} />
        <Window title={text.contact} className="contact-window" status={text.contactStatus}>
          <ContactPanel content={content} lang={lang} />
        </Window>
      </div>
    </main>
  );
}
