window.addEventListener('DomContentLoader', function () {
  const navLink = document.qeuerySelectorAll('nav ul li a');
  navLink.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo(
          {
            top: target.offsetTop,
            behavior: 'smooth'
          });
      }
    });
  });
});
