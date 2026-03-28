import https from 'https';
import fs from 'fs';
import path from 'path';

const products = [
  'Lakme UV-Protect Face Powder',
  'Lakme 2 in 1 Lipstick + Liner',
  'TIRTIR Mask Fit Red Cushion',
  'TIRTIR Mask Fit Foundation',
  'Glide & Hide Concealer',
  'Catkin Oriental Art Lipstick',
  'Verymiss Kiss Proof Trio + Kajal',
  'Gleva Lipstick'
];

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(dest))
           .on('finish', resolve)
           .on('error', reject);
      } else {
        if (res.headers.location) {
          downloadImage(res.headers.location, dest).then(resolve).catch(reject);
        } else {
          resolve(false);
        }
      }
    }).on('error', reject);
  });
}

function searchImage(query) {
  return new Promise((resolve) => {
    const url = 'https://html.duckduckgo.com/html/?q=' + encodeURIComponent(query + ' product makeup nykaa');
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        const matches = [...body.matchAll(/<img[^>]+src="([^"]+)"/g)];
        let found = null;
        for (const m of matches) {
           const src = m[1];
           if (src.includes('http') && !src.includes('logo') && !src.includes('duckduckgo') && src.length > 20) {
             found = src;
             break;
           } else if (src.startsWith('//')) {
             found = 'https:' + src;
             break;
           }
        }
        resolve({ query, url: found });
      });
    }).on('error', () => resolve({ query, url: null }));
  });
}

(async () => {
  const dir = 'c:/Users/trish/Desktop/saundarya_shrinagar/src/assets/products';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  for (const p of products) {
    const res = await searchImage(p);
    if (res.url) {
      const fileName = p.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.jpg';
      const dest = path.join(dir, fileName);
      await downloadImage(res.url, dest);
      console.log('Downloaded', fileName);
    }
  }
})();
