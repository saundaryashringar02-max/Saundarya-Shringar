import fs from 'fs';
import https from 'https';
import path from 'path';

const url = 'https://v1.pinimg.com/videos/iht/720p/7e/ea/de/7eeadea15e5a731b14692d3986188a44_720w.mp4';
const destDir = path.join(process.cwd(), 'src', 'assets', 'videos');
const dest = path.join(destDir, 'perfume_video.mp4');

// Create directory if it doesn't exist
if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir, { recursive: true });
}

const file = fs.createWriteStream(dest);

https.get(url, function(response) {
  response.pipe(file);
  file.on('finish', function() {
    file.close();  // close() is async, call cb after close completes.
    console.log('Download Completed');
  });
}).on('error', function(err) { // Handle errors
  fs.unlink(dest, () => {}); // Delete the file async. (But we don't check the result)
  console.error('Error downloading:', err.message);
});
