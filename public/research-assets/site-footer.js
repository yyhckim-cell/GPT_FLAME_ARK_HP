(() => {
  const footer = document.querySelector('footer.footer');
  const dialog = footer?.querySelector('.brand-identity-dialog');
  const trigger = footer?.querySelector('.footer-brand-button');
  if (!dialog || !trigger) return;
  let previousOverflow = '';
  trigger.addEventListener('click', () => {previousOverflow = document.body.style.overflow;dialog.showModal();document.body.style.overflow = 'hidden';});
  dialog.querySelector('.brand-identity-close')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {if(event.target === dialog) dialog.close();});
  dialog.addEventListener('close', () => {document.body.style.overflow = previousOverflow;});
})();
