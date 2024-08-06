async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response failed " + response.statusText);
        }
        let data = await response.json();
        return data;
    } catch (error) {
        console.error("There was an error fetching the JSON file:", error);
    }
}

function renderBlogs(data) {
    data.forEach((article) => {
        // creates articles as cards
        let blogCard = document.createElement("article");
        blogCard.classList.add("blog-card");

        // sets image paths and appends them to the card
        let img = document.createElement("img");
        img.src = article.img;
        blogCard.append(img);

        // appends the title of dummy.json to the card
        let title = document.createElement("h3");
        title.textContent = article.title;
        blogCard.append(title);

        // shortens the text to 150 characters
        let cardText = document.createElement("p");

        if (article.text.length > 150) {
            cardText.textContent = article.text.substr(0, 150) + "...";
        } else {
            cardText.textContent = article.text;
        }

        blogCard.append(cardText);

        // creates a button and appends it to the card
        let blogButton = document.createElement("button");
        blogButton.classList.add("primary-btn");
        blogButton.textContent = "Read more";

        blogCard.append(blogButton);

        // redirects to the article.html page and passes the article ID as a URL parameter
        blogButton.addEventListener("click", () => {
            window.location.href = `article.html?id=${article.id}`;
        });

        // appends the whole card with its fetched data to the blog section
        let blogSection = document.getElementById("blog");
        blogSection.append(blogCard);
    });
}

async function fetchAndRenderBlogs() {
    let data = await fetchData("../data/dummy.json");
    if (data) {
        renderBlogs(data);
    }
}

fetchAndRenderBlogs();
