const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// التوكن الذي قدمته
const ACCESS_TOKEN = 'EAAHfRau7g8UBOw8mAw6MBV6RjOxrZCeeZCUw2gQ3vPy5rIqHCVJJg5mLhzvngBari1G6aHkgchRnn3HCkvoKt4ECIL8CwZBZClVYdsZCfPaf7BXU7ZB2XKfbldCpcQkQBgGiwZA1Kj7O5ZA3mYApZBbpYzceAJZCJsZB4ZBSVBFsmtilHfJ8T7BMFUVkYpR2ZB8v4fopy';

// دالة لجلب المنشورات من صفحة
async function getFacebookPagePosts(pageId) {
    const url = `https://graph.facebook.com/v19.0/${pageId}?fields=posts{message,created_time,id}&access_token=${ACCESS_TOKEN}`;

    try {
        const response = await axios.get(url);
        return response.data.posts.data;
    } catch (error) {
        return { error: "حدث خطأ أثناء جلب البيانات", details: error.response?.data || error.message };
    }
}

// مسار لاسترجاع المنشورات عبر ID الصفحة
app.get('/page-posts/:pageId', async (req, res) => {
    const pageId = req.params.pageId;
    const postsData = await getFacebookPagePosts(pageId);
    res.json(postsData);
});

app.listen(PORT, () => {
    console.log(`الخادم يعمل على http://localhost:${PORT}`);
});
