window.addEventListener("scroll", function () {
  const elements = document.querySelectorAll(".animate-on-scroll");

  elements.forEach(function (element) {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop <= window.innerHeight / 1.3) {
      element.classList.add("animate");
    }
  });
});
