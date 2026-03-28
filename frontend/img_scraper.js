import https from 'https';

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

function searchImage(query) {
  return new Promise((resolve) => {
    const url = 'https://html.duckduckgo.com/html/?q=' + encodeURIComponent(query + ' product nykaa amazon myntra');
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
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
  for (const p of products) {
    const res = await searchImage(p);
    console.log(res.query + ' ===> ' + res.url);
  }
})();
