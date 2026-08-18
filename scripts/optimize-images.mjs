import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve('public/assets/images');

const sources = [
  {
    url: 'https://primeict.lk/profile.png',
    out: 'profile/teaching.webp',
    width: 1200,
  },
  {
    // Source: https://www.facebook.com/photo/?fbid=1043531371263925&set=a.592203699730030 (NIBM)
    url: 'https://scontent.fcmb2-2.fna.fbcdn.net/v/t39.30808-6/517558749_1043531377930591_8674058305412830284_n.jpg?stp=dst-jpg_tt6&cstp=mx1191x1280&ctp=p180x540&_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFtamJ_4eZsy5MlYzFYg0ACEdjcPPwIvhUR2Nw8_Ai-FUKDFaenxVw7vrDx9fk2DF4VTdR6EZJMW7YIytQwZi6A&_nc_ohc=ThDRvguhnZwQ7kNvwFqnouo&_nc_oc=AdoofI5EoAqxDpgT4kETGxDn9MnBqzEba_0airYPVLeeNdtFHnWKd8CTDWpnSSHV2lY&_nc_zt=23&_nc_ht=scontent.fcmb2-2.fna&_nc_gid=TD_riCUKZHpdXua5h0GKZQ&_nc_ss=7b2a8&oh=00_AQG1AKiY7orqRwkhFds2kf2XbT--uR8wXNfZpfCLvyKW4g&oe=6A89D7C1',
    out: 'achievements/cssl-chess-robot-award.webp',
    width: 900,
  },
  {
    url: 'https://mgt.sjp.ac.lk/wp-content/uploads/2026/04/04.04-Legathon-Group-Photo-011-1.jpg-1024x682.jpeg',
    out: 'achievements/legathon-group.webp',
    width: 1400,
  },
  {
    url: 'https://mgt.sjp.ac.lk/wp-content/uploads/2026/04/03.04-AIFC-Legathon-MaxUp-078-1024x682.jpg',
    out: 'achievements/legathon-astana.webp',
    width: 1400,
  },
  {
    url: 'https://mgt.sjp.ac.lk/wp-content/uploads/2026/04/04.04-Legathon-Final-112-27.jpg-1024x683.jpeg',
    out: 'achievements/legathon-finals.webp',
    width: 1400,
  },
];

async function ensureDir(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function toWebp(input, outputPath, width) {
  await ensureDir(outputPath);
  await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(outputPath);
  const { size } = await fs.stat(outputPath);
  console.log(`✓ ${outputPath} (${Math.round(size / 1024)} KB)`);
}

for (const item of sources) {
  const response = await fetch(item.url);
  if (!response.ok) throw new Error(`Failed ${item.url}: ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  await toWebp(buffer, path.join(root, item.out), item.width);
}
