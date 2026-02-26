
document.addEventListener('DOMContentLoaded', function () {

  loadComponents();
  setupMobileMenu();
  setupAnimations();
  setupCounters();
  setupContactForm();
  setupPortfolio();

});

function loadComponents() {
  var basePath = './';

  var navbarBox = document.getElementById('navbar-placeholder');
  if (navbarBox) {
    fetch(basePath + 'navbar.html')
      .then(function (response) {
        return response.text();
      })
      .then(function (html) {
      
        navbarBox.innerHTML = html;

        setupMobileMenu();
        highlightCurrentPage();
      });
  }

  var footerBox = document.getElementById('footer-placeholder');
  if (footerBox) {
    fetch(basePath + 'footer.html')
      .then(function (response) {
        return response.text();
      })
      .then(function (html) {

      
        footerBox.innerHTML = html;
      });
  }

}

function fixLinks(html) {
  return html.replace(/href="([^"]*)"/g, function (fullMatch, linkValue) {

    var dontTouch = linkValue.startsWith('http') ||
      linkValue.startsWith('#') ||
      linkValue.startsWith('mailto:') ||
      linkValue.startsWith('tel:') ||
      linkValue.startsWith('../');

    if (dontTouch) {
      return fullMatch;
    }

    return 'href="../' + linkValue + '"';
  });
}


function highlightCurrentPage() {
  var currentFileName = window.location.pathname.split('/').pop();

  if (!currentFileName) {
    currentFileName = 'index.html';
  }

  var navLinks = document.querySelectorAll('.navbar-menu a');
  navLinks.forEach(function (link) {
    var linkHref = link.getAttribute('href');
    if (linkHref && linkHref.includes(currentFileName)) {
      link.classList.add('active');
    }
  });
}


function setupMobileMenu() {
  var hamburger = document.querySelector('.hamburger');
  var navMenu = document.querySelector('.navbar-menu');

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  var allNavLinks = navMenu.querySelectorAll('a');
  allNavLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

function setupAnimations() {

  var observer = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });

  }, { threshold: 0.1 });

  var animatedElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right');
  animatedElements.forEach(function (element) {
    observer.observe(element);
  });
}

function setupCounters() {
  var counters = document.querySelectorAll('.number');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {

        var counter = entry.target;
        var targetNumber = Number(counter.getAttribute('data-count'));
        var suffix = counter.getAttribute('data-suffix') || '';
        var currentNumber = 0;

        function countUp() {
          var step = targetNumber / 100;

          if (currentNumber < targetNumber) {
            currentNumber = currentNumber + step;
            counter.innerText = Math.ceil(currentNumber) + suffix;
            setTimeout(countUp, 20);
          } else {
            counter.innerText = targetNumber + suffix;
          }
        }

        countUp();
        observer.unobserve(counter);
      }
    });
  });

  counters.forEach(function (counter) {
    observer.observe(counter);
  });
}



function setupContactForm() {
  var form = document.querySelector('#contactForm');

  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var name = document.querySelector('#name').value.trim();
    var email = document.querySelector('#email').value.trim();
    var message = document.querySelector('#message').value.trim();
    if (name === '' || email === '' || message === '') {
      alert('Please fill in all required fields.');
      return;
    }

    var successMessage = document.querySelector('.form-success');
    if (successMessage) {
      successMessage.style.display = 'block';

      form.reset();


      setTimeout(function () {
        successMessage.style.display = 'none';
      }, 5000);
    }
  });
}

function setupPortfolio() {
  var filterButtons = document.querySelectorAll('.filter-btn');
  var projectCards = document.querySelectorAll('.portfolio-card');

  if (filterButtons.length === 0) return;

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {

      filterButtons.forEach(function (btn) {
        btn.classList.remove('active');
      });

      button.classList.add('active');
      var selectedCategory = button.getAttribute('data-filter');

      projectCards.forEach(function (card) {
        var cardCategory = card.getAttribute('data-category');

        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
