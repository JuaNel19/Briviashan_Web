/**
 * BRIVIASHAN AGROEXPORTACIONES EIRL
 * Interactive JavaScript for B2B Export Website
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Language Switcher State & Handler
  let currentLang = 'es';

  function updateLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    const t = translations[lang];

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const keyPath = el.getAttribute('data-i18n').split('.');
      let val = t;
      for (const key of keyPath) {
        if (val && val[key] !== undefined) {
          val = val[key];
        } else {
          val = null;
          break;
        }
      }
      if (val !== null) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = val;
        } else {
          el.textContent = val;
        }
      }
    });

    // Update placeholders with data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const keyPath = el.getAttribute('data-i18n-placeholder').split('.');
      let val = t;
      for (const key of keyPath) {
        if (val && val[key] !== undefined) {
          val = val[key];
        } else {
          val = null;
          break;
        }
      }
      if (val !== null) {
        el.placeholder = val;
      }
    });

    // Update Language Button Active State
    const langBtn = document.getElementById('lang-switch-btn');
    if (langBtn) {
      langBtn.innerHTML = lang === 'es' 
        ? '<span class="lang-code active">ES</span><span class="lang-divider">|</span><span class="lang-code">EN</span>' 
        : '<span class="lang-code">ES</span><span class="lang-divider">|</span><span class="lang-code active">EN</span>';
    }

    const mobileLangBtn = document.getElementById('mobile-lang-switch-btn');
    if (mobileLangBtn) {
      mobileLangBtn.innerHTML = lang === 'es' 
        ? '<span class="lang-code active">ES</span><span class="lang-divider">|</span><span class="lang-code">EN</span>' 
        : '<span class="lang-code">ES</span><span class="lang-divider">|</span><span class="lang-code active">EN</span>';
    }

    // Update active interactive point detail text in the explorer if open
    updateActiveHotspotDetail();
  }

  const langBtn = document.getElementById('lang-switch-btn');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      updateLanguage(currentLang === 'es' ? 'en' : 'es');
    });
  }

  const mobileLangBtn = document.getElementById('mobile-lang-switch-btn');
  if (mobileLangBtn) {
    mobileLangBtn.addEventListener('click', () => {
      updateLanguage(currentLang === 'es' ? 'en' : 'es');
    });
  }

  // 2. Mobile Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNavMenu = document.getElementById('mobile-nav-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileNavMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileNavMenu.classList.toggle('is-active');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
      mobileMenuBtn.innerHTML = isOpen 
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNavMenu.classList.remove('is-active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
      });
    });
  }

  // 3. Header Scroll Effect
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 4. Interactive Product Hotspots
  let activeHotspotIndex = 1;
  const hotspotButtons = document.querySelectorAll('.hotspot-pin');
  const hotspotCardTitle = document.getElementById('hotspot-active-title');
  const hotspotCardDesc = document.getElementById('hotspot-active-desc');
  const hotspotTabButtons = document.querySelectorAll('.hotspot-tab-btn');

  function setActiveHotspot(index) {
    activeHotspotIndex = index;
    
    // Update Pins
    hotspotButtons.forEach(btn => {
      if (parseInt(btn.getAttribute('data-point-index'), 10) === index) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update Tabs
    hotspotTabButtons.forEach(tab => {
      if (parseInt(tab.getAttribute('data-point-index'), 10) === index) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    updateActiveHotspotDetail();
  }

  function updateActiveHotspotDetail() {
    const t = translations[currentLang].interactiveSection;
    if (hotspotCardTitle && hotspotCardDesc) {
      hotspotCardTitle.textContent = t[`point${activeHotspotIndex}Title`];
      hotspotCardDesc.textContent = t[`point${activeHotspotIndex}Desc`];
    }
  }

  hotspotButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-point-index'), 10);
      setActiveHotspot(idx);
    });
  });

  hotspotTabButtons.forEach(tab => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.getAttribute('data-point-index'), 10);
      setActiveHotspot(idx);
    });
  });

  // 5. Connect Presentation "Solicitar información" Buttons to Form Selection
  const presentationButtons = document.querySelectorAll('.presentation-inquire-btn');
  const productSelect = document.getElementById('product-select');
  const quoteFormSection = document.getElementById('contacto');

  presentationButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const formatVal = btn.getAttribute('data-format-value');
      if (productSelect && formatVal) {
        productSelect.value = formatVal;
      }
      if (quoteFormSection) {
        quoteFormSection.scrollIntoView({ behavior: 'smooth' });
        // Highlight select briefly
        productSelect.classList.add('highlight-pulse');
        setTimeout(() => {
          productSelect.classList.remove('highlight-pulse');
        }, 1800);
      }
    });
  });

  // 6. Quotation Form Handler & Modal
  const rfqForm = document.getElementById('rfq-form');
  const successModal = document.getElementById('success-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalBackdrop = document.getElementById('modal-backdrop');

  if (rfqForm) {
    rfqForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = rfqForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      const t = translations[currentLang].formSection;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="spinner"></span> ${t.submitting}`;

      // Simulate clean asynchronous submission
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        // Show success modal
        if (successModal) {
          successModal.classList.add('is-visible');
          document.body.style.overflow = 'hidden';
        }
        
        // Reset form
        rfqForm.reset();
      }, 700);
    });
  }

  function closeModal() {
    if (successModal) {
      successModal.classList.remove('is-visible');
      document.body.style.overflow = '';
    }
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  // 7. WhatsApp Trigger with Dynamic Message
  const whatsappTriggers = document.querySelectorAll('.whatsapp-dynamic-link');
  whatsappTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const msg = currentLang === 'es'
        ? "Hola, estoy interesado en recibir información comercial y cotización de espárragos frescos peruanos de BRIVIASHAN."
        : "Hello, I am interested in receiving commercial information and a quotation for fresh Peruvian asparagus from BRIVIASHAN.";
      // Placeholder phone number standard format (configured for direct WhatsApp click)
      const phone = "51999999999"; 
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
    });
  });

  // 8. Intersection Observer for Smooth Reveal Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.12
  };

  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // 9. Gallery Image Lightbox Modal Handler
  const lightboxModal = document.getElementById('image-lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeLightboxBtn = document.getElementById('close-lightbox-btn');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');

  const expandableBoxes = document.querySelectorAll('[data-lightbox-src]');

  function openLightbox(src, title) {
    if (lightboxModal && lightboxImg) {
      lightboxImg.src = src;
      lightboxImg.alt = title || '';
      if (lightboxCaption) lightboxCaption.textContent = title || '';
      lightboxModal.classList.add('is-visible');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('is-visible');
      document.body.style.overflow = '';
    }
  }

  expandableBoxes.forEach(box => {
    box.addEventListener('click', () => {
      const src = box.getAttribute('data-lightbox-src');
      const title = box.getAttribute('data-lightbox-title');
      if (src) {
        openLightbox(src, title);
      }
    });
  });

  if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeModal();
    }
  });

  // Initialize
  updateLanguage('es');
});
