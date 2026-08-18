const url = process.argv[2];
if (!url) {
  console.error('Usage: node scripts/fetch-fb-image.mjs <facebook-photo-url>');
  process.exit(1);
}

const response = await fetch(url, {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
  },
});

const html = await response.text();
const og = html.match(/property="og:image" content="([^"]+)"/);
console.log('og:image', og?.[1] ?? 'not found');

const images = [...html.matchAll(/https:\/\/scontent[^"']+/g)].map((match) => match[0]);
const unique = [...new Set(images)];
console.log('scontent urls:', unique.length);
unique.slice(0, 10).forEach((item) => console.log(item));
