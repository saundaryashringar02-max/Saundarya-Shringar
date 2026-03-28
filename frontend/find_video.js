import https from 'https';

https.get('https://in.pinterest.com/pin/4362930884047123/', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        const mp4Matches = data.match(/https:\/\/v1\.pinimg\.com\/videos\/[^\s"]+\.mp4/g);
        if (mp4Matches) {
            console.log('FOUND_VIDEOS:');
            mp4Matches.forEach(url => console.log(url));
        } else {
            console.log('No mp4 found');
        }
    });
}).on('error', (err) => {
    console.error(err);
});
