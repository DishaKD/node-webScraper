const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../config/database");

async function scrapeHackerNews() {
  try {
    const response = await axios.get("https://news.ycombinator.com/");
    const $ = cheerio.load(response.data);
    const stories = [];

    $(".athing").each((i, element) => {
      const $element = $(element);
      const id = parseInt($element.attr("id"));
      const title = $element.find(".titleline > a").text();
      const url = $element.find(".titleline > a").attr("href");
      const subtext = $element.next();
      const points = parseInt(subtext.find(".score").text()) || 0;
      const author = subtext.find(".hnuser").text();

      stories.push({
        id,
        title,
        url,
        author,
        points,
      });
    });

    return stories;
  } catch (error) {
    console.error("Scraping error:", error);
    return [];
  }
}

async function saveStories(stories) {
  for (const story of stories) {
    try {
      await db.query(
        "INSERT IGNORE INTO stories (id, title, url, author, points) VALUES (?, ?, ?, ?, ?)",
        [story.id, story.title, story.url, story.author, story.points]
      );
    } catch (error) {
      console.error("Database error:", error);
    }
  }
}

module.exports = { scrapeHackerNews, saveStories };
