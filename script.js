const toggleButtons = document.querySelectorAll('.toggle-btn');
const treeItems = document.querySelectorAll('.tree-item');

const contentMap = {
  "First Post": {
    title: "First Post",
    text: `This is my first post!<br>\\( \\LaTeX \\)`,
    img: "images/hello_world.jpeg"
  }
};

toggleButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    const parentItem = button.parentElement;
    parentItem.classList.toggle('expanded');
  });
});

treeItems.forEach(item => {
  item.addEventListener('mouseenter', (e) => {
    if (item.parentElement.classList.contains('tree-list') && item.classList.contains('has-children')) {
      item.style.color = 'blue';
    }
  });
  item.addEventListener('mouseleave', (e) => {
    if (item.parentElement.classList.contains('tree-list') && item.classList.contains('has-children')) {
      item.style.color = '';
    }
  });

  item.addEventListener('mouseenter', (e) => {
    if (item.parentElement.tagName === 'UL' && !item.classList.contains('has-children')) {
      item.style.color = 'blue';
      const parentItem = item.closest('.has-children');
      if (parentItem) parentItem.style.color = 'black';
    }
  });

  item.addEventListener('mouseleave', (e) => {
    if (item.parentElement.tagName === 'UL' && !item.classList.contains('has-children')) {
      item.style.color = '';
      const parentItem = item.closest('.has-children');
      if (parentItem) parentItem.style.color = 'blue';
    }
  });
});

treeItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.stopPropagation();
    if (e.target.closest('.toggle-btn')) return;

    let text = '';
    for (let node of item.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        text = node.nodeValue.trim();
        if (text) break;
      }
    }

    if (contentMap[text]) {
      const mainTitle = document.querySelector('.main-content h3');
      const mainPara = document.querySelector('.main-content p');
      let mainImg = document.querySelector('.main-content img');

      if (!mainImg) {
        mainImg = document.createElement('img');
        mainImg.style.maxWidth = '100%';
        mainImg.style.marginTop = '15px';
        document.querySelector('.main-content').appendChild(mainImg);
      }

      mainTitle.textContent = contentMap[text].title;
      mainPara.innerHTML = contentMap[text].text;
      mainImg.src = contentMap[text].img;
      mainImg.alt = contentMap[text].title;

      if (window.MathJax) {
        MathJax.typeset();
      }
    }
  });
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'F12' || 
    (e.ctrlKey && e.shiftKey && ['i', 'c'].includes(e.key.toLowerCase())) || 
    (e.ctrlKey && e.key.toLowerCase() === 'u')) {
    e.preventDefault();
    alert('Developer tools access is disabled.');
  }

  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
    e.preventDefault();
    alert('Saving this page is disabled.');
  }
});

document.querySelectorAll('img').forEach(img => {
  img.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    alert('Right-clicking on images is disabled.');
  });
});

const screenshotBlocker = document.createElement('div');
screenshotBlocker.style.position = 'fixed';
screenshotBlocker.style.top = '0';
screenshotBlocker.style.left = '0';
screenshotBlocker.style.width = '100%';
screenshotBlocker.style.height = '100%';
screenshotBlocker.style.backgroundColor = 'black';
screenshotBlocker.style.zIndex = '99999';
screenshotBlocker.style.display = 'none';
screenshotBlocker.style.pointerEvents = 'none';
document.body.appendChild(screenshotBlocker);

window.addEventListener('blur', () => {
  screenshotBlocker.style.display = 'block';
});

window.addEventListener('focus', () => {
  screenshotBlocker.style.display = 'none';
});

window.addEventListener('blur', () => {
  screenshotBlocker.style.display = 'block';
  alert('Screenshot attempt detected. The screen is now protected and incident is reported.');
});

