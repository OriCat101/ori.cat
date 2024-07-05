document.addEventListener('DOMContentLoaded', function () {
  let blogArticles = {
    technology: {
      1: "About this website",
      2: "md block test"
    },
    stuff: {}
  };

  /**
   * The element that contains the blog links.
   * @type {HTMLElement}
   */
  let blogLinks = document.getElementById('blogLinks');

  /**
   * The element that displays the blog title.
   * @type {HTMLElement}
   */
  let blogTitle = document.getElementById('blogTitle');

  /**
   * Lists all articles in the specified topic.
   * @param {HTMLElement} blogLinksElement - The element that contains the blog links.
   * @param {string} topic - The topic of the articles to be listed.
   * @param {HTMLElement} blogTitle - The element that displays the blog title.
   */
  function getArticles(blogLinksElement, topic, blogTitle) {
    if (blogLinksElement) {
      for (let key in blogArticles[topic]) {
        let article = document.createElement('article');
        let h2 = document.createElement('h2');
        let mdBlock = document.createElement('md-block');
        let readMoreLink = document.createElement('a');

        h2.textContent = blogArticles[topic][key];
        mdBlock.setAttribute('class', 'md-text');
        mdBlock.setAttribute('src', `/blog/${topic}/${key}.md`);
        mdBlock.textContent = 'Ori fucked up';

        readMoreLink.textContent = 'Read More';
        readMoreLink.setAttribute('href', `/blog.html?article=${key}&topic=${topic}`);
        readMoreLink.setAttribute('class', 'read-more')

        article.appendChild(h2);
        article.appendChild(mdBlock);
        article.appendChild(readMoreLink);
        blogLinksElement.appendChild(article);
        document.title = topic;
      }

      blogTitle.textContent += `${topic}`;
    } else {
      console.error('Element with ID "blogLinks" not found.');
    }
  }

  /**
   * Loads the full article content for a given topic and article ID.
   *
   * @param {string} topic - The topic of the article.
   * @param {string} articleID - The ID of the article.
   * @param {HTMLElement} blogLinksElement - The element where the full article will be appended.
   * @param {HTMLElement} blogTitle - The element representing the blog title.
   */
  function loadFullArticle(topic, articleID, blogLinksElement, blogTitle) {
    if (blogLinksElement) {
      let article = document.createElement('article');
      let mdBlock = document.createElement('md-block');

      blogTitle.textContent += blogArticles[topic][articleID];
      blogTitle.parentElement.setAttribute('href', `/blog.html?topic=${topic}`);

      mdBlock.setAttribute('class', 'md-text');
      mdBlock.setAttribute('id', 'full-article');
      mdBlock.setAttribute('src', `/blog/${topic}/${articleID}.md`);
      mdBlock.textContent = 'Ori fucked up';

      article.appendChild(mdBlock);
      blogLinksElement.appendChild(article);
      document.title = blogArticles[topic][articleID];
    } else {
      console.error('Element with ID "blogLinks" not found.');
    }
  }

  /**
   * Lists all topics as links.
   * @param {HTMLElement} blogLinksElement - The element that contains the blog links.
   * @param {object} topics - An object that stores the topics.
   * @param {HTMLElement} blogTitle - The element that displays the blog title.
   */
  function listAllTopicsAsLinks(blogLinksElement, topics, blogTitle) {
    if (blogLinksElement) {
      for (let key in topics) {
        let topic = topics[key];
        let article = document.createElement('article');
        let h2 = document.createElement('h2');
        let link = document.createElement('a');
        link.textContent = key; // Use the key as the link text
        link.setAttribute('href', `?topic=${key.toLowerCase()}`);

        h2.appendChild(link);
        article.appendChild(h2);
        blogLinksElement.appendChild(article);
      }

      blogTitle.textContent = "Topics";
    } else {
      console.error('Element with ID "blogLinks" not found.');
    }
  }

  /**
   * The main function that handles the logic for displaying articles or topics based on the URL parameters.
   */
  function main() {
    const urlParams = new URLSearchParams(window.location.search);
    const topic = urlParams.get('topic');
    const article = urlParams.get('article');

    // Check if a topic or article is specified in the URL
    if (topic && article) {
      loadFullArticle(topic, article, blogLinks, blogTitle);
    } else if (topic) {
      getArticles(blogLinks, urlParams.get('topic'), blogTitle);
    } else {
      console.log('No topic specified in URL.');
      listAllTopicsAsLinks(blogLinks, blogArticles, blogTitle);
    }
  }

  main();
});