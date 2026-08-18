import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const outDir = path.resolve('public/assets/images/companies');

const logos = [
  { id: 'galvanprime', url: 'https://galvanprime.lk/galvanlogo.png' },
  { id: 'primeict', url: 'https://primeict.lk/primeictlogo.png' },
  { id: 'eduzone', url: 'https://eduzonecollege.lk/eduzone-logo.webp' },
  { id: 'oneliquidate', url: 'https://oneliquidate.com/onelogo.webp' },
  { id: 'travelzone', url: 'https://travelzonetours.com/assets/images/logo.png' },
];

await fs.mkdir(outDir, { recursive: true });

for (const logo of logos) {
  const response = await fetch(logo.url);
  if (!response.ok) throw new Error(`Failed ${logo.url}: ${response.status}`);

  const buffer = Buffer.from(await response.arrayBuffer());
  const output = path.join(outDir, `${logo.id}.webp`);

  await sharp(buffer)
    .resize({ width: 400, withoutEnlargement: true })
    .webp({ quality: 88, alphaQuality: 90 })
    .toFile(output);

  const { size } = await fs.stat(output);
  console.log(`✓ ${logo.id}.webp (${Math.round(size / 1024)} KB)`);
}
