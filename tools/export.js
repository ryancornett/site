import { generateSite } from '../site-generator.js';
import { zipTextFiles } from './zip.js';
const button = document.getElementById('export-button');
const status = document.getElementById('export-status');
async function textFile(relative) {
  const response = await fetch(new URL(relative, import.meta.url), {cache:'no-store'});
  if (!response.ok) throw new Error(`Could not load ${relative}. Open the site folder itself in Live Server.`);
  const html = await response.text();

return html.replace(
  /<!-- Code injected by live-server -->\s*<script\b[^>]*>[\s\S]*?<\/script>/gi,
  ""
);
}
button.addEventListener('click', async () => {
  button.disabled = true;
  status.textContent = 'Reading your catalog and generating the pages…';
  try {
    const [{default:songs}, homeSource, shell, hymnTemplate, praiseTemplate] = await Promise.all([
      import(`../songs.js?updated=${Date.now()}`), textFile('../index.html'),
      textFile('../templates/page.html'), textFile('../templates/hymn.html'), textFile('../templates/praise-song.html')
    ]);
    const { files, published } = generateSite({songs, homeSource, shell, hymnTemplate, praiseTemplate});
    const blob = zipTextFiles(files);
    const url = URL.createObjectURL(blob);
    const download = document.createElement('a'); download.href = url; download.download = 'ryancornett-updated-pages.zip';
    document.body.append(download); download.click(); download.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
    status.textContent = `Exported ${published.length} song pages, their URL aliases, and the updated homepage/catalog. Extract the ZIP into your site folder to apply the changes.`;
  } catch (error) {
    status.textContent = `Export stopped: ${error.message} No files have been changed.`;
  } finally { button.disabled = false; }
});
