(() => {
  'use strict';

  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const store = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch {} },
  };

  const EMAIL = 'lucianopereiradejesus14@gmail.com';

  // ---------- Textos em inglês ----------
  const EN = {
    'meta.title': 'Luciano Pereira · Developer in training',
    'skip': 'Skip to content',
    'menu': 'Open menu',
    'nav.inicio': 'Home',
    'nav.trajetoria': 'Journey',
    'nav.projetos': 'Projects',
    'nav.contato': 'Contact',
    'hero.tag': 'Young Apprentice · Seguros Sura',
    'hero.headline': 'I turn ideas and repetitive processes into <span class="grad">code</span>.',
    'hero.idade': '17 years old',
    'hero.local': 'Taboão da Serra — SP, Brazil',
    'hero.bio': "I'm a young apprentice in the Operations team at Seguros Sura and a 2nd-year student in a high school program integrated with a Systems Development technical course at ETEC Embu das Artes. I like using programming to solve real problems: automating repetitive work, bringing ideas to life and understanding every layer, from front-end to database. These are the projects that mark that journey.",
    'hero.cta1': 'See projects',
    'hero.cta2': "Let's talk",
    'hero.alt': "Funko Pop-style figure of Luciano: curly hair, burgundy t-shirt and black pants",
    'hero.chip': 'Automation',
    'hero.scroll': 'Scroll down',
    'traj.kicker': 'about me',
    'traj.title': 'My <span class="grad">journey</span>',
    'traj.lead': 'From Pygame games to full stack apps. And now, real-world automation at an insurance company.',
    'traj.stat1': 'projects in this portfolio',
    'traj.stat2': 'technologies used',
    'traj.stat3': 'year of the technical course',
    'traj.agora': 'Now',
    'traj.t1.date': '2026 — present',
    'traj.t1.role': 'Young Apprentice · Operations',
    'traj.t1.desc': 'I work in the Operations team and use programming to build automations that make everyday processes faster.',
    'traj.t2.role': 'High School + Systems Development Technician',
    'traj.t2.desc': 'Currently in my 2nd year, building a solid base in programming logic and systems development.',
    'traj.t3.date': 'Ongoing',
    'traj.t3.title': 'Personal projects',
    'traj.t3.role': 'Learning by doing',
    'traj.t3.desc': 'I learn by building: from Python games to full stack apps published online.',
    'stack.title': 'technologies I use',
    'proj.kicker': 'work',
    'proj.title': 'My <span class="grad">projects</span>',
    'proj.sub': "From a Python game to a full stack app: what I've been building.",
    'proj.filtrar': 'Filter projects',
    'proj.f.todos': 'All',
    'proj.f.projeto': 'Projects',
    'proj.f.mini': 'Mini projects',
    'contato.kicker': 'contact',
    'contato.title': "Let's <span class=\"grad\">talk</span>",
    'contato.text': "I'm always open to exchanging ideas, learning and collaborating on projects. Reach me through any of these:",
    'contato.copiar': 'Copy e-mail',
    'footer.feito': 'Made with HTML, CSS and JavaScript · Hosted on Netlify',
    'footer.topo': 'Back to top ↑',
    'ui.fechar': 'Close',
  };

  const UI = {
    pt: {
      projeto: 'Projeto principal',
      mini: 'Mini projeto',
      ver: 'Ver projeto',
      codigo: 'Código',
      ampliar: 'Ampliar vídeo',
      video: 'Vídeo',
      copiado: 'E-mail copiado!',
      erro: 'Não consegui carregar os projetos agora. Tente recarregar a página.',
      vazio: 'Nenhum projeto nesta categoria ainda.',
    },
    en: {
      projeto: 'Main project',
      mini: 'Mini project',
      ver: 'View project',
      codigo: 'Code',
      ampliar: 'Expand video',
      video: 'Video',
      copiado: 'E-mail copied!',
      erro: "Couldn't load the projects right now. Try reloading the page.",
      vazio: 'No projects in this category yet.',
    },
  };

  const ICON = {
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    expand: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>',
    play: '<svg viewBox="0 0 24 24" class="fill" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>',
    github: '<svg viewBox="0 0 24 24" class="fill" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>',
  };

  const BASE_TECHS = ['HTML5', 'CSS3', 'JavaScript', 'Python', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Git', 'GitHub'];
  const NOT_TECH = new Set(['cli', 'automação', 'automacao', 'automation', 'game dev', 'web', 'api', 'front-end', 'back-end', 'full stack']);
  const TECH_COLOR = {
    'html5': '#f06529', 'html': '#f06529', 'css3': '#2965f1', 'css': '#2965f1', 'javascript': '#f7df1e',
    'typescript': '#3178c6', 'python': '#ffd43b', 'pygame': '#7bd88f', 'react': '#61dafb', 'node.js': '#7bd88f',
    'postgresql': '#6b8cff', 'tailwind css': '#38bdf8', 'jwt': '#e879f9', 'git': '#f05032', 'github': '#ffffff',
    'bootstrap': '#a87bff', 'sql': '#60a5fa', 'excel': '#21a366', 'vba': '#21a366', 'selenium': '#43b02a',
    'power automate': '#2f8cff', 'power bi': '#f2c811', 'brevo': '#0bd18a', 'render': '#46e3b7', 'java': '#f89820',
  };

  // ---------- Idioma ----------
  const ptText = new Map();
  const ptAttr = new Map();
  const TITLE_PT = document.title;
  let lang = 'pt';
  const t = (key) => UI[lang][key];

  function captureDefaults() {
    $$('[data-i18n]').forEach((el) => ptText.set(el, el.innerHTML));
    $$('[data-i18n-attr]').forEach((el) => {
      const saved = {};
      el.dataset.i18nAttr.split(';').forEach((pair) => {
        const attr = pair.split(':')[0].trim();
        saved[attr] = el.getAttribute(attr);
      });
      ptAttr.set(el, saved);
    });
  }

  function setLang(next, save = true) {
    lang = next === 'en' ? 'en' : 'pt';
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.title = lang === 'pt' ? TITLE_PT : EN['meta.title'];

    ptText.forEach((html, el) => {
      el.innerHTML = lang === 'pt' ? html : (EN[el.dataset.i18n] ?? html);
    });
    ptAttr.forEach((saved, el) => {
      el.dataset.i18nAttr.split(';').forEach((pair) => {
        const [attr, key] = pair.split(':').map((s) => s.trim());
        el.setAttribute(attr, lang === 'pt' ? saved[attr] : (EN[key] ?? saved[attr]));
      });
    });

    $$('.lang [data-lang]').forEach((btn) => btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang)));
    if (save) store.set('lang', lang);

    if (projects) renderProjects();
    requestAnimationFrame(() => { moveNavIndicator(); moveFilterPill(); });
  }

  function initialLang() {
    const saved = store.get('lang');
    if (saved === 'pt' || saved === 'en') return saved;
    return (navigator.language || 'pt').toLowerCase().startsWith('pt') ? 'pt' : 'en';
  }

  // ---------- Navegação ----------
  const nav = $('#nav');
  const menuBtn = $('#menuBtn');
  const navIndicator = $('.nav-indicator');
  const progress = $('#progress');
  const sections = $$('main section[id]');
  let currentSection = '';

  function toggleMenu(force) {
    const open = typeof force === 'boolean' ? force : !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  }

  function moveNavIndicator() {
    const link = $(`.nav-links a[href="#${currentSection}"]`);
    if (!navIndicator || !link) return;
    navIndicator.style.width = `${link.offsetWidth}px`;
    navIndicator.style.transform = `translateX(${link.offsetLeft}px)`;
    navIndicator.style.opacity = '1';
  }

  function setActiveSection(id) {
    if (id === currentSection) return;
    currentSection = id;
    $$('.nav-links a').forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
    moveNavIndicator();
  }

  let scrollTicking = false;
  function onScroll() {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      scrollTicking = false;
      const y = window.scrollY;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      nav.classList.toggle('scrolled', y > 24);
      progress.style.setProperty('--p', max > 0 ? Math.min(1, y / max).toFixed(4) : '0');

      let id = sections[0].id;
      const line = window.innerHeight * 0.4;
      sections.forEach((s) => { if (s.getBoundingClientRect().top <= line) id = s.id; });
      if (window.innerHeight + y >= doc.scrollHeight - 4) id = sections[sections.length - 1].id;
      setActiveSection(id);
    });
  }

  // ---------- Animações ----------
  const revealObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    : null;

  function observeReveals(root = document) {
    $$('.reveal:not(.in)', root).forEach((el) => {
      if (revealObserver) revealObserver.observe(el);
      else el.classList.add('in');
    });
  }

  function initPointerEffects() {
    if (!finePointer || reduceMotion) return;
    const spot = $('.bg-spot');
    const hero = $('#heroVisual');
    let x = 0;
    let y = 0;
    let frame = 0;

    const apply = () => {
      frame = 0;
      spot.style.setProperty('--mx', `${x}px`);
      spot.style.setProperty('--my', `${y}px`);
      const r = hero.getBoundingClientRect();
      if (r.bottom > 0) {
        const dx = (x - (r.left + r.width / 2)) / window.innerWidth;
        const dy = (y - (r.top + r.height / 2)) / window.innerHeight;
        hero.style.setProperty('--tx', `${(dx * 26).toFixed(1)}px`);
        hero.style.setProperty('--ty', `${(dy * 26).toFixed(1)}px`);
      }
    };

    window.addEventListener('pointermove', (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    }, { passive: true });
  }

  function countUp(el, to) {
    if (reduceMotion || to <= 0) { el.textContent = String(to); return; }
    const start = performance.now();
    const duration = 1300;
    const step = (now) => {
      const k = Math.min(1, (now - start) / duration);
      el.textContent = String(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // ---------- Projetos ----------
  const grid = $('#projectsGrid');
  const stateMsg = $('#projectsState');
  const filterPill = $('.filter-pill');
  let projects = null;
  let filter = 'todos';

  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

  const hasValue = (v) => (Array.isArray(v) ? v.filter((x) => String(x ?? '').trim()).length > 0 : String(v ?? '').trim() !== '');

  const loc = (obj, field) => (lang === 'en' && hasValue(obj[`${field}_en`]) ? obj[`${field}_en`] : obj[field]);

  const list = (v) => (Array.isArray(v) ? v : []).map((x) => String(x ?? '').trim()).filter(Boolean);

  function safeUrl(raw) {
    const url = String(raw ?? '').trim();
    if (!url) return '';
    if (/^[a-z][a-z0-9+.-]*:/i.test(url)) return /^https?:/i.test(url) ? url : '';
    const firstPart = url.split('/')[0];
    if (/^[\w-]+(\.[\w-]+)+$/.test(firstPart) && !/\.(html?|json|php)$/i.test(firstPart)) return `https://${url}`;
    return url;
  }

  const catOf = (p) => (p.categoria === 'projeto' ? 'projeto' : 'mini');
  const techKey = (name) => name.trim().toLowerCase();

  function mediaHTML(p, title, techs) {
    const videos = (Array.isArray(p.videos) ? p.videos : []).filter((v) => v && hasValue(v.arquivo));
    if (videos.length) {
      const tabs = videos.length > 1
        ? `<div class="media-tabs">${videos.map((v, k) => `<button type="button" data-video="${k}" aria-pressed="${k === 0}">${esc(loc(v, 'rotulo') || `${t('video')} ${k + 1}`)}</button>`).join('')}</div>`
        : '';
      return `<div class="media has-video">
        <video muted loop playsinline preload="metadata" src="${esc(videos[0].arquivo)}#t=0.1"></video>
        <span class="media-play">${ICON.play}</span>
        <button class="media-expand" type="button" aria-label="${esc(t('ampliar'))}">${ICON.expand}</button>
        ${tabs}
      </div>`;
    }

    const inner = hasValue(p.capa)
      ? `<img src="${esc(p.capa)}" alt="" loading="lazy">`
      : `<div class="cover-body">
          <span class="cover-title grad">${esc(title)}</span>
          <div class="cover-lines"><span></span><span></span><span></span></div>
          <div class="cover-tags">${techs.slice(0, 3).map((x) => `<i>${esc(x)}</i>`).join('')}</div>
        </div>`;
    return `<div class="media"><div class="cover"><div class="cover-window"><div class="cover-bar"><i></i><i></i><i></i></div>${inner}</div></div></div>`;
  }

  function cardHTML(p, index) {
    const cat = catOf(p);
    const title = loc(p, 'titulo');
    const desc = loc(p, 'descricao');
    const feats = list(loc(p, 'recursos'));
    const techs = list(p.tecnologias);
    const link = safeUrl(p.link);
    const code = safeUrl(p.codigo);

    const actions = (link || code) ? `<div class="card-actions">
        ${link ? `<a class="btn btn-primary btn-sm" href="${esc(link)}" target="_blank" rel="noopener">${esc(t('ver'))} ${ICON.arrow}</a>` : ''}
        ${code ? `<a class="btn btn-ghost btn-sm" href="${esc(code)}" target="_blank" rel="noopener">${ICON.github} ${esc(t('codigo'))}</a>` : ''}
      </div>` : '';

    return `<article class="card ${cat === 'projeto' ? 'feature' : ''}" data-cat="${cat}" data-index="${index}">
      ${mediaHTML(p, title, techs)}
      <div class="card-body">
        <div class="card-top">
          <span class="cat ${cat}">${esc(t(cat))}</span>
          <span class="num">${String(index + 1).padStart(2, '0')}</span>
        </div>
        <h3>${esc(title)}</h3>
        ${hasValue(desc) ? `<p class="desc">${esc(desc)}</p>` : ''}
        ${feats.length ? `<ul class="feats">${feats.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>` : ''}
        ${techs.length ? `<div class="tags">${techs.map((x) => `<span class="tag">${esc(x)}</span>`).join('')}</div>` : ''}
        ${actions}
      </div>
    </article>`;
  }

  function renderProjects() {
    const firstRender = !grid.dataset.rendered;
    grid.innerHTML = projects.map(cardHTML).join('');
    grid.dataset.rendered = '1';
    applyFilter(false, firstRender);
  }

  function applyFilter(animate = true, reveal = false) {
    let shown = 0;
    $$('.card', grid).forEach((card) => {
      const visible = filter === 'todos' || card.dataset.cat === filter;
      card.hidden = !visible;
      if (!visible) {
        const video = $('video', card);
        if (video) video.pause();
        return;
      }
      card.style.setProperty('--i', String(shown++));
      if (animate && !reduceMotion) {
        card.classList.remove('card-in');
        void card.offsetWidth;
        card.classList.add('card-in');
      } else if (reveal) {
        card.classList.add('reveal');
        card.style.setProperty('--d', `${(shown % 2) * 0.08}s`);
      }
    });
    if (reveal) observeReveals(grid);

    stateMsg.hidden = shown > 0 || !projects;
    if (!stateMsg.hidden) stateMsg.textContent = projects.length ? t('vazio') : t('erro');
  }

  function updateCounts() {
    const counts = { todos: projects.length, projeto: 0, mini: 0 };
    projects.forEach((p) => { counts[catOf(p)] += 1; });
    $$('[data-count-for]').forEach((el) => { el.textContent = projects.length ? String(counts[el.dataset.countFor]) : ''; });
    requestAnimationFrame(moveFilterPill);
  }

  function moveFilterPill() {
    const active = $('.filter[aria-pressed="true"]');
    if (!filterPill || !active) return;
    filterPill.style.width = `${active.offsetWidth}px`;
    filterPill.style.transform = `translateX(${active.offsetLeft}px)`;
  }

  function collectTechs() {
    const seen = new Map();
    [...BASE_TECHS, ...(projects || []).flatMap((p) => list(p.tecnologias))].forEach((name) => {
      const key = techKey(name);
      if (!NOT_TECH.has(key) && !seen.has(key)) seen.set(key, name);
    });
    return [...seen.values()];
  }

  function buildMarquee() {
    const techs = collectTechs();
    const fill = (arr) => {
      let out = [...arr];
      while (out.length < 14) out = out.concat(arr);
      return out;
    };
    const chip = (name, dup) => `<span class="tech${dup ? ' dup' : ''}"${dup ? ' aria-hidden="true"' : ''}><i style="--c:${TECH_COLOR[techKey(name)] || '#a855f7'}"></i>${esc(name)}</span>`;
    const rowA = fill(techs);
    const rowB = fill([...techs].reverse());
    $('#marqueeA').innerHTML = techs.map((n) => chip(n, false)).join('') + rowA.slice(techs.length).map((n) => chip(n, true)).join('') + rowA.map((n) => chip(n, true)).join('');
    $('#marqueeB').innerHTML = [...rowB, ...rowB].map((n) => chip(n, true)).join('');
  }

  function updateStats() {
    const target = $('#stats');
    const run = () => {
      countUp($('#statProjetos'), projects.length);
      countUp($('#statTecs'), collectTechs().length);
    };
    if (!revealObserver) { run(); return; }
    const once = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      once.disconnect();
      run();
    }, { threshold: 0.4 });
    once.observe(target);
  }

  async function loadProjects() {
    try {
      const res = await fetch('data/projetos.json', { cache: 'no-cache' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const items = Array.isArray(data) ? data : data.projetos;
      projects = (Array.isArray(items) ? items : []).filter((p) => p && hasValue(p.titulo));
    } catch (err) {
      console.error('[portfólio] não foi possível carregar data/projetos.json', err);
      projects = [];
    }
    renderProjects();
    updateCounts();
    buildMarquee();
    updateStats();
  }

  // ---------- Vídeos ----------
  const lightbox = $('#lightbox');
  const lightboxVideo = $('video', lightbox);
  const lightboxCaption = $('.lightbox-caption', lightbox);

  function openLightbox(src, caption) {
    if (typeof lightbox.showModal !== 'function') { window.open(src, '_blank', 'noopener'); return; }
    lightboxVideo.src = src;
    lightboxCaption.textContent = caption || '';
    lightbox.showModal();
    lightboxVideo.play().catch(() => {});
  }

  function videoOf(card) {
    const p = projects[Number(card.dataset.index)];
    const videos = (p.videos || []).filter((v) => v && hasValue(v.arquivo));
    const tab = $('.media-tabs [aria-pressed="true"]', card);
    const v = videos[tab ? Number(tab.dataset.video) : 0];
    const label = v && hasValue(loc(v, 'rotulo')) ? ` · ${loc(v, 'rotulo')}` : '';
    return { src: v && v.arquivo, caption: `${loc(p, 'titulo')}${label}` };
  }

  function bindProjectEvents() {
    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      if (!card || !projects) return;

      const tab = e.target.closest('.media-tabs button');
      if (tab) {
        e.stopPropagation();
        $$('.media-tabs button', card).forEach((b) => b.setAttribute('aria-pressed', String(b === tab)));
        const video = $('video', card);
        video.src = `${videoOf(card).src}#t=0.1`;
        if (card.matches(':hover') && finePointer) video.play().catch(() => {});
        return;
      }

      if (e.target.closest('.media.has-video')) {
        const { src, caption } = videoOf(card);
        if (src) openLightbox(src, caption);
      }
    });

    if (finePointer) {
      grid.addEventListener('pointerover', (e) => {
        const media = e.target.closest('.card')?.querySelector('.media.has-video');
        if (!media || media.classList.contains('playing')) return;
        const video = $('video', media);
        video.play().then(() => media.classList.add('playing')).catch(() => {});
      });
      grid.addEventListener('pointerout', (e) => {
        const card = e.target.closest('.card');
        if (!card || card.contains(e.relatedTarget)) return;
        const media = $('.media.has-video', card);
        if (!media) return;
        $('video', media).pause();
        media.classList.remove('playing');
      });
      grid.addEventListener('pointermove', (e) => {
        const card = e.target.closest('.card');
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      }, { passive: true });
    }

    grid.addEventListener('loadedmetadata', (e) => {
      const video = e.target;
      if (!(video instanceof HTMLVideoElement) || !video.paused || !Number.isFinite(video.duration)) return;
      video.currentTime = Math.min(4, video.duration * 0.1);
    }, true);

    $('.lightbox-close', lightbox).addEventListener('click', () => lightbox.close());
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.close(); });
    lightbox.addEventListener('close', () => {
      lightboxVideo.pause();
      lightboxVideo.removeAttribute('src');
      lightboxVideo.load();
    });

    $$('.filter').forEach((btn) => btn.addEventListener('click', () => {
      if (btn.dataset.filter === filter) return;
      filter = btn.dataset.filter;
      $$('.filter').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      moveFilterPill();
      if (projects) applyFilter(true);
    }));
  }

  // ---------- Contato ----------
  let toastTimer = 0;
  function toast(message) {
    const el = $('#toast');
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
  }

  function bindContact() {
    $('#copyEmail').addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(EMAIL);
        toast(t('copiado'));
      } catch {
        window.location.href = `mailto:${EMAIL}`;
      }
    });
  }

  // ---------- Início ----------
  function init() {
    captureDefaults();
    setLang(initialLang(), false);

    $$('.lang [data-lang]').forEach((btn) => btn.addEventListener('click', () => setLang(btn.dataset.lang)));
    menuBtn.addEventListener('click', () => toggleMenu());
    $$('.nav-links a').forEach((a) => a.addEventListener('click', () => toggleMenu(false)));
    document.addEventListener('click', (e) => { if (nav.classList.contains('open') && !nav.contains(e.target)) toggleMenu(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') toggleMenu(false); });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => { moveNavIndicator(); moveFilterPill(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { moveNavIndicator(); moveFilterPill(); });
    onScroll();

    $('#year').textContent = String(new Date().getFullYear());

    observeReveals();
    initPointerEffects();
    bindProjectEvents();
    bindContact();
    buildMarquee();
    loadProjects();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
