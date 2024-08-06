// this feature was written with Open AI's ChatGPT model
function getArticleIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

async function fetchArticleData() {
    const articleId = getArticleIdFromUrl();
    const response = await fetch("../data/dummy.json");
    const articles = await response.json();
    return articles.find((article) => article.id == articleId);
}

(async () => {
    const article = await fetchArticleData();
    if (article) {
        document.getElementById("article-img").src = article.img;
        document.getElementById("article-title").textContent = article.title;
        document.getElementById("article-text").innerHTML = article.text;
    } else {
        document.getElementById("article-container").innerHTML =
            "<p>Article not found.</p>";
    }
})();