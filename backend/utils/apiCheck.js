const axios = require('axios');

const checkAPI = async () => {
    try {
        const endpoints = ['/blogs', '/testimonials', '/instagram'];
        for (const ep of endpoints) {
            const res = await axios.get(`http://localhost:5001/api${ep}`);
            console.log(`${ep}: Status ${res.status}`);
            console.log(`- Data keys: ${Object.keys(res.data.data)}`);
            const items = res.data.data[Object.keys(res.data.data)[0]];
            console.log(`- Count: ${items.length}`);
            items.forEach(i => console.log(`  - ${i.name || i.caption || i.title} (IMG: ${i.image})`));
        }
    } catch (err) {
        console.error('API Fail:', err.message);
    }
};

checkAPI();
