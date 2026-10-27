/**
 * Board of Directors Modal Script
 */

function orgOpenDirectorModal(directorId) {
  const contentEl = document.getElementById('org-director-modal-content-' + directorId);
  const modalEl = document.getElementById('org-director-modal');
  const modalBody = document.getElementById('org-director-modal-body');

  if (contentEl && modalEl && modalBody) {
    modalBody.innerHTML = contentEl.innerHTML;
    modalEl.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function orgCloseDirectorModal(event) {
  if (event && event.target && event.target.id !== 'org-director-modal' && !event.target.classList.contains('org-director-modal-close')) {
    return;
  }
  const modalEl = document.getElementById('org-director-modal');
  if (modalEl) {
    modalEl.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    orgCloseDirectorModal();
  }
});
