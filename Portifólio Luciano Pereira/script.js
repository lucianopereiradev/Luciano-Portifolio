/**
 * @module PortfolioApp
 * @author Luciano Pereir
 * @version 2.0.0
 */

const PortfolioApp = (function () {
    'use strict';

    const S = {
        languageModal: '#languageModal',
        contactModal: '#contactModal',
        redesModal: '#redesModal',
        flagImg: '#flagImg',
        projetosLink: '.projetos',
        contatoLink: '.contato',
        redesLink: '.redes',
        featuresHeader: '.projeto-features p strong',
        translatable: '[data-pt][data-en]'
    };

    /**
     * All text that changes depending on the selected language.
     * Add new keys as necessary; elements on the page should define a
     * `data-key` attribute that matches and an appropriate translation
     * in each language block.
     */
    const translations = {
        pt: {
            recursos: 'Recursos:',
            'feature1-xplace': 'Sistema de Login e Cadastro',
            'feature2-xplace': 'Dashboard Personalizável',
            'feature3-xplace': 'Loja Online',
            'feature4-xplace': 'Carrossel de Imagens',
            'feature5-xplace': 'Design Responsivo',
            'feature1-remind': 'Autenticação de Usuário',
            'feature2-remind': 'Sistema de Login/Registro',
            'feature3-remind': 'Modal de Contato',
            'feature4-remind': 'Dashboard Intuitivo',
            'feature5-remind': 'Componentes Reutilizáveis'
        },
        en: {
            recursos: 'Features:',
            'feature1-xplace': 'Login and Registration System',
            'feature2-xplace': 'Customizable Dashboard',
            'feature3-xplace': 'Online Store',
            'feature4-xplace': 'Image Carousel',
            'feature5-xplace': 'Responsive Design',
            'feature1-remind': 'User Authentication',
            'feature2-remind': 'Login/Registration System',
            'feature3-remind': 'Contact Modal',
            'feature4-remind': 'Intuitive Dashboard',
            'feature5-remind': 'Reusable Components'
        }
    };

    let currentLanguage = localStorage.getItem('language') || 'pt';

    const log = (...args) => {
        if (window.console && console.log) {
            console.log('[PortfolioApp]', ...args);
        }
    };

    const $ = (sel) => document.querySelector(sel);
    const $all = (sel) => Array.from(document.querySelectorAll(sel));

    const toggleModal = (sel, show) => {
        const modal = $(sel);
        if (modal) {
            modal.style.display = show ? 'flex' : 'none';
        }
    };

    // ------------------------------------------------------------------
    // language management
    // ------------------------------------------------------------------
    /**
     * Apply the current language to every element marked with
     * `data-pt` and `data-en` attributes. (Images are skipped.)
     */
    function updatePageLanguage() {
        log('Updating language to', currentLanguage);
        // update html lang attribute for accessibility and search engines
        document.documentElement.lang = currentLanguage === 'pt' ? 'pt-BR' : 'en-US';
        const nodes = $all(S.translatable);
        nodes.forEach((el) => {
            if (el.tagName === 'IMG') return;
            const text = el.getAttribute(`data-${currentLanguage}`);
            if (text !== null) el.textContent = text;
        });
        updateFeaturesHeader();
    }

    function updateFeaturesHeader() {
        const headers = $all(S.featuresHeader);
        headers.forEach((h) => {
            h.textContent = translations[currentLanguage].recursos;
        });
    }

    function updateFlagImage() {
        const img = $(S.flagImg);
        if (!img) return;
        img.src = currentLanguage === 'en' ? 'en.png' : 'brasil.png';
    }

    function setLanguage(lang) {
        if (!translations[lang]) return;
        currentLanguage = lang;
        localStorage.setItem('language', lang);
        log('Language set to', lang);
        updateFlagImage();
        updatePageLanguage();
        toggleModal(S.languageModal, false);
    }

    function voltarHome() {
        // if currently on the project detail page, go back to the projects list
        const path = window.location.pathname.toLowerCase();
        if (path.endsWith('remindmail-info.html') || path.endsWith('projetos.html') || path.endsWith('mini-projetos.html')) {
            window.location.href = 'index.html';
        } else {
            window.location.href = 'projetos.html';
        }
    }

    function irParaProjetos() {
        window.location.href = 'projetos.html';
    }

    function bindEvents() {
    
        [$all(S.languageModal), $all(S.contactModal), $all(S.redesModal)].forEach((modals) => {
            modals.forEach((modal) => {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) modal.style.display = 'none';
                });
            });
        });

        // flag opens language modal
        const flag = $(S.flagImg);
        if (flag) {
            flag.addEventListener('click', PortfolioApp.openLanguageModal);
            flag.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    PortfolioApp.openLanguageModal();
                }
            });
            flag.style.cursor = 'pointer';
        }

        $all('.lang-btn[data-lang]').forEach((btn) => {
            btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
        });

        $all('.lang-btn[data-action="close-contact"]').forEach((btn) => {
            btn.addEventListener('click', PortfolioApp.closeContactModal);
        });
        $all('.lang-btn[data-action="close-redes"]').forEach((btn) => {
            btn.addEventListener('click', PortfolioApp.closeRedesModal);
        });
       
        $all('[data-action="voltar-home"]').forEach((btn) => {
            btn.addEventListener('click', PortfolioApp.voltarHome);
        });

        // link handlers
        const projetos = $(S.projetosLink);
        if (projetos) {
            projetos.addEventListener('click', irParaProjetos);
            projetos.style.cursor = 'pointer';
            projetos.addEventListener('mouseenter', () => (projetos.style.transform = 'scale(1.05)'));
            projetos.addEventListener('mouseleave', () => (projetos.style.transform = 'scale(1)'));
        }

        const contato = $(S.contatoLink);
        if (contato) {
            contato.addEventListener('click', () => toggleModal(S.contactModal, true));
            contato.style.cursor = 'pointer';
        }

        const redes = $(S.redesLink);
        if (redes) {
            redes.addEventListener('click', () => toggleModal(S.redesModal, true));
            redes.style.cursor = 'pointer';
        }

        $all('.btn-voltar, .projetos, .contato, .redes').forEach((btn) => {
            btn.style.transition = 'all 0.3s ease';
        });
    }

    function init() {
        log('Initializing');
        updateFlagImage();
        updatePageLanguage();
        bindEvents();
    }

    return {
        init,
        setLanguage,
        openLanguageModal: () => toggleModal(S.languageModal, true),
        closeLanguageModal: () => toggleModal(S.languageModal, false),
        openContactModal: () => toggleModal(S.contactModal, true),
        closeContactModal: () => toggleModal(S.contactModal, false),
        openRedesModal: () => toggleModal(S.redesModal, true),
        closeRedesModal: () => toggleModal(S.redesModal, false),
        voltarHome,
        irParaProjetos
    };
})();

