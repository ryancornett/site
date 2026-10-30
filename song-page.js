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

/* Copy lyrics, including the title and section labels. */
(() => {
  const lyrics = document.querySelector(".lyrics");
  if (!lyrics?.textContent.trim()) return;

  const tools = document.createElement("div");
  tools.className = "lyrics-tools";

  tools.innerHTML = `
    <button type="button" class="button button-outline">
      <wa-icon name="copy" aria-hidden="true"></wa-icon>
      Copy lyrics
    </button>

    <span class="lyrics-copy-status" role="status"
      aria-live="polite"></span>

    <div class="lyrics-copy-fallback" hidden>
      <label for="lyrics-copy-text">
        Lyrics selected—copy using your device’s copy command.
      </label>
      <textarea id="lyrics-copy-text" rows="12"
        readonly spellcheck="false"></textarea>
    </div>
  `;

  lyrics.before(tools);

  const button = tools.querySelector("button");
  const status = tools.querySelector(".lyrics-copy-status");
  const fallback = tools.querySelector(".lyrics-copy-fallback");
  const textarea = tools.querySelector("textarea");

  function getLyricsText() {
    const title =
      document.querySelector(".song-heading h1")?.textContent.trim();

    const sections = [...lyrics.querySelectorAll(".lyric-section")];

    const blocks = sections.length
      ? sections.map(section => {
          const heading = section.querySelector("h3")?.textContent.trim();
          const lines = section.querySelector("p")?.innerText.trim();

          return [heading, lines].filter(Boolean).join("\n");
        })
      : [lyrics.innerText.trim()];

    return [title, ...blocks].filter(Boolean).join("\n\n");
  }

  button.addEventListener("click", async () => {
    const text = getLyricsText();

    button.disabled = true;
    status.textContent = "";
    fallback.hidden = true;

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard unavailable");
      }

      await navigator.clipboard.writeText(text);
      status.textContent = "Lyrics copied.";
    } catch {
      // Provide a manual copy option if clipboard access is unavailable.
      textarea.value = text;
      fallback.hidden = false;
      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, text.length);
      status.textContent = "Select Copy to copy the highlighted lyrics.";
    } finally {
      button.disabled = false;
    }
  });
})();

/* Resource details: hover, focus, and touch-friendly info buttons. */
(() => {
  const items = [...document.querySelectorAll(".resource-item")];
  let active = null;
  let closeTimer;

  function hide() {
    clearTimeout(closeTimer);

    if (!active) return;

    active.tip.hidden = true;
    active.button.setAttribute("aria-expanded", "false");
    active = null;
  }

  function position() {
    if (!active) return;

    const gap = 12;
    const rect = active.item.getBoundingClientRect();
    const box = active.tip.getBoundingClientRect();

    const left = Math.max(
      gap,
      Math.min(
        rect.left + (rect.width - box.width) / 2,
        window.innerWidth - box.width - gap
      )
    );

    const below = rect.bottom + 8;

    const top = below + box.height <= window.innerHeight - gap
      ? below
      : rect.top - box.height - 8;

    active.tip.style.left = `${left}px`;
    active.tip.style.top = `${
      Math.max(
        gap,
        Math.min(top, window.innerHeight - box.height - gap)
      )
    }px`;
  }

  function show(item, tip, button) {
    clearTimeout(closeTimer);

    if (active?.item !== item) {
      hide();
      active = { item, tip, button, pinned: false };
    }

    tip.hidden = false;
    button.setAttribute("aria-expanded", "true");
    position();
  }

  function scheduleClose(item) {
    clearTimeout(closeTimer);

    closeTimer = setTimeout(() => {
      if (active?.item !== item || active.pinned) return;

      if (
        item.matches(":hover") ||
        active.tip.matches(":hover") ||
        item.contains(document.activeElement)
      ) return;

      hide();
    }, 150);
  }

  for (const item of items) {
    const tip = item.querySelector(".resource-tip");
    const button = item.querySelector(".resource-info");

    if (!tip || !button) continue;

    // Floating chips won't be clipped by the resource pane.
    document.body.append(tip);
    button.hidden = false;

    item.addEventListener("pointerenter", event => {
      if (event.pointerType === "mouse") show(item, tip, button);
    });

    item.addEventListener("pointerleave", () => scheduleClose(item));
    item.addEventListener("focusin", () => show(item, tip, button));
    item.addEventListener("focusout", () => scheduleClose(item));

    button.addEventListener("click", () => {
      if (active?.item === item && active.pinned) {
        hide();
      } else {
        show(item, tip, button);
        active.pinned = true;
      }
    });

    tip.addEventListener("pointerenter", () => clearTimeout(closeTimer));
    tip.addEventListener("pointerleave", () => scheduleClose(item));
  }

  document.addEventListener("pointerdown", event => {
    if (
      active &&
      !active.item.contains(event.target) &&
      !active.tip.contains(event.target)
    ) hide();
  });

  document.addEventListener("focusin", event => {
    if (
      active &&
      !active.item.contains(event.target) &&
      !active.tip.contains(event.target)
    ) hide();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") hide();
  });

  window.addEventListener("resize", position);
  window.addEventListener("scroll", position, {
    capture: true,
    passive: true,
  });
})();
