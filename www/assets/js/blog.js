document.addEventListener('DOMContentLoaded', function () {
  let blogArticles = {
    Technology: {
      1: "About this website",
      2: "md block test"
    },
    Stuff: {}
  };

  let blogLinks = document.getElementById('blogLinks');

  function getArticles(blogLinksElement, topic) {
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
    } else {
      console.error('Element with ID "blogLinks" not found.');
    }
  }

  function listAllTopicsAsLinks(blogLinksElement, topics) {
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
    } else {
      console.error('Element with ID "blogLinks" not found.');
    }
  }

  function main() {
    const urlParams = new URLSearchParams(window.location.search);
    const topic = urlParams.get('topic');

    // Check if a topic is specified in the URL
    if (topic) {
      getArticles(blogLinks, topic);
    } else {
      console.log('No topic specified in URL.');
      listAllTopicsAsLinks(blogLinks, blogArticles);
    }
  }

  main();
});