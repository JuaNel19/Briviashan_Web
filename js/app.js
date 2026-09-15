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

  // 3. Header Scroll Effect & View Color State
  const header = document.getElementById('main-header');
  function checkHeaderScroll() {
    if (header) {
      const activeView = document.querySelector('.site-view.is-active');
      const activeViewId = activeView ? activeView.getAttribute('id') : 'view-inicio';
      
      // If not on the dark hero view-inicio, OR if scrolled down > 40px, apply white header with dark text
      if (activeViewId !== 'view-inicio' || window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }
  window.addEventListener('scroll', checkHeaderScroll, { passive: true });
  checkHeaderScroll();

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
      switchView('#contacto');
      if (productSelect) {
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
    rfqForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = rfqForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      const t = translations[currentLang].formSection;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="spinner"></span> ${t.submitting}`;

      const formAction = rfqForm.getAttribute('action');
      const accessKey = rfqForm.getAttribute('data-web3forms-key');

      if (formAction && formAction.includes('formspree.io')) {
        // Enviar vía API de Formspree
        try {
          const formData = new FormData(rfqForm);
          const response = await fetch(formAction, {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          });

          if (response.ok) {
            if (successModal) {
              successModal.classList.add('is-visible');
              document.body.style.overflow = 'hidden';
            }
            rfqForm.reset();
          } else {
            const data = await response.json();
            alert(data.error || (data.errors ? data.errors.map(err => err.message).join(', ') : "Error al enviar la solicitud a Formspree."));
          }
        } catch (err) {
          console.error("Error al enviar el formulario a Formspree:", err);
          alert("Error de conexión al enviar la cotización. Por favor intenta por WhatsApp.");
        } finally {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      } else if (accessKey) {
        // Enviar vía API de Web3Forms
        try {
          const formData = new FormData(rfqForm);
          formData.append("access_key", accessKey);
          formData.append("subject", "Nueva Cotización Internacional - BRIVIASHAN");
          formData.append("from_name", "Web BRIVIASHAN Exportaciones");

          const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
          });
          const data = await response.json();

          if (data.success) {
            if (successModal) {
              successModal.classList.add('is-visible');
              document.body.style.overflow = 'hidden';
            }
            rfqForm.reset();
          } else {
            alert(data.message || "Error al enviar la solicitud.");
          }
        } catch (err) {
          console.error("Error al enviar el formulario:", err);
          alert("Error de conexión al enviar el formulario. Por favor intente por WhatsApp.");
        } finally {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      } else {
        // Intentar envío vía script PHP nativo de cPanel (php/contact.php)
        try {
          const formData = new FormData(rfqForm);
          const response = await fetch("php/contact.php", {
            method: "POST",
            body: formData
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              if (successModal) {
                successModal.classList.add('is-visible');
                document.body.style.overflow = 'hidden';
              }
              rfqForm.reset();
            } else {
              alert(data.message || "No se pudo procesar la solicitud.");
            }
          } else {
            // Fallback para pruebas locales
            if (successModal) {
              successModal.classList.add('is-visible');
              document.body.style.overflow = 'hidden';
            }
            rfqForm.reset();
          }
        } catch (err) {
          // Fallback vista previa en navegador sin servidor PHP local
          if (successModal) {
            successModal.classList.add('is-visible');
            document.body.style.overflow = 'hidden';
          }
          rfqForm.reset();
        } finally {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }
    });
  }

  function closeModal() {
    if (successModal) {
      successModal.classList.remove('is-visible');
    }
    document.body.style.overflow = '';
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal || e.target.classList.contains('modal-backdrop')) {
        closeModal();
      }
    });
  }

  // 7. WhatsApp Trigger with Dynamic Message
  const whatsappTriggers = document.querySelectorAll('.whatsapp-dynamic-link');
  whatsappTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const msg = currentLang === 'es'
        ? "Hola, estoy interesado en recibir información comercial y cotización de espárragos frescos peruanos de BRIVIASHAN."
        : "Hello, I am interested in receiving commercial information and a quotation for fresh Peruvian asparagus from BRIVIASHAN.";
      const phone = "51926640784"; 
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

  function openLightbox(src, title, extraSrc, extraTitle) {
    if (!lightboxModal) return;

    const singleWrapper = document.getElementById('lightbox-single-wrapper');
    const multiWrapper = document.getElementById('lightbox-multi-wrapper');

    if (extraSrc && multiWrapper && singleWrapper) {
      singleWrapper.style.display = 'none';
      multiWrapper.style.display = 'flex';

      const mainLabel = currentLang === 'en' ? 'Lunchbox Pouch (Outer Box)' : 'Bolsa Lonchera (Empaque Exterior)';
      const extraLabel = extraTitle || (currentLang === 'en' ? 'Wrapped Bundle (Inner Content)' : 'Atado en Envoltura (Contenido Interno)');
      const infoText = currentLang === 'en' 
        ? '💡 Note: The wrapped bundle (Flow Pack) is packed inside the Lunchbox pouch.' 
        : '💡 Nota: El atado en envoltura (Flow Pack) va empacado en el interior de la bolsa Lonchera.';

      multiWrapper.innerHTML = `
        <div class="lightbox-multi-grid">
          <div class="lightbox-multi-item">
            <img decoding="async" src="${src}" alt="${title || ''}">
            <span class="lightbox-item-badge">${mainLabel}</span>
          </div>
          <div class="lightbox-multi-item">
            <img decoding="async" src="${extraSrc}" alt="${extraLabel}">
            <span class="lightbox-item-badge">${extraLabel}</span>
          </div>
        </div>
        <div class="lightbox-info-banner">${infoText}</div>
      `;

      if (lightboxCaption) lightboxCaption.textContent = title || '';
    } else {
      if (multiWrapper) multiWrapper.style.display = 'none';
      if (singleWrapper) singleWrapper.style.display = 'flex';

      if (lightboxImg) {
        lightboxImg.src = src;
        lightboxImg.alt = title || '';
      }
      if (lightboxCaption) lightboxCaption.textContent = title || '';
    }

    lightboxModal.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('is-visible');
    }
    document.body.style.overflow = '';
  }

  expandableBoxes.forEach(box => {
    box.addEventListener('click', () => {
      const src = box.getAttribute('data-lightbox-src');
      const title = box.getAttribute('data-lightbox-title');
      const extraSrc = box.getAttribute('data-lightbox-extra-src');
      const extraTitle = box.getAttribute('data-lightbox-extra-title');
      if (src) {
        openLightbox(src, title, extraSrc, extraTitle);
      }
    });
  });

  if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target.classList.contains('modal-backdrop')) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeModal();
    }
  });

  // 10. KPI Number Counter Animation (60fps requestAnimationFrame)
  let kpiAnimated = false;
  function triggerKpiCounters() {
    if (kpiAnimated) return;
    kpiAnimated = true;
    document.querySelectorAll('.kpi-number[data-target]').forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const startTime = performance.now();
      const duration = 1200;

      function updateCounter(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * target);
        counter.textContent = current + '+';
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + '+';
        }
      }
      requestAnimationFrame(updateCounter);
    });
  }

  const kpiGrid = document.querySelector('.about-kpi-grid');
  if (kpiGrid) {
    const kpiObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          triggerKpiCounters();
        }
      });
    }, { threshold: 0.3 });

    kpiObserver.observe(kpiGrid);
  }

  // 11. Multi-View SPA System (View Switching & Hash Routing)
  const views = document.querySelectorAll('.site-view');

  function switchView(targetId) {
    if (!targetId || targetId === '#' || targetId === '') targetId = '#inicio';
    
    // Normalize target ID mapping
    let viewId = targetId.startsWith('#view-') ? targetId : '#view-' + targetId.replace('#', '');
    let targetView = document.querySelector(viewId);

    // If targetView doesn't exist directly, map known section hashes
    if (!targetView) {
      const sectionToView = {
        '#explorador': '#view-producto',
        '#producto': '#view-producto',
        '#proceso': '#view-proceso',
        '#calidad': '#view-calidad',
        '#nosotros': '#view-nosotros',
        '#contacto': '#view-contacto',
        '#inicio': '#view-inicio'
      };
      const mappedId = sectionToView[targetId];
      if (mappedId) {
        targetView = document.querySelector(mappedId);
        viewId = mappedId;
      } else {
        targetView = document.querySelector('#view-inicio');
        viewId = '#view-inicio';
      }
    }

    // Hide all views and show active view
    views.forEach(v => {
      v.classList.remove('is-active');
    });
    targetView.classList.add('is-active');

    // Update active state in nav links
    const currentNavHash = targetId.replace('#view-', '#');
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      const linkHash = link.getAttribute('href');
      if (linkHash === currentNavHash || (currentNavHash === '#inicio' && linkHash === '#inicio')) {
        link.classList.add('active-view');
      } else {
        link.classList.remove('active-view');
      }
    });

    // Instant scroll to top (prevents smooth scroll thread lag during view switches)
    window.scrollTo(0, 0);

    // Instantly reveal items inside the active view
    targetView.querySelectorAll('.reveal-on-scroll').forEach(el => {
      el.classList.add('revealed');
    });

    // Update header background and text colors based on view type
    checkHeaderScroll();

    // Trigger KPI counters if opening Nosotros
    if (viewId === '#view-nosotros') {
      setTimeout(triggerKpiCounters, 200);
    }
  }

  // Handle clicks on all links with href starting with '#'
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (anchor) {
      const href = anchor.getAttribute('href');
      if (href && href !== '#') {
        e.preventDefault();
        
        // Update URL hash without browser jump
        if (history.pushState) {
          history.pushState(null, null, href);
        } else {
          window.location.hash = href;
        }

        switchView(href);

        // Close mobile nav drawer if open
        const mobileNavMenu = document.getElementById('mobile-nav-menu');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        if (mobileNavMenu && mobileNavMenu.classList.contains('is-active')) {
          mobileNavMenu.classList.remove('is-active');
          if (mobileMenuBtn) {
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
          }
        }
      }
    }
  });

  // 11. Interactive Client Logo Slideshow Controller
  function initClientSlideshow() {
    const slideTrack = document.getElementById('clientsSlideTrack');
    const slides = document.querySelectorAll('.client-slide-card');
    const prevBtn = document.getElementById('clientsPrevBtn');
    const nextBtn = document.getElementById('clientsNextBtn');
    const dots = document.querySelectorAll('#clientsPagination .slideshow-dot');
    let currentClientSlide = 0;
    let clientAutoplayTimer = null;

    if (!slideTrack || slides.length === 0) return;

    function updateClientSlideshow(index) {
      currentClientSlide = (index + slides.length) % slides.length;
      slideTrack.style.transform = `translateX(-${currentClientSlide * 100}%)`;
      
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentClientSlide);
      });
    }

    function startClientAutoplay() {
      stopClientAutoplay();
      clientAutoplayTimer = setInterval(() => {
        updateClientSlideshow(currentClientSlide + 1);
      }, 4000);
    }

    function stopClientAutoplay() {
      if (clientAutoplayTimer) {
        clearInterval(clientAutoplayTimer);
        clientAutoplayTimer = null;
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        updateClientSlideshow(currentClientSlide - 1);
        startClientAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        updateClientSlideshow(currentClientSlide + 1);
        startClientAutoplay();
      });
    }

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const slideIdx = parseInt(dot.getAttribute('data-slide'), 10);
        updateClientSlideshow(slideIdx);
        startClientAutoplay();
      });
    });

    const slideshowContainer = document.getElementById('clientsSlideshow');
    if (slideshowContainer) {
      slideshowContainer.addEventListener('mouseenter', stopClientAutoplay);
      slideshowContainer.addEventListener('mouseleave', startClientAutoplay);
    }

    updateClientSlideshow(0);
    startClientAutoplay();
  }

  // 12. Interactive Product Presentations 3D Carousel Controller
  function initProductCarousel() {
    const carouselTrack = document.getElementById('prodCarouselTrack');
    const items = document.querySelectorAll('.prod-card-item');
    const prevBtn = document.getElementById('prodCarouselPrev');
    const nextBtn = document.getElementById('prodCarouselNext');
    const dots = document.querySelectorAll('#prodCarouselDots .prod-dot');
    let currentIndex = 0;
    let autoplayTimer = null;

    if (!carouselTrack || items.length === 0) return;

    function getItemsPerPage() {
      const w = window.innerWidth;
      if (w <= 640) return 1;
      if (w <= 1024) return 2;
      return 3;
    }

    function updateCarousel(index) {
      const itemsPerPage = getItemsPerPage();
      currentIndex = (index + items.length) % items.length;

      // Translate track
      const itemWidthPercent = 100 / itemsPerPage;
      carouselTrack.style.transform = `translateX(-${currentIndex * itemWidthPercent}%)`;

      // Update Center Highlight Class
      items.forEach((item, idx) => {
        item.classList.remove('is-center');
        if (itemsPerPage === 3) {
          // Center item in a 3-item view is currentIndex + 1
          if (idx === (currentIndex + 1) % items.length) {
            item.classList.add('is-center');
          }
        } else if (itemsPerPage === 2) {
          if (idx === currentIndex) {
            item.classList.add('is-center');
          }
        } else {
          // 1 item (mobile)
          if (idx === currentIndex) {
            item.classList.add('is-center');
          }
        }
      });

      // Update Dots
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(() => {
        updateCarousel(currentIndex + 1);
      }, 5000);
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        updateCarousel(currentIndex - 1);
        startAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        updateCarousel(currentIndex + 1);
        startAutoplay();
      });
    }

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.getAttribute('data-index'), 10);
        updateCarousel(idx);
        startAutoplay();
      });
    });

    const wrapper = document.getElementById('productCarousel');
    if (wrapper) {
      wrapper.addEventListener('mouseenter', stopAutoplay);
      wrapper.addEventListener('mouseleave', startAutoplay);
    }

    window.addEventListener('resize', () => {
      updateCarousel(currentIndex);
    });

    updateCarousel(0);
    startAutoplay();
  }

  // 13. Product Details Modal ("Ver detalles") Logic
  function initProductDetailsModal() {
    const detailModal = document.getElementById('product-detail-modal');
    const closeBtn = document.getElementById('close-prod-detail-btn');
    const backdrop = document.getElementById('prod-modal-backdrop');
    const viewButtons = document.querySelectorAll('.prod-view-details-btn');

    if (!detailModal) return;

    function openModal(data) {
      document.getElementById('prod-modal-title').textContent = data.title || '';
      document.getElementById('prod-modal-img').src = data.img || '';
      document.getElementById('prod-modal-img').alt = data.title || '';
      document.getElementById('prod-modal-desc').textContent = data.desc || '';
      document.getElementById('prod-modal-weight').textContent = data.weight || '';
      document.getElementById('prod-modal-caliber').textContent = data.caliber || '';
      document.getElementById('prod-modal-packing').textContent = data.packing || '';

      detailModal.classList.add('is-visible');
      detailModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      detailModal.classList.remove('is-visible');
      detailModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    viewButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const data = {
          title: btn.getAttribute('data-title'),
          img: btn.getAttribute('data-img'),
          desc: btn.getAttribute('data-desc'),
          weight: btn.getAttribute('data-weight'),
          caliber: btn.getAttribute('data-caliber'),
          packing: btn.getAttribute('data-packing')
        };
        openModal(data);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && detailModal.classList.contains('is-visible')) {
        closeModal();
      }
    });
  }

  // Technical Specifications Gallery (Thumbnail switcher & Next/Prev navigation)
  function initTechSpecGallery() {
    const mainImg = document.getElementById('techSpecMainImg');
    const thumbRow = document.getElementById('techSpecThumbRow');
    const prevBtn = document.getElementById('techSpecPrevBtn');
    const nextBtn = document.getElementById('techSpecNextBtn');

    if (!mainImg || !thumbRow) return;

    const thumbs = Array.from(thumbRow.querySelectorAll('.tech-spec-thumb'));
    let currentIndex = 0;

    function setImage(index) {
      if (index < 0) index = thumbs.length - 1;
      if (index >= thumbs.length) index = 0;
      currentIndex = index;

      const targetSrc = thumbs[currentIndex].getAttribute('data-src');
      mainImg.style.opacity = '0.3';
      setTimeout(() => {
        mainImg.src = targetSrc;
        mainImg.style.opacity = '1';
      }, 150);

      thumbs.forEach((t, i) => {
        if (i === currentIndex) {
          t.classList.add('active');
          t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
          t.classList.remove('active');
        }
      });
    }

    thumbs.forEach((thumb, idx) => {
      thumb.addEventListener('click', () => {
        setImage(idx);
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        setImage(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        setImage(currentIndex + 1);
      });
    }
  }

  // Initialize
  updateLanguage('es');
  initClientSlideshow();
  initProductCarousel();
  initProductDetailsModal();
  initTechSpecGallery();
  const initialHash = window.location.hash || '#inicio';
  switchView(initialHash);
});
