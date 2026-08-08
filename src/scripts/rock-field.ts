/**
 * A field of LAVA's own volcanic rocks that the cursor pushes aside.
 *
 * Each rock keeps a home position. Inside the radius it is displaced along the
 * vector away from the pointer, falling off with the square of distance so the
 * edge of the radius is imperceptible; outside it, it eases home. Big rocks ease
 * slower than small ones, which reads as mass without any physics engine.
 *
 * Owns its own frame loop, pauses when off screen, and degrades to a single
 * static frame on touch and under reduced-motion.
 */

export interface RockFieldOptions {
  /** Image URLs, cycled through. */
  rocks: string[];
  /** Pointer influence radius, px. */
  radius?: number;
  /** Peak displacement, px. */
  strength?: number;
  /** Roughly one rock per this many square px. */
  density?: number;
  minCount?: number;
  maxCount?: number;
  sizeRange?: [number, number];
}

interface Rock {
  el: HTMLImageElement;
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  size: number;
  rot: number;
  ease: number;
}

export interface RockField {
  /** Advance one frame manually. Exposed for tests, where rAF may be stalled. */
  step(): void;
  destroy(): void;
}

export function createRockField(el: HTMLElement, opts: RockFieldOptions): RockField {
  const {
    rocks: sources,
    radius = 220,
    strength = 130,
    density = 26000,
    minCount = 8,
    maxCount = 40,
    sizeRange = [30, 84],
  } = opts;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(pointer: fine)').matches;

  let rocks: Rock[] = [];
  let w = 0;
  let h = 0;
  // Null while the pointer is outside: the field rests instead of being shoved
  // by a phantom cursor parked in the middle.
  let px: number | null = null;
  let py: number | null = null;
  let visible = true;
  let raf = 0;

  const rand = (a: number, b: number) => a + Math.random() * (b - a);

  function build() {
    const rect = el.getBoundingClientRect();
    // Never build against a box that has not been laid out yet — the counts and
    // positions derive from it, and a zero-size build cannot recover on its own.
    if (rect.width < 80 || rect.height < 80) {
      rocks = [];
      el.replaceChildren();
      return;
    }

    w = rect.width;
    h = rect.height;
    el.replaceChildren();

    const count = Math.min(maxCount, Math.max(minCount, Math.round((w * h) / density)));

    rocks = Array.from({ length: count }, (_, i) => {
      const size = rand(sizeRange[0], sizeRange[1]);
      const img = document.createElement('img');
      img.src = sources[i % sources.length];
      img.alt = '';
      img.draggable = false;
      img.decoding = 'async';
      img.loading = 'lazy';
      img.style.cssText =
        `position:absolute;top:0;left:0;width:${size}px;height:auto;` +
        `will-change:transform;pointer-events:none;user-select:none;` +
        // Smaller rocks read as further back.
        `opacity:${(0.5 + ((size - sizeRange[0]) / (sizeRange[1] - sizeRange[0])) * 0.45).toFixed(2)}`;
      el.appendChild(img);

      const homeX = rand(size * 0.6, w - size * 0.6);
      const homeY = rand(size * 0.6, h - size * 0.6);

      return {
        el: img,
        homeX,
        homeY,
        x: homeX,
        y: homeY,
        size,
        rot: rand(0, 360),
        ease: 0.16 - ((size - sizeRange[0]) / (sizeRange[1] - sizeRange[0])) * 0.09,
      };
    });

    draw();
  }

  function draw() {
    for (const r of rocks) {
      r.el.style.transform =
        `translate3d(${r.x - r.size / 2}px, ${r.y - r.size / 2}px, 0) rotate(${r.rot}deg)`;
    }
  }

  function step() {
    for (const r of rocks) {
      let tx = r.homeX;
      let ty = r.homeY;

      if (px !== null && py !== null) {
        const dx = r.homeX - px;
        const dy = r.homeY - py;
        const d = Math.hypot(dx, dy) || 1;
        if (d < radius) {
          // Squared falloff: linear leaves a visible ring at the radius edge.
          const f = (1 - d / radius) ** 2;
          tx += (dx / d) * f * strength;
          ty += (dy / d) * f * strength;
        }
      }

      const beforeX = r.x;
      const beforeY = r.y;
      r.x += (tx - r.x) * r.ease;
      r.y += (ty - r.y) * r.ease;
      // A rock that is being shoved turns; one settling home turns back.
      r.rot += (r.x - beforeX + (r.y - beforeY)) * 0.35;
    }
    draw();
  }

  const onMove = (e: PointerEvent) => {
    const b = el.getBoundingClientRect();
    px = e.clientX - b.left;
    py = e.clientY - b.top;
  };
  const onLeave = () => {
    px = null;
    py = null;
  };

  let resizeTimer = 0;
  const ro = new ResizeObserver(() => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(build, 150);
  });
  ro.observe(el);

  const io = new IntersectionObserver((entries) => {
    visible = entries[0]?.isIntersecting ?? true;
  });
  io.observe(el);

  build();

  const animate = !reduced && fine;
  if (animate) {
    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);
    const loop = () => {
      if (visible) step();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
  }

  return {
    step,
    destroy() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      el.replaceChildren();
    },
  };
}
