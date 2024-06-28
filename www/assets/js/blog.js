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

        h2.textContent = blogArticles[key];
        mdBlock.setAttribute('class', 'md-text');
        mdBlock.setAttribute('src', `/blog/${topic}/${key}.md`);
        mdBlock.textContent = 'Ori fucked up';

        article.appendChild(h2);
        article.appendChild(mdBlock);
        blogLinksElement.appendChild(article);
      }

      blogTitle.textContent += `${topic}`;
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

    // Check if a topic is specified in the URL
    if (topic) {
      getArticles(blogLinks, urlParams.get('topic'), blogTitle);
    } else {
      console.log('No topic specified in URL.');
      listAllTopicsAsLinks(blogLinks, blogArticles, blogTitle);
    }
  }

  main();
});