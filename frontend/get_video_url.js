import https from 'https';

const url = 'https://in.pinterest.com/pin/4362930884047123/';

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        // Look for any .mp4 URL
        const mp4Regex = /https:\/\/v1\.pinimg\.com\/videos\/[^\s"']+\.mp4\?[^\s"']+/g;
        const matches = data.match(mp4Regex);
        if (matches) {
            console.log('SUCCESS_VIDEO_URL:' + matches[0]);
        } else {
            // Try a broader regex
            const broadRegex = /https:\/\/v1\.pinimg\.com\/videos\/\S+\.mp4/g;
            const broadMatches = data.match(broadRegex);
            if (broadMatches) {
                console.log('SUCCESS_VIDEO_URL:' + broadMatches[0]);
            } else {
                console.log('NO_VIDEO_FOUND');
            }
        }
    });
}).on('error', (err) => {
    console.error('ERROR:' + err.message);
});
