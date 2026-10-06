// ==========================================================================
// Vowelle Luxury Wedding Invitation Scripts
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. CINEMATIC INVITATION UNLOCK & PETAL BURST SYSTEM
  // ==========================================================================
  const body = document.body;
  const openBtn = document.getElementById('openInvitationBtn');
  const envelopeHotspot = document.getElementById('openEnvelopeHotspot');
  const invitationCover = document.getElementById('invitationCover');
  const envelopeCard = document.getElementById('envelopeTrayCard');
  const burstCanvas = document.getElementById('flowerBurstCanvas');
  const ambientCanvas = document.getElementById('ambientPetalsCanvas');

  let isCoverUnlocking = false;

  // ==========================================================================
  // BACKGROUND MUSIC SYSTEM (Inkem Inkem - Vowelle Audio)
  // ==========================================================================
  const bgAudio = new Audio('assets/inkem.mp3');
  bgAudio.loop = true;
  bgAudio.volume = 0.65;
  bgAudio.preload = 'auto';

  let isPlaying = false;

  const floatMusicBtn = document.getElementById('floatingMusicBtn');
  const floatMusicText = document.getElementById('floatingMusicText');
  const coverMusicBtn = document.getElementById('coverMusicBtn');
  const coverMusicLabel = document.getElementById('coverMusicLabel');

  function updateMusicUI(playing) {
    isPlaying = playing;
    if (floatMusicBtn) {
      if (playing) {
        floatMusicBtn.classList.remove('is-paused');
        floatMusicBtn.classList.add('is-playing');
        floatMusicBtn.setAttribute('aria-pressed', 'true');
        floatMusicBtn.setAttribute('title', 'Pause Wedding Music');
      } else {
        floatMusicBtn.classList.remove('is-playing');
        floatMusicBtn.classList.add('is-paused');
        floatMusicBtn.setAttribute('aria-pressed', 'false');
        floatMusicBtn.setAttribute('title', 'Play Wedding Music');
      }
    }
    if (floatMusicText) {
      floatMusicText.textContent = playing ? 'MUSIC ON' : 'MUSIC OFF';
    }
    if (coverMusicLabel) {
      coverMusicLabel.textContent = playing ? 'Playing' : 'Play Music';
    }
  }

  function playMusic() {
    bgAudio.volume = 0.65;
    const playPromise = bgAudio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          updateMusicUI(true);
        })
        .catch((e) => {
          console.log("Audio play blocked by browser policy:", e);
          updateMusicUI(false);
        });
    }
  }

  function pauseMusic() {
    bgAudio.pause();
    updateMusicUI(false);
  }

  function toggleMusic() {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  }

  if (floatMusicBtn) {
    floatMusicBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMusic();
    });
  }

  // Handle Tab / App / Minimize Switch (Page Visibility API)
  // When user switches to another tab, opens another app, minimizes browser, or page becomes hidden:
  // Automatically pause the music.
  // When user returns, do NOT automatically restart. They must tap the music toggle to resume.
  // Playback position is preserved because bgAudio.pause() retains currentTime.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (isPlaying) {
        pauseMusic();
      }
    }
  });

  // Handle mobile window pagehide if switching apps
  window.addEventListener('pagehide', () => {
    if (isPlaying) {
      pauseMusic();
    }
  });

  // --- Flower & Gold Sparkle Burst Engine ---
  let burstCtx = null;
  let burstParticles = [];
  let burstAnimId = null;

  function initBurstCanvas() {
    if (!burstCanvas) return;
    burstCanvas.width = window.innerWidth;
    burstCanvas.height = window.innerHeight;
    burstCtx = burstCanvas.getContext('2d');
  }
  initBurstCanvas();
  window.addEventListener('resize', () => {
    if (burstCanvas) {
      burstCanvas.width = window.innerWidth;
      burstCanvas.height = window.innerHeight;
    }
    if (ambientCanvas) {
      ambientCanvas.width = window.innerWidth;
      ambientCanvas.height = window.innerHeight;
    }
  });

  function createBurstParticles(originX, originY) {
    const particles = [];
    const count = window.innerWidth < 600 ? 65 : 90;

    const types = [
      {
        type: 'rose',
        color: '#F4718F',
        stroke: '#C93B5D',
        glow: 'rgba(244, 113, 143, 0.55)',
        glowBlur: 6,
        ratio: 0.32
      },
      {
        type: 'pink',
        color: '#F89CAE',
        stroke: '#D95374',
        glow: 'rgba(248, 156, 174, 0.50)',
        glowBlur: 5,
        ratio: 0.28
      },
      {
        type: 'ivory',
        color: '#FFFDF0',
        stroke: '#D4AF67',
        glow: 'rgba(255, 240, 190, 0.65)',
        glowBlur: 5,
        ratio: 0.24
      },
      {
        type: 'gold',
        color: '#FAD36E',
        stroke: '#C2902A',
        glow: 'rgba(250, 211, 110, 0.70)',
        glowBlur: 7,
        ratio: 0.16
      }
    ];

    for (let i = 0; i < count; i++) {
      const rand = Math.random();
      let selectedType = types[0];
      let accum = 0;
      for (const t of types) {
        accum += t.ratio;
        if (rand <= accum) {
          selectedType = t;
          break;
        }
      }

      const angle = Math.random() * Math.PI * 2;
      const speed = 3.5 + Math.random() * 8.5;
      const isGold = selectedType.type === 'gold';

      particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed * (0.8 + Math.random() * 0.4),
        vy: Math.sin(angle) * speed * 0.9 - (2 + Math.random() * 3.5),
        type: selectedType.type,
        color: selectedType.color,
        stroke: selectedType.stroke,
        glow: selectedType.glow,
        glowBlur: selectedType.glowBlur,
        size: isGold ? 4 + Math.random() * 4 : 8 + Math.random() * 9,
        rot: Math.random() * Math.PI * 2,
        dRot: (Math.random() - 0.5) * 0.12,
        tilt: Math.random() * Math.PI,
        dTilt: (Math.random() - 0.5) * 0.08,
        gravity: isGold ? 0.04 : 0.07 + Math.random() * 0.05,
        drag: 0.955 + Math.random() * 0.015,
        wobbleSeed: Math.random() * 100,
        opacity: 1,
        decay: 0.007 + Math.random() * 0.008
      });
    }
    return particles;
  }

  function drawBurstParticle(p, ctx) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = Math.max(0, Math.min(1, p.opacity));

    // Gentle luminous glow so petals glow against light and dark backgrounds
    if (p.glow) {
      ctx.shadowColor = p.glow;
      ctx.shadowBlur = p.glowBlur || 5;
    }

    if (p.type === 'gold') {
      const s = p.size;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.quadraticCurveTo(0, 0, s, 0);
      ctx.quadraticCurveTo(0, 0, 0, s);
      ctx.quadraticCurveTo(0, 0, -s, 0);
      ctx.quadraticCurveTo(0, 0, 0, -s);
      ctx.fill();
      if (p.stroke) {
        ctx.strokeStyle = p.stroke;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    } else {
      const tiltScale = Math.sign(Math.cos(p.tilt) || 1) * Math.max(0.22, Math.abs(Math.cos(p.tilt)));
      ctx.scale(tiltScale, 1);
      const s = p.size;
      ctx.beginPath();
      ctx.moveTo(0, -s * 1.1);
      ctx.bezierCurveTo(s * 0.75, -s * 0.4, s * 0.75, s * 0.5, 0, s * 1.1);
      ctx.bezierCurveTo(-s * 0.75, s * 0.5, -s * 0.75, -s * 0.4, 0, -s * 1.1);
      ctx.fillStyle = p.color;
      ctx.fill();

      if (p.stroke) {
        ctx.strokeStyle = p.stroke;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Elegant inner petal vein highlight
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.85);
      ctx.lineTo(0, s * 0.75);
      ctx.strokeStyle = p.stroke;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    ctx.restore();
  }

  function animateBurst(time) {
    if (!burstCtx) return;
    burstCtx.clearRect(0, 0, burstCanvas.width, burstCanvas.height);

    let activeCount = 0;
    for (let i = 0; i < burstParticles.length; i++) {
      const p = burstParticles[i];
      if (p.opacity <= 0) continue;
      activeCount++;

      p.vx *= p.drag;
      p.vy = p.vy * p.drag + p.gravity;
      p.x += p.vx + Math.sin((time / 200) + p.wobbleSeed) * 0.35;
      p.y += p.vy;
      p.rot += p.dRot;
      p.tilt += p.dTilt;
      p.opacity -= p.decay;

      drawBurstParticle(p, burstCtx);
    }

    if (activeCount > 0) {
      burstAnimId = requestAnimationFrame(animateBurst);
    } else {
      burstCtx.clearRect(0, 0, burstCanvas.width, burstCanvas.height);
      cancelAnimationFrame(burstAnimId);
    }
  }

  function triggerFlowerBurst(originX, originY) {
    if (!burstCanvas) return;
    initBurstCanvas();
    burstParticles = createBurstParticles(originX, originY);
    if (burstAnimId) cancelAnimationFrame(burstAnimId);
    burstAnimId = requestAnimationFrame(animateBurst);
  }

  // --- Ambient Petal Float System (Post-Opening) ---
  let ambientCtx = null;
  let ambientParticles = [];
  let ambientAnimId = null;

  function startAmbientPetals() {
    if (!ambientCanvas) return;
    ambientCanvas.width = window.innerWidth;
    ambientCanvas.height = window.innerHeight;
    ambientCtx = ambientCanvas.getContext('2d');
    ambientCanvas.classList.add('active');

    const count = window.innerWidth < 600 ? 14 : 22;
    ambientParticles = [];

    const types = [
      {
        type: 'rose',
        color: '#F4718F',
        stroke: '#C93B5D',
        glow: 'rgba(244, 113, 143, 0.55)',
        glowBlur: 6
      },
      {
        type: 'pink',
        color: '#F89CAE',
        stroke: '#D95374',
        glow: 'rgba(248, 156, 174, 0.50)',
        glowBlur: 5
      },
      {
        type: 'ivory',
        color: '#FFFDF0',
        stroke: '#D4AF67',
        glow: 'rgba(255, 240, 190, 0.65)',
        glowBlur: 5
      },
      {
        type: 'gold',
        color: '#FAD36E',
        stroke: '#C2902A',
        glow: 'rgba(250, 211, 110, 0.70)',
        glowBlur: 7
      }
    ];

    for (let i = 0; i < count; i++) {
      const selected = types[Math.floor(Math.random() * types.length)];
      ambientParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vy: 0.6 + Math.random() * 0.9,
        vx: (Math.random() - 0.5) * 0.4,
        size: selected.type === 'gold' ? 3 + Math.random() * 3 : 7 + Math.random() * 7,
        type: selected.type,
        color: selected.color,
        stroke: selected.stroke,
        glow: selected.glow,
        glowBlur: selected.glowBlur,
        rot: Math.random() * Math.PI * 2,
        dRot: (Math.random() - 0.5) * 0.02,
        tilt: Math.random() * Math.PI,
        dTilt: (Math.random() - 0.5) * 0.03,
        opacity: 0.82 + Math.random() * 0.18,
        wobble: Math.random() * 50
      });
    }

    function animateAmbient(time) {
      if (!ambientCtx) return;
      ambientCtx.clearRect(0, 0, ambientCanvas.width, ambientCanvas.height);

      for (let i = 0; i < ambientParticles.length; i++) {
        const p = ambientParticles[i];
        p.y += p.vy;
        p.x += p.vx + Math.sin((time / 500) + p.wobble) * 0.5;
        p.rot += p.dRot;
        p.tilt += p.dTilt;

        if (p.y > window.innerHeight + 20) {
          p.y = -20;
          p.x = Math.random() * window.innerWidth;
        }
        if (p.x < -20) p.x = window.innerWidth + 20;
        if (p.x > window.innerWidth + 20) p.x = -20;

        drawBurstParticle(p, ambientCtx);
      }

      ambientAnimId = requestAnimationFrame(animateAmbient);
    }

    if (ambientAnimId) cancelAnimationFrame(ambientAnimId);
    ambientAnimId = requestAnimationFrame(animateAmbient);
  }

  // --- Cinematic Tap-to-Open Sequence ---
  function unlockInvitation(e) {
    if (isCoverUnlocking) return;
    isCoverUnlocking = true;

    // 1. FIRST: Seal pulses with radiant gold/maroon bloom glow
    if (envelopeHotspot) {
      envelopeHotspot.classList.add('seal-burst-active');
    }

    // 2. Play ceremony music on user engagement
    playMusic();

    // 3. Flower Petal & Gold Particle Burst from Seal Center
    let originX = window.innerWidth / 2;
    let originY = window.innerHeight * 0.72;

    if (envelopeHotspot) {
      const rect = envelopeHotspot.getBoundingClientRect();
      originX = rect.left + rect.width / 2;
      originY = rect.top + rect.height / 2;
    }

    triggerFlowerBurst(originX, originY);

    // 4. THEN: Smooth Physical Stationery Lift & Dissolve
    setTimeout(() => {
      if (invitationCover) {
        invitationCover.classList.add('cover-lifting');
      }
      if (envelopeCard) {
        envelopeCard.classList.add('open');
      }
      body.classList.remove('invitation-locked');
      initAnimations();
    }, 520);

    // 5. FINALLY: Seamlessly transition to hero invitation (no manual scroll needed)
    setTimeout(() => {
      const hero = document.getElementById('hero');
      if (hero) {
        hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 850);

    // 6. Start gentle ambient petal float after opening sequence
    setTimeout(() => {
      startAmbientPetals();
    }, 2800);
  }

  if (openBtn) openBtn.addEventListener('click', unlockInvitation);
  if (envelopeHotspot) envelopeHotspot.addEventListener('click', unlockInvitation);
  if (coverMusicBtn) {
    coverMusicBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      unlockInvitation(e);
    });
  }
  if (invitationCover) {
    invitationCover.addEventListener('click', (e) => {
      if (!isCoverUnlocking && document.body.classList.contains('invitation-locked')) {
        unlockInvitation(e);
      }
    });
  }

  if (!document.body.classList.contains('invitation-locked')) {
    startAmbientPetals();
  }

  // --- Scroll Progress ---
  const progressBar = document.getElementById('scrollProgressBar');
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }
  });

  // --- Sticky Nav ---
  const topNav = document.getElementById('topNav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      topNav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
      topNav.style.padding = '0.5rem 2rem';
    } else {
      topNav.style.boxShadow = 'none';
      topNav.style.padding = '1rem 2rem';
    }
  });

  // --- Countdown Timer ---
  const targetDate = new Date("March 2, 2027 10:30:00").getTime();
  const timerDays = document.getElementById('timerDays');
  const timerHours = document.getElementById('timerHours');
  const timerMinutes = document.getElementById('timerMinutes');
  const timerSeconds = document.getElementById('timerSeconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      if (timerDays) timerDays.innerText = "00";
      if (timerHours) timerHours.innerText = "00";
      if (timerMinutes) timerMinutes.innerText = "00";
      if (timerSeconds) timerSeconds.innerText = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (timerDays) timerDays.innerText = days.toString().padStart(2, '0');
    if (timerHours) timerHours.innerText = hours.toString().padStart(2, '0');
    if (timerMinutes) timerMinutes.innerText = minutes.toString().padStart(2, '0');
    if (timerSeconds) timerSeconds.innerText = seconds.toString().padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // --- Scroll Animations (Intersection Observer) ---
  function initAnimations() {
    const reveals = document.querySelectorAll('.reveal-on-scroll, .hero-anim');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(el => {
      el.style.opacity = 0;
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.8s ease-out';
      observer.observe(el);
    });
  }

  // --- Modals (Calendar & Lightbox) ---
  const calModal = document.getElementById('calendarModal');
  const btnCal = document.getElementById('btnVenueCalendar');
  const closeCal = document.getElementById('closeModalBtn');

  if (btnCal) {
    btnCal.addEventListener('click', () => {
      calModal.classList.add('active');
    });
  }
  if (closeCal) {
    closeCal.addEventListener('click', () => {
      calModal.classList.remove('active');
    });
  }

  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === calModal) {
      calModal.classList.remove('active');
    }
  });

  // Download .ics calendar event
  const btnDownloadIcs = document.getElementById('btnDownloadIcs');
  if (btnDownloadIcs) {
    btnDownloadIcs.addEventListener('click', () => {
      const icsData = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Vowelle Creations//Wedding Invitation//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        'SUMMARY:VIJAY & RASHMIKA Wedding Celebration',
        'DESCRIPTION:Sacred Wedding Celebration of Chi. VIJAY & Chi. La. Sow. RASHMIKA. Crafted with love by Vowelle.',
        'LOCATION:Atelier des Lumières, 38 Rue Saint-Maur, 75011 Paris, France',
        'DTSTART:20270302T103000',
        'DTEND:20270302T160000',
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');
      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'vijay_weds_rashmika_wedding.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // --- Lightbox Logic ---
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeLightbox = document.getElementById('closeLightboxBtn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const fullImgSrc = item.getAttribute('data-full');
      const captionText = item.getAttribute('data-caption');

      if (lightboxImg && fullImgSrc) lightboxImg.src = fullImgSrc;
      if (lightboxCaption && captionText) lightboxCaption.innerText = captionText;

      if (lightbox) lightbox.classList.add('active');
    });
  });

  if (closeLightbox) {
    closeLightbox.addEventListener('click', () => {
      if (lightbox) lightbox.classList.remove('active');
    });
  }

  // Close lightbox when clicking outside the image
  window.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });

  // --- Mobile Menu Toggle ---
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // --- Interactive Scratch to Reveal ---
  const scratchCanvas = document.getElementById('scratchCanvas');
  const scratchContainer = document.getElementById('scratchContainer');

  if (scratchCanvas && scratchContainer) {
    const ctx = scratchCanvas.getContext('2d');
    let isDrawing = false;

    function initScratchCard() {
      // Set actual canvas size to match the CSS size
      scratchCanvas.width = scratchContainer.offsetWidth;
      scratchCanvas.height = scratchContainer.offsetHeight;

      // Draw the premium gold cover
      const gradient = ctx.createLinearGradient(0, 0, scratchCanvas.width, scratchCanvas.height);
      gradient.addColorStop(0, '#c59b27');
      gradient.addColorStop(0.5, '#e8d070');
      gradient.addColorStop(1, '#c59b27');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);

      // Add the text
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('SCRATCH', scratchCanvas.width / 2, scratchCanvas.height / 2);
    }

    // Initialize after a tiny delay so styles are fully applied
    setTimeout(initScratchCard, 100);

    function getMousePos(e) {
      const rect = scratchCanvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    }

    function scratch(e) {
      if (!isDrawing) return;
      e.preventDefault();
      const pos = getMousePos(e);

      // Act as an eraser
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 12, 0, Math.PI * 2);
      ctx.fill();
    }

    // Mouse events
    scratchCanvas.addEventListener('mousedown', (e) => { isDrawing = true; scratch(e); });
    scratchCanvas.addEventListener('mousemove', scratch);
    window.addEventListener('mouseup', () => { isDrawing = false; });

    // Touch events for mobile
    scratchCanvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); }, { passive: false });
    scratchCanvas.addEventListener('touchmove', scratch, { passive: false });
    window.addEventListener('touchend', () => { isDrawing = false; });
  }

  // --- Google Drive Full Gallery Link Handler ---
  const galleryBtn = document.getElementById('viewFullGalleryBtn') || document.querySelector('.album-drive-link');
  if (galleryBtn) {
    const driveUrl = 'https://drive.google.com/drive/folders/1hA5SQg5PVLLPLLDsAfyPMB7jZHZrqgPU';
    galleryBtn.setAttribute('href', driveUrl);
    galleryBtn.setAttribute('target', '_blank');
    galleryBtn.setAttribute('rel', 'noopener noreferrer');
  }

  // ==========================================================================
  // VOWELLE — CINEMATIC BACKGROUND COLOR JOURNEY
  // Smooth scroll-based body background interpolation
  // ==========================================================================
  (function initColorJourney() {
    // Color stops for each section (in order of appearance on page)
    // Format: [sectionId, [R, G, B]] — the background color when section center is in viewport
    const colorStops = [
      ['hero', [248, 242, 231]],  // #F8F2E7 — Warm Ivory (luxury invitation paper)
      ['invited', [250, 244, 234]],  // #FAF4EA — Soft Cream (warm envelope)
      ['couple', [247, 237, 228]],  // #F7EDE4 — Champagne Blush (romantic warmth)
      ['muhurtham', [245, 237, 222]],  // #F5EDDE — Golden Champagne (ceremonial warmth)
      ['venue', [243, 233, 219]],  // #F3E9DB — Warm Peach (sunset atmosphere)
      ['gallery', [244, 235, 227]],  // #F4EBE3 — Soft Memory (cooled peach)
      ['lunch', [243, 234, 222]],  // #F3EADE — Warm Golden (family warmth)
      ['countdown', [240, 231, 221]],  // #F0E7DD — Deep Champagne (anticipation)
      ['blessings', [238, 228, 218]],  // #EEE4DA — Warm Wine Tint (emotional depth)
      ['footer', [246, 240, 230]],  // #F6F0E6 — Return to Ivory (closing warmth)
    ];

    // Cache DOM references
    const sectionEls = [];
    for (const [id] of colorStops) {
      const el = document.getElementById(id);
      if (el) sectionEls.push({ id, el, color: colorStops.find(s => s[0] === id)[1] });
    }

    if (sectionEls.length < 2) return;

    // Linear interpolation between two RGB arrays
    function lerpColor(c1, c2, t) {
      return [
        Math.round(c1[0] + (c2[0] - c1[0]) * t),
        Math.round(c1[1] + (c2[1] - c1[1]) * t),
        Math.round(c1[2] + (c2[2] - c1[2]) * t),
      ];
    }

    let lastColorStr = '';
    let ticking = false;

    function updateBackgroundColor() {
      const viewportCenter = window.scrollY + window.innerHeight * 0.45;

      // Find which two sections the viewport center is between
      let prevSection = sectionEls[0];
      let nextSection = sectionEls[sectionEls.length - 1];

      for (let i = 0; i < sectionEls.length; i++) {
        const rect = sectionEls[i].el.getBoundingClientRect();
        const sectionCenter = window.scrollY + rect.top + rect.height * 0.5;

        if (sectionCenter >= viewportCenter) {
          nextSection = sectionEls[i];
          prevSection = sectionEls[Math.max(0, i - 1)];
          break;
        }
        // If we've passed all sections, use the last one
        if (i === sectionEls.length - 1) {
          prevSection = sectionEls[i];
          nextSection = sectionEls[i];
        }
      }

      // Calculate blend ratio between prevSection and nextSection
      let t = 0;
      if (prevSection !== nextSection) {
        const prevRect = prevSection.el.getBoundingClientRect();
        const nextRect = nextSection.el.getBoundingClientRect();
        const prevCenter = window.scrollY + prevRect.top + prevRect.height * 0.5;
        const nextCenter = window.scrollY + nextRect.top + nextRect.height * 0.5;
        const range = nextCenter - prevCenter;
        if (range > 0) {
          t = Math.max(0, Math.min(1, (viewportCenter - prevCenter) / range));
          // Apply easing for smoother perceptual transition
          t = t * t * (3 - 2 * t); // smoothstep
        }
      }

      const blended = lerpColor(prevSection.color, nextSection.color, t);
      const colorStr = `rgb(${blended[0]}, ${blended[1]}, ${blended[2]})`;

      if (colorStr !== lastColorStr) {
        document.body.style.backgroundColor = colorStr;
        lastColorStr = colorStr;
      }

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateBackgroundColor);
      }
    }

    // Only activate after the cover is opened
    function activateColorJourney() {
      window.addEventListener('scroll', onScroll, { passive: true });
      // Initial call
      updateBackgroundColor();
    }

    // Watch for cover unlock — check if body loses invitation-locked class
    const coverObserver = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'class') {
          if (!document.body.classList.contains('invitation-locked')) {
            activateColorJourney();
            coverObserver.disconnect();
          }
        }
      }
    });

    // If already unlocked, activate immediately
    if (!document.body.classList.contains('invitation-locked')) {
      activateColorJourney();
    } else {
      coverObserver.observe(document.body, { attributes: true });
    }
  })();

});

