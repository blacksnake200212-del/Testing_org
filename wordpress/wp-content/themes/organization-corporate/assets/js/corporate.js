/**
 * Organization Corporate Theme JavaScript
 */

document.addEventListener('DOMContentLoaded', function () {
  // Mobile Menu Toggle
  const mobileBtn = document.getElementById('org-mobile-menu-btn');
  const mainNav = document.getElementById('org-main-nav');

  if (mobileBtn && mainNav) {
    mobileBtn.addEventListener('click', function () {
      mainNav.classList.toggle('is-active');
      mobileBtn.innerHTML = mainNav.classList.contains('is-active') ? '✕' : '☰';
    });
  }
});
