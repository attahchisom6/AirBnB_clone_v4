// Add your custom JavaScript code here
window.addEventListener('DOMContentLoaded', function () {
    // Add smooth scrolling to navigation links
    var navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
