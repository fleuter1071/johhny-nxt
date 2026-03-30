export function initActiveNav() {
  const navLinks = document.querySelectorAll(".nav a, .mobile-nav a");
  const sections = [...document.querySelectorAll("section[id]")];
  if (!navLinks.length || !sections.length || !("IntersectionObserver" in window)) {
    return;
  }

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-40% 0px -45% 0px", threshold: 0 });

  sections.forEach((section) => navObserver.observe(section));
}
