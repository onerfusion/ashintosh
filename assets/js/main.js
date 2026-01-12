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

  /* Water-like mouse ripple (canvas) inside hero */
  (function(){
    const canvas = select('#hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = 0, height = 0;
    let particles = [];
    let mouse = { x: -9999, y: -9999 };
    const colorBase = '26,115,232'; // bluish (keep hue)

    function resize() {
      width = Math.max(300, Math.floor(window.innerWidth));
      height = Math.max(200, Math.floor(window.innerHeight));
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
      buildGrid(width, height);
    }

    function buildGrid(w, h) {
      particles = [];
      // denser grid: divisor larger -> smaller spacing
      const spacing = Math.max(10, Math.floor(Math.min(w, h) / 40));
      const cols = Math.floor(w / spacing) + 1;
      const rows = Math.floor(h / spacing) + 1;
      for (let r=0;r<rows;r++){
        for (let c=0;c<cols;c++){
          const bx = c*spacing + (spacing/2);
          const by = r*spacing + (spacing/2);
          particles.push({bx,by,x:bx,y:by,vx:0,vy:0});
        }
      }
    }

    function onMove(e){
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function onLeave(){
      mouse.x = -9999; mouse.y = -9999;
    }

    function animate(){
      ctx.clearRect(0,0,width,height);
      const radius = Math.max(80, Math.min(width, height) / 3.6);
      for (let i=0;i<particles.length;i++){
        const p = particles[i];
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist2 = dx*dx + dy*dy;
        if (mouse.x>-9998 && dist2 < radius*radius){
          const dist = Math.sqrt(dist2) || 1;
          const force = (1 - (dist / radius)) * 4.0; // stronger
          p.vx += (dx/dist) * force;
          p.vy += (dy/dist) * force;
        }

        // spring back to base
        p.vx += (p.bx - p.x) * 0.08;
        p.vy += (p.by - p.y) * 0.08;

        // damping
        p.vx *= 0.82;
        p.vy *= 0.82;

        p.x += p.vx;
        p.y += p.vy;

        // draw darker, more visible dots on hover
        const disp = Math.min(1.0, Math.hypot(p.x - p.bx, p.y - p.by) / 6);
        // increase base opacity so dots appear darker
        const alpha = 0.32 * (1 - Math.min(1, disp*1.6));
        ctx.beginPath();
        ctx.fillStyle = `rgba(${colorBase}, ${alpha})`;
        ctx.arc(p.x, p.y, 2.4 + disp*1.6, 0, Math.PI*2);
        ctx.fill();
      }
      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    // initialize
    resize();
    requestAnimationFrame(animate);
  })();

  // Defensive cleanup removed to avoid syntax error; keep original behavior

})()