// run on load
document.addEventListener('DOMContentLoaded', PortfolioApp.init);

// ---------------------------------------------------------
// legacy/global exports (kept for existing inline handlers)
// ---------------------------------------------------------
window.PortfolioApp = PortfolioApp;
window.changeFlagLanguage = PortfolioApp.openLanguageModal;
window.setLanguage = PortfolioApp.setLanguage;
window.voltarHome = PortfolioApp.voltarHome;
window.openContactModal = PortfolioApp.openContactModal;
window.closeContactModal = PortfolioApp.closeContactModal;
window.openRedesModal = PortfolioApp.openRedesModal;
window.closeRedesModal = PortfolioApp.closeRedesModal;
window.irParaProjetos = PortfolioApp.irParaProjetos;






// Inline index.js moved from index.html
function setTheme(theme, save = true) {
    document.documentElement.setAttribute('data-theme', theme);
    if (save) localStorage.setItem('theme', theme);
    document.querySelectorAll('.theme-dot').forEach(d => {
        d.classList.toggle('active', d.dataset.t === theme);
    });
    closeThemeModal();
}

function applyLang(lang) {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en-US';
    document.querySelectorAll('[data-pt][data-en]').forEach(el => {
        if (el.tagName === 'IMG') return;
        el.textContent = el.getAttribute(`data-${lang}`);
    });
    const flag = document.getElementById('flagImg');
    if (flag) flag.src = lang === 'pt' ? 'brasil.png' : 'en.png';
    closeLangModal();
}

function setLang(lang) {
    applyLang(lang);
}

function closeLangModal() {
    const modal = document.getElementById('langModal');
    if (modal) modal.classList.remove('show');
}

function closeThemeModal() {
    const modal = document.getElementById('themeModal');
    if (modal) modal.classList.remove('show');
}

function closenav() {
    const sidenav = document.getElementById('sidenav');
    const overlay = document.getElementById('navOverlay');
    if (sidenav) sidenav.classList.remove('open');
    if (overlay) overlay.style.display = 'none';
}

function initIndexPage() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme, false);

    document.querySelectorAll('.theme-dot').forEach(d => {
        d.addEventListener('click', () => setTheme(d.dataset.t));
    });

    const currentLang = localStorage.getItem('lang') || 'pt';
    applyLang(currentLang);

    const langBtn = document.getElementById('langBtn');
    const langModal = document.getElementById('langModal');
    if (langBtn && langModal) {
        langBtn.addEventListener('click', () => langModal.classList.add('show'));
        langModal.addEventListener('click', e => {
            if (e.target === e.currentTarget) closeLangModal();
        });
    }

    const themeBtn = document.getElementById('themeBtn');
    const themeModal = document.getElementById('themeModal');
    if (themeBtn && themeModal) {
        themeBtn.addEventListener('click', () => themeModal.classList.add('show'));
        themeModal.addEventListener('click', e => {
            if (e.target === e.currentTarget) closeThemeModal();
        });
    }

    document.querySelectorAll('.lang-opt').forEach(btn => {
        btn.addEventListener('click', () => setLang(btn.dataset.lang || 'pt'));
    });

    const sidenav = document.getElementById('sidenav');
    const overlay = document.getElementById('navOverlay');
    const hamburger = document.getElementById('hamburger');
    if (hamburger && sidenav && overlay) {
        hamburger.addEventListener('click', () => {
            sidenav.classList.toggle('open');
            overlay.style.display = sidenav.classList.contains('open') ? 'block' : 'none';
        });
        overlay.addEventListener('click', closenav);
    }

    const fill = document.getElementById('scrollFill');
    if (fill) {
        window.addEventListener('scroll', () => {
            const h = document.documentElement.scrollHeight - window.innerHeight;
            fill.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
        });
    }

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-list a');

    function updateNav() {
        let cur = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 120) cur = s.id;
        });
        navLinks.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === `#${cur}`);
        });
    }

    window.addEventListener('scroll', updateNav);
    updateNav();

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            if (window.innerWidth <= 900) closenav();
        });
    });

    navLinks.forEach(a => {
        a.addEventListener('click', () => {
            if (window.innerWidth <= 900) closenav();
        });
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.fade-up, .stagger').forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initIndexPage);
