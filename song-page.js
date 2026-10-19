const share = document.querySelector('.share');
if (share) {
  const url = document.querySelector('link[rel="canonical"]').href;
  const status = share.querySelector('[role="status"]');
  const native = share.querySelector('[data-share]');
  if (navigator.share) {
    native.hidden = false;
    native.addEventListener('click', async () => {
      try { await navigator.share({title: document.title, url}); }
      catch (error) { if (error.name !== 'AbortError') status.textContent = 'Please use Copy link or Email to share this song.'; }
    });
  }
  share.querySelector('[data-copy]').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(url); status.textContent = 'Link copied.'; }
    catch { status.textContent = `Copy this link: ${url}`; }
  });
}
