/**
 * Regenerates the site's image assets from their originals.
 *
 * Sources live outside the repo (phone screenshots, Vision cutouts), so every
 * step is guarded: a missing input is reported and skipped rather than killing
 * the run. Assets already committed under public/img stay as they are.
 */
import sharp from 'sharp';
import { mkdir, access } from 'node:fs/promises';

const OUT = new URL('../public/img/', import.meta.url).pathname;
await mkdir(OUT, { recursive: true });

const exists = async (p) => {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
};

async function step(label, src, fn) {
  if (!(await exists(src))) {
    console.log(`· ${label}: falta ${src} — salteado`);
    return;
  }
  await fn();
  console.log(`✓ ${label}`);
}

// The hero drink, lifted off its background with scripts/cutout.swift.
const DRINK = '/Users/javierromero/Desktop/LAVA Cafe/drink-cutout.png';
await step('vaso del hero', DRINK, async () => {
  for (const w of [552, 380]) {
    await sharp(DRINK).resize({ width: w }).avif({ quality: 60, effort: 5 }).toFile(`${OUT}drink-${w}.avif`);
    await sharp(DRINK)
      .resize({ width: w })
      .webp({ quality: 80, alphaQuality: 90 })
      .toFile(`${OUT}drink-${w}.webp`);
  }
});

console.log('\nLas rocas (public/img/rocks) y rock.png se generan con scripts/cutout.swift');
console.log('y el despill documentado en docs/. No se regeneran acá.');
