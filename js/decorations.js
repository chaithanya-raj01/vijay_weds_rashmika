// ==========================================================================
// VOWELLE DECORATIVE OBJECT & COMPOSITION SYSTEM (STEP 03)
// --------------------------------------------------------------------------
// Architecture:
// LEVEL 1 — OBJECTS:
//   Elephant, BananaLeaf, MangoLeaf, Jasmine, Lotus, Diya, TempleBell,
//   Kalash, Muggu, Temple, FloralBranch, OrnamentalLine, Ganesha, Peacock, Sparkle
//
// LEVEL 2 — COMPOSITIONS:
//   ElephantPair, JasmineCorner, RoyalArch, ToranHeader, FloralFrame,
//   MandapScene, TempleHeader, InvitationFrame, VenueOrnament, ClosingOrnament, GoldDivider
//
// Features:
//   - Size presets ('sm', 'md', 'lg', 'xl') and custom dimension overrides
//   - Theme variants ('antique-gold', 'ceremonial-maroon', 'soft-botanical', 'duotone')
//   - Animation styles ('none', 'gentle-breeze', 'subtle-pulse', 'shimmer', 'sway')
//   - Responsive controls ('scale-mobile', 'hide-mobile', 'hide-desktop')
//   - Subtle luxury stationery opacities (never competing with couple names)
// ==========================================================================

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VowelleDecorations = factory();
    // Maintain backward-compatible namespace for existing calls
    root.Decorations = root.VowelleDecorations;
  }
}(typeof self !== 'undefined' ? self : this, function () {

  // ------------------------------------------------------------------------
  // THEME COLOR TOKENS
  // ------------------------------------------------------------------------
  const THEMES = {
    'antique-gold': {
      primary: '#B89758',
      secondary: '#D4BD86',
      dark: '#8F7138',
      fillSubtle: 'rgba(184, 151, 88, 0.08)',
      strokeSubtle: 'rgba(184, 151, 88, 0.35)'
    },
    'ceremonial-maroon': {
      primary: '#5B141B',
      secondary: '#781E26',
      dark: '#420D12',
      fillSubtle: 'rgba(91, 20, 27, 0.06)',
      strokeSubtle: 'rgba(91, 20, 27, 0.35)'
    },
    'soft-botanical': {
      primary: '#3A6342',
      secondary: '#5A8563',
      dark: '#26442C',
      accent: '#B89758',
      fillSubtle: 'rgba(58, 99, 66, 0.08)'
    },
    'duotone': {
      primary: '#B89758',
      secondary: '#5B141B',
      accent: '#D4BD86',
      dark: '#420D12'
    }
  };

  // ------------------------------------------------------------------------
  // LEVEL 1: OBJECT RAW VECTOR BLUEPRINTS
  // ------------------------------------------------------------------------
  const OBJECT_VECTORS = {
    // 1. Elephant (Caparisoned Royal Gaja with ornate blanket)
    Elephant: (t) => `
      <svg viewBox="0 0 140 110" class="vowelle-svg" xmlns="http://www.w3.org/2000/svg">
        <path d="M30,85 L30,55 C30,35 55,20 85,25 C105,30 115,45 118,60 C120,68 126,80 130,85 C124,85 120,75 116,65 L116,85 L102,85 L102,68 L65,68 L65,85 L50,85 L50,68 L42,68 L42,85 Z" fill="${t.secondary || t.primary}" stroke="${t.primary}" stroke-width="1.5" opacity="0.95"/>
        <path d="M115,64 Q125,66 126,58" stroke="#FFFFFF" stroke-width="2.2" fill="none" stroke-linecap="round"/>
        <path d="M55,36 Q80,32 98,38 L98,62 Q78,68 55,62 Z" fill="${t.accent || t.primary}" stroke="${t.primary}" stroke-width="1"/>
        <circle cx="76" cy="48" r="4" fill="${t.dark || t.secondary}"/>
        <circle cx="106" cy="42" r="2" fill="${t.primary}"/>
        <path d="M100,28 Q108,24 112,32" fill="none" stroke="${t.primary}" stroke-width="1.5"/>
      </svg>
    `,

    // 2. BananaLeaf (Auspicious ceremonial plantain leaf)
    BananaLeaf: (t) => `
      <svg viewBox="0 0 120 160" class="vowelle-svg" xmlns="http://www.w3.org/2000/svg">
        <path d="M60,150 C50,110 20,80 15,30 C35,20 60,10 60,5 C60,10 85,20 105,30 C100,80 70,110 60,150 Z" fill="${t.primary}" stroke="${t.accent || '#B89758'}" stroke-width="1.2" opacity="0.9"/>
        <path d="M60,5 L60,150" stroke="${t.accent || '#D4BD86'}" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M60,35 Q40,30 25,25 M60,60 Q40,55 20,48 M60,85 Q40,80 25,70 M60,110 Q45,105 35,95" stroke="${t.accent || '#D4BD86'}" stroke-width="1" fill="none" opacity="0.75"/>
        <path d="M60,35 Q80,30 95,25 M60,60 Q80,55 100,48 M60,85 Q80,80 95,70 M60,110 Q75,105 85,95" stroke="${t.accent || '#D4BD86'}" stroke-width="1" fill="none" opacity="0.75"/>
      </svg>
    `,

    // 3. MangoLeaf (Maavilai auspicious foliage)
    MangoLeaf: (t) => `
      <svg viewBox="0 0 60 90" class="vowelle-svg" xmlns="http://www.w3.org/2000/svg">
        <path d="M30,5 C20,25 18,55 30,85 C42,55 40,25 30,5 Z" fill="${t.primary}" stroke="${t.accent || '#B89758'}" stroke-width="1.2" opacity="0.92"/>
        <line x1="30" y1="5" x2="30" y2="85" stroke="${t.accent || '#D4BD86'}" stroke-width="1.4"/>
        <path d="M30,25 Q18,35 12,45 M30,45 Q18,55 14,65" stroke="${t.accent || '#D4BD86'}" stroke-width="0.8" fill="none" opacity="0.7"/>
        <path d="M30,25 Q42,35 48,45 M30,45 Q42,55 46,65" stroke="${t.accent || '#D4BD86'}" stroke-width="0.8" fill="none" opacity="0.7"/>
      </svg>
    `,

    // 4. Jasmine (Botanical mallipoo blossom with petals)
    Jasmine: (t) => `
      <svg viewBox="0 0 60 60" class="vowelle-svg" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(30, 30)">
          <ellipse cx="0" cy="-14" rx="6" ry="11" fill="#FFFFFF" stroke="${t.primary}" stroke-width="0.8"/>
          <ellipse cx="14" cy="0" rx="11" ry="6" fill="#FFFFFF" stroke="${t.primary}" stroke-width="0.8"/>
          <ellipse cx="0" cy="14" rx="6" ry="11" fill="#FFFFFF" stroke="${t.primary}" stroke-width="0.8"/>
          <ellipse cx="-14" cy="0" rx="11" ry="6" fill="#FFFFFF" stroke="${t.primary}" stroke-width="0.8"/>
          <ellipse cx="10" cy="-10" rx="6" ry="10" transform="rotate(45)" fill="#FFFDF5" stroke="${t.primary}" stroke-width="0.6"/>
          <ellipse cx="-10" cy="10" rx="6" ry="10" transform="rotate(45)" fill="#FFFDF5" stroke="${t.primary}" stroke-width="0.6"/>
          <circle cx="0" cy="0" r="4.5" fill="${t.secondary || t.primary}"/>
        </g>
      </svg>
    `,

    // 5. Lotus (Sacred Padma in antique gold & ceremonial rose/maroon)
    Lotus: (t) => `
      <svg viewBox="0 0 100 80" class="vowelle-svg" xmlns="http://www.w3.org/2000/svg">
        <path d="M20,65 Q50,75 80,65 Q50,60 20,65 Z" fill="${t.dark || t.secondary}" stroke="${t.primary}" stroke-width="0.8"/>
        <path d="M12,50 C25,35 40,48 45,60 C30,62 18,58 12,50 Z" fill="${t.secondary || t.primary}" stroke="${t.primary}" stroke-width="0.8"/>
        <path d="M88,50 C75,35 60,48 55,60 C70,62 82,58 88,50 Z" fill="${t.secondary || t.primary}" stroke="${t.primary}" stroke-width="0.8"/>
        <path d="M25,40 C35,22 52,35 50,58 C38,58 28,52 25,40 Z" fill="${t.primary}" stroke="${t.accent || t.primary}" stroke-width="0.8"/>
        <path d="M75,40 C65,22 48,35 50,58 C62,58 72,52 75,40 Z" fill="${t.primary}" stroke="${t.accent || t.primary}" stroke-width="0.8"/>
        <path d="M50,15 C40,32 42,55 50,62 C58,55 60,32 50,15 Z" fill="${t.accent || t.primary}" stroke="${t.dark || t.primary}" stroke-width="1"/>
        <circle cx="50" cy="40" r="2.8" fill="${t.primary}"/>
      </svg>
    `,

    // 6. Diya (Auspicious brass oil deepam with radiant flame)
    Diya: (t) => `
      <svg viewBox="0 0 100 90" class="vowelle-svg" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="32" r="26" fill="rgba(184, 151, 88, 0.15)"/>
        <!-- Radiant Flame -->
        <path d="M50,8 C42,24 44,38 50,44 C56,38 58,24 50,8 Z" fill="#D4BD86" stroke="${t.primary}" stroke-width="0.8"/>
        <path d="M50,18 C46,28 47,36 50,40 C53,36 54,28 50,18 Z" fill="#FFFFFF"/>
        <!-- Brass Oil Lamp Bowl -->
        <path d="M15,50 C25,74 75,74 85,50 C75,58 25,58 15,50 Z" fill="${t.primary}" stroke="${t.dark || t.primary}" stroke-width="1.2"/>
        <ellipse cx="50" cy="50" rx="35" ry="7" fill="${t.secondary || t.primary}" stroke="${t.primary}" stroke-width="1"/>
        <path d="M42,68 L36,80 L64,80 L58,68 Z" fill="${t.primary}" stroke="${t.dark || t.primary}" stroke-width="1"/>
      </svg>
    `,

    // 7. TempleBell (Sacred Ghanta with chain)
    TempleBell: (t) => `
      <svg viewBox="0 0 80 120" class="vowelle-svg" xmlns="http://www.w3.org/2000/svg">
        <line x1="40" y1="0" x2="40" y2="25" stroke="${t.primary}" stroke-width="2.5" stroke-dasharray="2,3"/>
        <circle cx="40" cy="28" r="4" fill="${t.primary}"/>
        <path d="M40,32 C28,45 20,70 15,85 L65,85 C60,70 52,45 40,32 Z" fill="${t.primary}" stroke="${t.dark || t.primary}" stroke-width="1.2"/>
        <ellipse cx="40" cy="85" rx="26" ry="6" fill="${t.secondary || t.primary}" stroke="${t.primary}" stroke-width="1.2"/>
        <circle cx="40" cy="94" r="4.5" fill="${t.dark || t.secondary}"/>
        <line x1="40" y1="98" x2="40" y2="108" stroke="${t.primary}" stroke-width="1.8"/>
        <circle cx="40" cy="111" r="2.5" fill="${t.primary}"/>
      </svg>
    `,

    // 8. Kalash (Purna Kumbha with mango leaves & coconut)
    Kalash: (t) => `
      <svg viewBox="0 0 100 120" class="vowelle-svg" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="40" r="18" fill="${t.secondary || '#5B141B'}" stroke="${t.primary}" stroke-width="1.2"/>
        <path d="M50,22 L50,14 M44,24 L40,17 M56,24 L60,17" stroke="${t.accent || '#3A6342'}" stroke-width="2" stroke-linecap="round"/>
        <path d="M25,48 Q35,28 50,38 Q65,28 75,48 Z" fill="${t.accent || '#3A6342'}" stroke="${t.primary}" stroke-width="1"/>
        <path d="M35,52 L65,52 L72,62 C80,78 78,98 50,102 C22,98 20,78 28,62 Z" fill="${t.primary}" stroke="${t.dark || t.primary}" stroke-width="1.5"/>
        <circle cx="50" cy="78" r="7" fill="${t.dark || t.secondary}"/>
        <circle cx="50" cy="78" r="3" fill="#FFFFFF"/>
        <rect x="33" y="50" width="34" height="5" rx="2" fill="${t.secondary || t.primary}"/>
      </svg>
    `,

    // 9. Muggu (Traditional Telugu Kolam sacred knot)
    Muggu: (t) => `
      <svg viewBox="0 0 100 100" class="vowelle-svg" xmlns="http://www.w3.org/2000/svg">
        <g stroke="${t.primary}" stroke-width="1.6" fill="none">
          <path d="M10,10 L90,10 L90,20 L20,20 L20,90 L10,90 Z" stroke-width="1.2"/>
          <path d="M25,25 Q50,5 75,25 Q95,50 75,75 Q50,95 25,75 Q5,50 25,25 Z"/>
          <path d="M40,40 Q50,30 60,40 Q70,50 60,60 Q50,70 40,60 Q30,50 40,40 Z"/>
        </g>
        <circle cx="50" cy="50" r="3" fill="${t.secondary || t.primary}"/>
        <circle cx="30" cy="30" r="2" fill="${t.primary}"/>
        <circle cx="70" cy="30" r="2" fill="${t.primary}"/>
        <circle cx="70" cy="70" r="2" fill="${t.primary}"/>
        <circle cx="30" cy="70" r="2" fill="${t.primary}"/>
      </svg>
    `,

    // 10. Temple (Dravidian Shikhara & Gopuram Silhouette)
    Temple: (t) => `
      <svg viewBox="0 0 120 120" class="vowelle-svg" xmlns="http://www.w3.org/2000/svg">
        <line x1="60" y1="8" x2="60" y2="18" stroke="${t.primary}" stroke-width="2"/>
        <circle cx="60" cy="8" r="2.5" fill="${t.primary}"/>
        <path d="M52,18 L68,18 L72,28 L48,28 Z" fill="${t.fillSubtle || '#FFF'}" stroke="${t.primary}" stroke-width="1.2"/>
        <path d="M44,28 L76,28 L82,42 L38,42 Z" fill="${t.fillSubtle || '#FFF'}" stroke="${t.primary}" stroke-width="1.2"/>
        <path d="M34,42 L86,42 L92,60 L28,60 Z" fill="${t.fillSubtle || '#FFF'}" stroke="${t.primary}" stroke-width="1.2"/>
        <path d="M24,60 L96,60 L102,82 L18,82 Z" fill="${t.fillSubtle || '#FFF'}" stroke="${t.primary}" stroke-width="1.2"/>
        <rect x="18" y="82" width="84" height="28" fill="${t.fillSubtle || '#FFF'}" stroke="${t.primary}" stroke-width="1.5"/>
        <path d="M48,110 L48,94 C48,88 72,88 72,94 L72,110 Z" fill="${t.secondary || t.primary}" stroke="${t.primary}" stroke-width="1"/>
      </svg>
    `,

    // 11. FloralBranch (Botanical sprig with leaves and blossoms)
    FloralBranch: (t) => `
      <svg viewBox="0 0 140 70" class="vowelle-svg" xmlns="http://www.w3.org/2000/svg">
        <path d="M10,40 Q40,15 80,45 T135,35" fill="none" stroke="${t.primary}" stroke-width="2" stroke-linecap="round"/>
        <path d="M35,30 Q45,15 55,25 Q45,35 35,30 Z" fill="${t.accent || t.primary}" opacity="0.8"/>
        <path d="M85,38 Q95,20 105,32 Q95,44 85,38 Z" fill="${t.accent || t.primary}" opacity="0.8"/>
        <circle cx="65" cy="30" r="5" fill="#FFFFFF" stroke="${t.primary}" stroke-width="1"/>
        <circle cx="65" cy="30" r="2" fill="${t.secondary || t.primary}"/>
        <circle cx="115" cy="36" r="5" fill="#FFFFFF" stroke="${t.primary}" stroke-width="1"/>
        <circle cx="115" cy="36" r="2" fill="${t.secondary || t.primary}"/>
      </svg>
    `,

    // 12. OrnamentalLine (Delicate antique gold filigree hairline with diamond/flourish)
    OrnamentalLine: (t) => `
      <svg viewBox="0 0 200 24" class="vowelle-svg" xmlns="http://www.w3.org/2000/svg">
        <line x1="5" y1="12" x2="85" y2="12" stroke="${t.primary}" stroke-width="1" stroke-linecap="round"/>
        <line x1="115" y1="12" x2="195" y2="12" stroke="${t.primary}" stroke-width="1" stroke-linecap="round"/>
        <polygon points="100,5 107,12 100,19 93,12" fill="${t.primary}"/>
        <circle cx="100" cy="12" r="2" fill="#FFFFFF"/>
        <circle cx="89" cy="12" r="1.5" fill="${t.primary}"/>
        <circle cx="111" cy="12" r="1.5" fill="${t.primary}"/>
      </svg>
    `,

    // 13. Ganesha (Sacred Ganapathi line crest)
    Ganesha: (t) => `
      <svg viewBox="0 0 100 100" class="vowelle-svg" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="none" stroke="${t.primary}" stroke-width="1" stroke-dasharray="3,2"/>
        <path d="M40,28 L50,15 L60,28 Z" fill="${t.secondary || t.primary}"/>
        <path d="M40,32 C25,32 22,50 35,56" fill="none" stroke="${t.primary}" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M60,32 C75,32 78,50 65,56" fill="none" stroke="${t.primary}" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M48,32 C55,40 55,56 44,66 C38,72 39,80 50,80 C56,80 61,74 61,68" fill="none" stroke="${t.secondary || t.primary}" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="50" cy="40" r="2" fill="${t.primary}"/>
      </svg>
    `,

    // 14. Peacock (Mayura Royal Crest)
    Peacock: (t) => `
      <svg viewBox="0 0 100 100" class="vowelle-svg" xmlns="http://www.w3.org/2000/svg">
        <g stroke="${t.primary}" stroke-width="1" opacity="0.85" fill="none">
          <path d="M40,65 Q18,35 15,18"/>
          <path d="M40,65 Q28,26 32,10"/>
          <path d="M40,65 Q45,22 52,8"/>
          <path d="M40,65 Q62,26 74,12"/>
          <path d="M40,65 Q74,40 88,26"/>
        </g>
        <circle cx="15" cy="18" r="3.5" fill="${t.primary}"/>
        <circle cx="32" cy="10" r="3.5" fill="${t.primary}"/>
        <circle cx="52" cy="8" r="3.5" fill="${t.primary}"/>
        <circle cx="74" cy="12" r="3.5" fill="${t.primary}"/>
        <circle cx="88" cy="26" r="3.5" fill="${t.primary}"/>
        <path d="M40,75 C30,62 38,45 52,40 C58,38 64,30 62,24 C60,22 56,24 54,26" fill="none" stroke="${t.secondary || t.primary}" stroke-width="4.5" stroke-linecap="round"/>
        <circle cx="62" cy="23" r="2.5" fill="${t.primary}"/>
      </svg>
    `,

    // 15. Sparkle (Starlight celebratory shimmer)
    Sparkle: (t) => `
      <svg viewBox="0 0 60 60" class="vowelle-svg" xmlns="http://www.w3.org/2000/svg">
        <path d="M30,5 Q30,25 55,30 Q30,35 30,55 Q30,35 5,30 Q30,25 30,5 Z" fill="${t.primary}" opacity="0.95"/>
        <circle cx="30" cy="30" r="2.5" fill="#FFFFFF"/>
        <circle cx="14" cy="14" r="1.5" fill="${t.primary}"/>
        <circle cx="46" cy="46" r="1.5" fill="${t.primary}"/>
      </svg>
    `
  };

  // Aliases for compatibility
  OBJECT_VECTORS.BananaLeaves = OBJECT_VECTORS.BananaLeaf;
  OBJECT_VECTORS.MangoLeaves = OBJECT_VECTORS.MangoLeaf;
  OBJECT_VECTORS.FloralCorner = OBJECT_VECTORS.FloralBranch;
  OBJECT_VECTORS.GoldSparkles = OBJECT_VECTORS.Sparkle;
  OBJECT_VECTORS.GoldFiligree = OBJECT_VECTORS.OrnamentalLine;
  OBJECT_VECTORS.MugguCorner = OBJECT_VECTORS.Muggu;
  OBJECT_VECTORS.TempleSketch = OBJECT_VECTORS.Temple;
  OBJECT_VECTORS.PalaceIllustration = OBJECT_VECTORS.Temple;

  // Size Presets
  const SIZES = {
    sm: { width: 36, height: 36 },
    md: { width: 64, height: 64 },
    lg: { width: 96, height: 96 },
    xl: { width: 130, height: 130 }
  };

  // ------------------------------------------------------------------------
  // LEVEL 1 CREATOR FUNCTION: createObject
  // ------------------------------------------------------------------------
  /**
   * Generates a Level 1 Decorative Object DOM node.
   * @param {string} name - Name of the object (e.g. 'Elephant', 'Diya', 'Lotus')
   * @param {Object} options - Custom options (size, opacity, theme, rotation, animation, responsive)
   * @returns {HTMLElement}
   */
  function createObject(name, options = {}) {
    const generator = OBJECT_VECTORS[name];
    if (!generator) {
      console.warn(`[VowelleDecorations] Unknown object name: "${name}"`);
      return document.createElement('span');
    }

    const themeName = options.theme || 'antique-gold';
    const themeColors = THEMES[themeName] || THEMES['antique-gold'];

    const wrapper = document.createElement('div');
    wrapper.className = `vowelle-dec-object obj-${name.toLowerCase()} ${options.className || ''}`;

    // Size handling
    let w, h;
    if (typeof options.size === 'string' && SIZES[options.size]) {
      w = SIZES[options.size].width;
      h = SIZES[options.size].height;
    } else if (typeof options.size === 'number') {
      w = options.size;
      h = options.size;
    } else if (typeof options.size === 'object') {
      w = options.size.width;
      h = options.size.height;
    }

    if (w) wrapper.style.width = typeof w === 'number' ? `${w}px` : w;
    if (h) wrapper.style.height = typeof h === 'number' ? `${h}px` : h;

    // Opacity
    wrapper.style.opacity = options.opacity !== undefined ? options.opacity : '0.85';

    // Transformations
    const transforms = [];
    if (options.rotation) transforms.push(`rotate(${options.rotation}deg)`);
    if (options.flipH) transforms.push('scaleX(-1)');
    if (options.flipV) transforms.push('scaleY(-1)');
    if (options.scale) transforms.push(`scale(${options.scale})`);
    if (options.transform) transforms.push(options.transform);
    if (transforms.length > 0) wrapper.style.transform = transforms.join(' ');

    // Animation
    if (options.animation) {
      wrapper.classList.add(`vowelle-anim-${options.animation}`);
    }

    // Responsive rules
    if (options.hideMobile) wrapper.classList.add('vowelle-hide-mobile');
    if (options.hideDesktop) wrapper.classList.add('vowelle-hide-desktop');
    if (options.scaleMobile !== false) wrapper.classList.add('vowelle-scale-mobile');

    // Inline positioning if specified
    if (options.position) wrapper.style.position = options.position;
    if (options.top !== undefined) wrapper.style.top = options.top;
    if (options.right !== undefined) wrapper.style.right = options.right;
    if (options.bottom !== undefined) wrapper.style.bottom = options.bottom;
    if (options.left !== undefined) wrapper.style.left = options.left;
    if (options.zIndex !== undefined) wrapper.style.zIndex = options.zIndex;

    wrapper.innerHTML = generator(themeColors).trim();
    return wrapper;
  }

  // ------------------------------------------------------------------------
  // LEVEL 2: COMPOSITION FACTORY
  // ------------------------------------------------------------------------
  const COMPOSITIONS = {
    // 1. ElephantPair: Two elephants facing inward with a central lotus/ornament
    ElephantPair: (opts = {}) => {
      const el = document.createElement('div');
      el.className = `vowelle-comp comp-elephant-pair ${opts.className || ''}`;

      const elephantSize = opts.size === 'sm' ? { width: 50, height: 40 } : { width: 85, height: 68 };
      const lotusSize = opts.size === 'sm' ? { width: 38, height: 30 } : { width: 60, height: 48 };

      const leftElephant = createObject('Elephant', { size: elephantSize, theme: opts.theme || 'duotone', opacity: opts.opacity || 0.9 });
      const centerLotus = createObject('Lotus', { size: lotusSize, theme: opts.theme || 'antique-gold', opacity: opts.opacity || 0.95 });
      const rightElephant = createObject('Elephant', { size: elephantSize, flipH: true, theme: opts.theme || 'duotone', opacity: opts.opacity || 0.9 });

      el.appendChild(leftElephant);
      el.appendChild(centerLotus);
      el.appendChild(rightElephant);
      return el;
    },

    // 2. JasmineCorner: Botanical branch with jasmine blossoms framing corners
    JasmineCorner: (opts = {}) => {
      const position = opts.position || 'top-left';
      const el = document.createElement('div');
      el.className = `vowelle-comp comp-jasmine-corner corner-${position} ${opts.className || ''}`;

      const flipH = position.includes('right');
      const flipV = position.includes('bottom');
      const branch = createObject('FloralBranch', {
        size: opts.size || { width: 110, height: 55 },
        theme: opts.theme || 'soft-botanical',
        flipH,
        flipV,
        opacity: opts.opacity || 0.85
      });

      el.appendChild(branch);
      return el;
    },

    // 3. ToranHeader: Auspicious mango leaf string with suspended temple bells
    ToranHeader: (opts = {}) => {
      const el = document.createElement('div');
      el.className = `vowelle-comp comp-toran-header ${opts.className || ''}`;

      // Left bell
      const leftBell = createObject('TempleBell', {
        size: { width: 36, height: 54 },
        theme: opts.theme || 'antique-gold',
        animation: 'sway',
        opacity: opts.opacity || 0.85
      });

      // Center Maavilai leaf garland
      const centerLeaves = document.createElement('div');
      centerLeaves.className = 'toran-leaves-row';
      for (let i = 0; i < (opts.leafCount || 5); i++) {
        centerLeaves.appendChild(createObject('MangoLeaf', {
          size: { width: 32, height: 48 },
          theme: opts.theme || 'soft-botanical',
          opacity: 0.88
        }));
      }

      // Right bell
      const rightBell = createObject('TempleBell', {
        size: { width: 36, height: 54 },
        theme: opts.theme || 'antique-gold',
        animation: 'sway',
        opacity: opts.opacity || 0.85
      });

      el.appendChild(leftBell);
      el.appendChild(centerLeaves);
      el.appendChild(rightBell);
      return el;
    },

    // 4. GoldDivider: Ultra-delicate antique gold hairline with floral center
    GoldDivider: (opts = {}) => {
      const el = document.createElement('div');
      el.className = `vowelle-comp comp-gold-divider ${opts.className || ''}`;

      const ornament = createObject('OrnamentalLine', {
        size: { width: opts.width || 180, height: 22 },
        theme: opts.theme || 'antique-gold',
        opacity: opts.opacity || 0.8
      });

      el.appendChild(ornament);
      return el;
    },

    // 5. FloralFrame: Four matching corner motifs that frame a card or element
    FloralFrame: (opts = {}) => {
      const el = document.createElement('div');
      el.className = `vowelle-comp comp-floral-frame ${opts.className || ''}`;

      const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
      corners.forEach(pos => {
        const cornerNode = document.createElement('div');
        cornerNode.className = `frame-corner corner-${pos}`;
        cornerNode.appendChild(createObject('Muggu', {
          size: { width: 42, height: 42 },
          theme: opts.theme || 'antique-gold',
          flipH: pos.includes('right'),
          flipV: pos.includes('bottom'),
          opacity: opts.opacity || 0.75
        }));
        el.appendChild(cornerNode);
      });

      return el;
    },

    // 6. TempleHeader: Gopuram silhouette flanked by sacred Om/Ganesha and bells
    TempleHeader: (opts = {}) => {
      const el = document.createElement('div');
      el.className = `vowelle-comp comp-temple-header ${opts.className || ''}`;

      const leftBell = createObject('TempleBell', { size: { width: 38, height: 56 }, theme: 'antique-gold', opacity: 0.8 });
      const templeCenter = createObject('Temple', { size: { width: 75, height: 75 }, theme: opts.theme || 'antique-gold', opacity: 0.9 });
      const rightBell = createObject('TempleBell', { size: { width: 38, height: 56 }, theme: 'antique-gold', opacity: 0.8 });

      el.appendChild(leftBell);
      el.appendChild(templeCenter);
      el.appendChild(rightBell);
      return el;
    },

    // 7. ClosingOrnament: Purna Kalash flanked by twin warm glowing Diyas
    ClosingOrnament: (opts = {}) => {
      const el = document.createElement('div');
      el.className = `vowelle-comp comp-closing-ornament ${opts.className || ''}`;

      const leftDiya = createObject('Diya', { size: { width: 48, height: 42 }, theme: 'antique-gold', opacity: 0.88 });
      const centerKalash = createObject('Kalash', { size: { width: 62, height: 74 }, theme: opts.theme || 'duotone', opacity: 0.92 });
      const rightDiya = createObject('Diya', { size: { width: 48, height: 42 }, flipH: true, theme: 'antique-gold', opacity: 0.88 });

      el.appendChild(leftDiya);
      el.appendChild(centerKalash);
      el.appendChild(rightDiya);
      return el;
    },

    // 8. VenueOrnament: Architectural facade flanked by botanical laurels
    VenueOrnament: (opts = {}) => {
      const el = document.createElement('div');
      el.className = `vowelle-comp comp-venue-ornament ${opts.className || ''}`;

      const leftSprig = createObject('FloralBranch', { size: { width: 70, height: 35 }, theme: 'soft-botanical', opacity: 0.8 });
      const centerTemple = createObject('Temple', { size: { width: 60, height: 60 }, theme: 'antique-gold', opacity: 0.85 });
      const rightSprig = createObject('FloralBranch', { size: { width: 70, height: 35 }, flipH: true, theme: 'soft-botanical', opacity: 0.8 });

      el.appendChild(leftSprig);
      el.appendChild(centerTemple);
      el.appendChild(rightSprig);
      return el;
    },

    // 9. RoyalArch: Curved botanical and architectural framing
    RoyalArch: (opts = {}) => {
      const el = document.createElement('div');
      el.className = `vowelle-comp comp-royal-arch ${opts.className || ''}`;

      const leftLeaf = createObject('BananaLeaf', { size: { width: 60, height: 80 }, theme: 'soft-botanical', opacity: 0.8 });
      const centerDivider = createObject('OrnamentalLine', { size: { width: 140, height: 20 }, theme: 'antique-gold', opacity: 0.85 });
      const rightLeaf = createObject('BananaLeaf', { size: { width: 60, height: 80 }, flipH: true, theme: 'soft-botanical', opacity: 0.8 });

      el.appendChild(leftLeaf);
      el.appendChild(centerDivider);
      el.appendChild(rightLeaf);
      return el;
    },

    // 10. MandapScene: Royal architectural pavilion with carved pillars, cusped arch & tiered shikhara
    MandapScene: (opts = {}) => {
      const el = document.createElement('div');
      el.className = `vowelle-comp comp-mandap-scene ${opts.className || ''}`;
      const template = document.querySelector('.mandap-scene-svg');
      if (template) {
        el.appendChild(template.cloneNode(true));
      } else {
        const theme = opts.theme || 'antique-gold';
        const t = THEMES[theme] || THEMES['antique-gold'];
        el.innerHTML = `
          <svg class="mandap-scene-svg" viewBox="0 0 1120 640" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="40" y1="595" x2="1080" y2="595" stroke="${t.primary}" stroke-width="1.8" opacity="0.75"/>
            <line x1="90" y1="605" x2="1030" y2="605" stroke="${t.primary}" stroke-width="1" stroke-dasharray="6,4" opacity="0.45"/>
            <rect x="70" y="555" width="105" height="40" rx="3" stroke="${t.primary}" stroke-width="1.4" fill="rgba(184, 151, 88, 0.04)"/>
            <rect x="85" y="525" width="75" height="30" rx="2" stroke="${t.primary}" stroke-width="1.2" fill="rgba(184, 151, 88, 0.03)"/>
            <line x1="98" y1="510" x2="98" y2="235" stroke="${t.primary}" stroke-width="1.5"/>
            <line x1="147" y1="510" x2="147" y2="235" stroke="${t.primary}" stroke-width="1.5"/>
            <rect x="945" y="555" width="105" height="40" rx="3" stroke="${t.primary}" stroke-width="1.4" fill="rgba(184, 151, 88, 0.04)"/>
            <rect x="960" y="525" width="75" height="30" rx="2" stroke="${t.primary}" stroke-width="1.2" fill="rgba(184, 151, 88, 0.03)"/>
            <line x1="973" y1="510" x2="973" y2="235" stroke="${t.primary}" stroke-width="1.5"/>
            <line x1="1022" y1="510" x2="1022" y2="235" stroke="${t.primary}" stroke-width="1.5"/>
            <rect x="50" y="180" width="1020" height="15" rx="2" stroke="${t.primary}" stroke-width="1.4" fill="rgba(184, 151, 88, 0.08)"/>
            <polygon points="30,180 1090,180 1060,158 60,158" stroke="${t.primary}" stroke-width="1.5" fill="rgba(184, 151, 88, 0.04)"/>
            <path d="M190,220 C215,175 270,175 285,210 C310,165 365,165 385,205 C410,155 470,155 495,195 C520,145 560,125 560,120 C560,125 600,145 625,195 C650,155 710,155 735,205 C755,165 810,165 835,210 C850,175 905,175 930,220" stroke="${t.primary}" stroke-width="1.8" fill="none"/>
            <circle cx="560" cy="115" r="16" stroke="${t.primary}" stroke-width="1.4" fill="#F8F2E7"/>
            <polygon points="440,80 680,80 630,40 490,40" stroke="${t.primary}" stroke-width="1.4" fill="rgba(184, 151, 88, 0.06)"/>
            <line x1="560" y1="0" x2="560" y2="-6" stroke="${t.primary}" stroke-width="2"/>
            <circle cx="560" cy="-6" r="2" fill="${t.primary}"/>
          </svg>
        `;
      }
      return el;
    },

    // 11. TempleScene: Classical temple facade & mandapa architectural composition
    TempleScene: (opts = {}) => {
      return COMPOSITIONS.MandapScene(opts);
    }
  };

  /**
   * Generates a Level 2 Decorative Composition DOM node.
   * @param {string} name - Composition name (e.g. 'ElephantPair', 'ToranHeader', 'ClosingOrnament')
   * @param {Object} options - Configuration options
   * @returns {HTMLElement}
   */
  function createComposition(name, options = {}) {
    const factory = COMPOSITIONS[name];
    if (!factory) {
      console.warn(`[VowelleDecorations] Unknown composition: "${name}"`);
      return document.createElement('div');
    }
    const compEl = factory(options);
    if (options.position) compEl.style.position = options.position;
    if (options.top !== undefined) compEl.style.top = options.top;
    if (options.right !== undefined) compEl.style.right = options.right;
    if (options.bottom !== undefined) compEl.style.bottom = options.bottom;
    if (options.left !== undefined) compEl.style.left = options.left;
    if (options.zIndex !== undefined) compEl.style.zIndex = options.zIndex;
    if (options.transform !== undefined) compEl.style.transform = options.transform;
    return compEl;
  }

  /**
   * Injects an Object or Composition into a target element.
   */
  function inject(target, element) {
    const targetEl = typeof target === 'string' ? document.querySelector(target) : target;
    if (!targetEl || !element) return null;
    targetEl.appendChild(element);
    return element;
  }

  // ------------------------------------------------------------------------
  // SYSTEM WIRING: Replace floating decorations with deliberate Compositions
  // ------------------------------------------------------------------------
  function renderAllDecorations() {
    // Clean up any old floating .decoration nodes to prevent double-rendering
    document.querySelectorAll('.decoration:not(.vowelle-dec-object)').forEach(el => el.remove());

    // 1. Cover / Envelope Screen
    // The cover card has its own bespoke luxury SVG ornaments (Ganesha, jasmine garland, botanical corners)
    // defined directly in the template for precise editorial typography and sizing hierarchy.
    const coverCard = document.querySelector('.front-page-card');
    if (coverCard) {
      // Bespoke cover already rendered, no duplicate injection needed
    }

    // 2. Hero Section: Auspicious ToranHeader at top & GoldDivider under names
    const hero = document.querySelector('#hero');
    if (hero) {
      inject(hero, createComposition('ToranHeader', {
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 3,
        opacity: 0.85
      }));
    }

    // 3. You're Invited Section: InvitationFrame wrapping the invitation card
    const invitedCard = document.querySelector('.signature-invitation-card, .invitation-text-card');
    if (invitedCard) {
      inject(invitedCard, createComposition('FloralFrame', {
        theme: 'antique-gold',
        opacity: 0.75
      }));
    }

    // 4. The Couple Section: Stately ElephantPair framing the section header
    const coupleSection = document.querySelector('#couple');
    if (coupleSection) {
      const coupleBadge = coupleSection.querySelector('.section-badge-script');
      if (coupleBadge) {
        inject(coupleBadge.parentElement, createComposition('ElephantPair', {
          theme: 'duotone',
          size: 'md',
          opacity: 0.9,
          className: 'couple-elephant-crest'
        }));
      }
    }

    // 5. Muhurtham Section: TempleHeader anchoring sacred timings
    const muhurthamSection = document.querySelector('#muhurtham');
    if (muhurthamSection) {
      const muhurthamHeader = muhurthamSection.querySelector('.muhurtham-header');
      if (muhurthamHeader) {
        inject(muhurthamHeader, createComposition('TempleHeader', {
          theme: 'antique-gold',
          opacity: 0.85,
          className: 'muhurtham-temple-crest'
        }));
      }
    }

    // 6. Venue Section: Architectural MandapScene framing the venue details
    const venueSection = document.querySelector('#venue');
    if (venueSection) {
      const backdrop = venueSection.querySelector('.venue-mandap-backdrop');
      if (backdrop && !backdrop.querySelector('.mandap-scene-svg')) {
        inject(backdrop, createComposition('MandapScene', {
          theme: 'antique-gold',
          opacity: 0.5
        }));
      }
    }

    // 7. Gallery Section: JasmineCorner framing moments
    const gallerySection = document.querySelector('#gallery');
    if (gallerySection) {
      inject(gallerySection, createComposition('JasmineCorner', {
        position: 'top-left',
        theme: 'soft-botanical',
        opacity: 0.85
      }));
      inject(gallerySection, createComposition('JasmineCorner', {
        position: 'top-right',
        theme: 'soft-botanical',
        opacity: 0.85
      }));
    }

    // 8. Celebration / Lunch & Blessings: ClosingOrnament uniting feast & blessings
    const lunchSection = document.querySelector('#lunch');
    if (lunchSection) {
      inject(lunchSection, createComposition('ClosingOrnament', {
        theme: 'duotone',
        opacity: 0.9,
        className: 'lunch-closing-crest'
      }));
    }

    console.log('[VowelleDecorations] Reusable 2-Level Object & Composition System rendered successfully.');
  }

  // ------------------------------------------------------------------------
  // BACKWARD-COMPATIBILITY ADAPTER (Decorations.add / Decorations.create)
  // ------------------------------------------------------------------------
  function legacyAdd(type, target, options = {}) {
    const el = OBJECT_VECTORS[type] ? createObject(type, options) : createComposition(type, options);
    return inject(target, el);
  }

  function legacyCreate(type, extraClass = '') {
    return createObject(type, { className: extraClass });
  }

  // Auto-init on DOMContentLoaded
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', renderAllDecorations);
    } else {
      renderAllDecorations();
    }
  }

  return {
    // Level 1: Objects
    createObject,
    OBJECTS: Object.keys(OBJECT_VECTORS),

    // Level 2: Compositions
    createComposition,
    COMPOSITIONS: Object.keys(COMPOSITIONS),

    // Themes & Helpers
    THEMES,
    SIZES,
    inject,
    renderAll: renderAllDecorations,

    // Backward-compatible API
    add: legacyAdd,
    create: legacyCreate
  };
}));
