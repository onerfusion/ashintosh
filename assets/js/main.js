/**
* Template Name: Kelly - v4.7.0
* Template URL: https://bootstrapmade.com/kelly-free-bootstrap-cv-resume-html-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

  /* Antigravity / cursor parallax for hero */
  (function(){
    const panel = select('#hero-panel');
    if (!panel) return;
    const children = [...panel.querySelectorAll('[data-depth]')];
    let mouseX = 0, mouseY = 0, rafId = null;

    const onMove = (e) => {
      const rect = panel.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      mouseY = (e.clientY - rect.top) / rect.height - 0.5;
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    const update = () => {
      rafId = null;
      children.forEach(el => {
        const depth = parseFloat(el.getAttribute('data-depth')) || 0.08;
        const moveX = -mouseX * depth * 40; // multiplier for strength
        const moveY = -mouseY * depth * 30;
        el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    };

    panel.addEventListener('mousemove', onMove);
    panel.addEventListener('mouseleave', () => {
      children.forEach(el => el.style.transform = 'translate3d(0,0,0)');
    });
  })();

  /* Global bee-swarm particles following mouse with water effect */
  (function(){
    const canvas = select('#hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = 0, height = 0;
    let particles = [];
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const swarmRadius = 80; // radius of bee swarm circle
    const colorBase = '26,115,232'; // bluish

    function resize() {
      width = Math.max(300, Math.floor(window.innerWidth));
      height = Math.max(200, Math.floor(window.innerHeight));
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
      buildSwarm(width, height);
    }

    function buildSwarm(w, h) {
      particles = [];
      const particleCount = 45; // number of particles in swarm
      
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2;
        const x = mouse.x + Math.cos(angle) * swarmRadius;
        const y = mouse.y + Math.sin(angle) * swarmRadius;
        particles.push({
          x,
          y,
          vx: 0,
          vy: 0,
          angle,
          baseAngle: angle,
          hue: (i / particleCount) * 360,
          wobblePhase: Math.random() * Math.PI * 2
        });
      }
    }

    function onMove(e){
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function animate(){
      ctx.clearRect(0, 0, width, height);

      const time = Date.now() * 0.0008;

      for (let i = 0; i < particles.length; i++){
        const p = particles[i];

        // Gentle rotation around the swarm center
        p.baseAngle += 0.012;
        
        // Wobble effect for water-like motion
        const wobble = Math.sin(time + p.wobblePhase) * 20;
        const baseX = mouse.x + Math.cos(p.baseAngle) * (swarmRadius + wobble);
        const baseY = mouse.y + Math.sin(p.baseAngle) * (swarmRadius + wobble);

        // Water physics - spring back to swarm position with damping
        const dx = baseX - p.x;
        const dy = baseY - p.y;
        
        p.vx += dx * 0.15;
        p.vy += dy * 0.15;
        
        // Add swirl around cursor for water effect
        const distToMouse = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (distToMouse > 1) {
          const swirl = 0.18;
          const normX = (p.x - mouse.x) / distToMouse;
          const normY = (p.y - mouse.y) / distToMouse;
          p.vx += -normY * swirl;
          p.vy += normX * swirl;
        }

        // Random turbulence for water ripple
        p.vx += (Math.random() - 0.5) * 0.08;
        p.vy += (Math.random() - 0.5) * 0.08;

        // Damping
        p.vx *= 0.88;
        p.vy *= 0.88;

        p.x += p.vx;
        p.y += p.vy;

        // Draw particle
        const distFromBase = Math.hypot(p.x - baseX, p.y - baseY);
        const alpha = 0.7 - Math.min(0.5, distFromBase * 0.015);
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 78%, 62%, ${Math.max(0.15, alpha)})`;
        ctx.arc(p.x, p.y, 2.5 + (distFromBase * 0.08), 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('resize', resize);
    resolve();
    requestAnimationFrame(animate);
  })();

  // Defensive cleanup removed to avoid syntax error; keep original behavior

})()
