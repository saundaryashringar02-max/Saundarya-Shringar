import http from 'http';

const checkPath = (path) => {
  const options = {
    hostname: 'localhost',
    port: 5173,
    path: path,
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    console.log(`PATH: ${path} STATUS: ${res.statusCode}`);
  });

  req.on('error', (e) => {
    console.error(`problem with request ${path}: ${e.message}`);
  });

  req.end();
};

checkPath('/');
checkPath('/index.html');
checkPath('/src/main.jsx');
