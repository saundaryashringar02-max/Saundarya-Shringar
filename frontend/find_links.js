const url = 'https://in.pinterest.com/pin/4362930884047123/';

async function main() {
    try {
        const res = await fetch(url);
        const text = await res.text();
        const matches = text.match(/https:\/\/v1\.pinimg\.com\/videos\/[^\s\"']+\.mp4\?[^\s\"']+/g);
        if (matches) {
            console.log('VIDEOS_START');
            matches.forEach(m => console.log(m));
            console.log('VIDEOS_END');
        } else {
            const matches2 = text.match(/https:\/\/v1\.pinimg\.com\/videos\/[^\s\"']+\.mp4/g);
            if (matches2) {
                console.log('VIDEOS_START');
                matches2.forEach(m => console.log(m));
                console.log('VIDEOS_END');
            } else {
                console.log('No video links found');
            }
        }
    } catch (e) {
        console.error('FETCH_ERROR:', e);
    }
}

main();
