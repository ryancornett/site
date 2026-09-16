const year = new Date().getFullYear();
const footerCredit = document.querySelector('.public-domain');
if (footerCredit != null) {
    footerCredit.textContent = `Creative Commons Zero 1.0 Universal: All works dedicated to public domain. 2019-${year}.`;
}   

// SHARE BAR
(function () {
  const bar = document.querySelector('.share-bar');
  if (!bar) return;

  const url   = bar.dataset.url   || location.href;
  const title = bar.dataset.title || document.title;
  const text  = bar.dataset.text  || '';

  // Web Share API (native sheet on mobile)
  const nativeBtn = bar.querySelector('.share-btn.native');
  if (navigator.share && nativeBtn) {
    nativeBtn.addEventListener('click', async () => {
      try { await navigator.share({ title, text, url }); } catch {}
    });
  } else if (nativeBtn) {
    nativeBtn.style.display = 'none'; // hide if not supported
  }

  // Copy link
  const copyBtn = bar.querySelector('.share-btn.copy');
  copyBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(url);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => copyBtn.textContent = 'Copy link', 1600);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = url; document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); ta.remove();
    }
  });

  // Prefilled links
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const d = encodeURIComponent(text);

  const x = bar.querySelector('.share-link.x');
  if (x) x.href = `https://x.com/intent/tweet?text=${d}%20${t}&url=${u}`;

  const fb = bar.querySelector('.share-link.facebook');
  if (fb) fb.href = `https://www.facebook.com/sharer/sharer.php?u=${u}`;

  const em = bar.querySelector('.share-link.email');
  if (em) em.href = `mailto:?subject=${t}&body=${d}%0A%0A${u}`;
})();

class Song {
  constructor(title, link, type = "Hymn", tune = null, meter = null, wordsBy = "Ryan Cornett, 2026", musicBy = "Ryan Cornett, 2026", mp3 = null, pdf = null, png = null, video = "youtube.com/RyanC/videos", about = "TBD", forGuitar = false) {
    this.title = title;
    this.link = link;
    this.type = type;
    this.tune = tune;
    this.meter = meter;
    this.wordsBy = wordsBy;
    this.musicBy = musicBy;
    this.mp3 = mp3;
    this.pdf = pdf;
    this.png = png;
    this.video = video;
    this.about = about;
    this.forGuitar = forGuitar;
  }
}

const songs = [
  new Song(
    "A Call Comes Ringing",
    "/songs/a-call-comes-ringing",
    "Hymn",
    "INVITATUS",
    "C.M.D.",
    "Harriet E. Jones, 1908; rev. Ryan Daniel Cornett, 2024",
    "William Walker, 1854; ad. Ryan Daniel Cornett, 2024",
    "https://drive.google.com/file/d/1eL73vcEAw4C1VheD4Ojq4CpY0hotdqBu",
    "https://drive.google.com/file/d/1A1PQfA2VPyN803IKFK1_tTaDC7ksdUaZ",
    "https://drive.google.com/file/d/1RE5a6Pb0IwfXIIyaX1eDrLVloGHDmHbO",
    "https://www.youtube.com/watch?v=8ziDaBk6p74",
    "I found Jones's lyrics and Walker's tune too good not to be heard, and together they make a beautiful hymn. I have made some minor adjustments to the lyrics and tune for modern use, but the original works are still very much intact.",
    true
  ),
  new Song(
    "Abiding in Jesus, the Vine",
    "/songs/abiding-in-jesus-the-vine",
    "Hymn",
    "ABIDING",
    "Irregular",
    "Ryan Cornett, 2026",
    "Ryan Cornett, 2026",
    "https://drive.google.com/file/d/12NRf6ZGZjvO2_-JUijfQczoLu9MajXZp",
    "https://drive.google.com/file/d/1SJSgoave3nC57iW80sBFEjeHIz6p2W-f",
    "https://drive.google.com/file/d/1EJNqRszwwlrffQql3vuYTvhotvMThnOI",
    "youtube.com/RyanC/videos",
    "A hymn for everyday Christian life centered around the believer's dependence upon Christ, drawing on the imagery of the vine and branches to express His sustaining grace through every season and the faithful care of the Vinedresser."
  ),
  new Song(
    "All My Ways Are in Thy Hand",
    "/songs/all-my-ways-are-in-thy-hand",
    "Psalm",
    "QUAERES ME",
    "8.8.8.7 w/ repeat & refrain",
    "The New Metrical Version of the Psalms, 1909; alt.",
    "Ryan Cornett, 2024",
    "https://drive.google.com/file/d/1VnDbDDywBF2LIx_IeIwfVf_CXf0B_H_o",
    "https://drive.google.com/file/d/1MwHup5Z7vSk7RbRtsQ9nEhfJhkWMRApX",
    "https://drive.google.com/file/d/1RHVCKDDCmo6zGhoLyX_8PCkYFPK3NHkN",
    "youtube.com/RyanC/videos",
    "One of my favorite Psalms in meter, it is paired witha memorable style lacking in much of English hymnody: the sea shanty. Fun but reverent, this melody is intended to serve the incredible biblical truths. I made very slight changes to the language for modern use and to fit the meter.",
    true
  ),
  new Song(
    "Christ, Our Abiding Cornerstone",
    "/songs/christ-our-abiding-cornerstone",
    "Hymn",
    "ELLACOMBE",
    "C.M.D.",
    "Ryan Cornett, 2025",
    "Traditional German Melody",
    "https://drive.google.com/file/d/1aY7IWve6yDzyKLZUwMwFscVyesWZPgll",
    "https://drive.google.com/file/d/1QdyOHrJkVaD3yJNmkzu5q-9l3xNN3xjN",
    "https://drive.google.com/file/d/1QY-DImGUDy2GzkQvzGgs7aTUO8TKj1K7",
    "https://www.youtube.com/watch?v=e7CG9k1H_6c",
    "I wrote this text for a men's retreat in October, 2025, shaping the hymn around the three major themes of the retreat: unity, salvation, and sanctification from 1 Corinthians. I selected ELLACOMBE for its strong, jubilant character and familiarity since I wanted as many men as possible ready to sing it.",
    true
  ),
  new Song(
    "Christ, the Prize All Wealth Exceeding",
    "/songs/christ-the-prize-all-wealth-exceeding",
    "Hymn",
    "REDEEMER",
    "8.7.8.7",
    "Ryan Cornett, 2026",
    "Luther O. Emerson, 1863",
    "https://drive.google.com/file/d/1F7ydcJZOafbeyb9237yJXrZif7JPFCXm/view?usp=sharing",
    "https://drive.google.com/file/d/14j3f-eHvtpBuUgz2D3LCxLdkAng4JTxY/view?usp=sharing",
    "https://drive.google.com/file/d/1WuZH0NM0KhurMhRIVUYanSoEB9-bAHHD/view?usp=sharing",
    null,
    "A prayer for contentment, prudence, and gratitude, asking Christ to teach us to value Him in both poverty and plenty and to remember that our true treasure is kept in Heaven."
  ),
  // BELOW ARE PLACEHOLDERS ***** ADD REAL INFORMATION LATER *****
  new Song(
    "Heaven's Filled with Prayers for You",
    "/songs/heavens-filled-with-prayers-for-you",
    "Hymn",
    "HEAVEN'S FILLED",
    "8.6.8.6",
    "Ryan Cornett, 2026",
    "John B. Dykes, 1863",
        null,
        null,
        null,
    null,
    "A prayer for contentment, prudence, and gratitude, asking Christ to teach us to value Him in both poverty and plenty and to remember that our true treasure is kept in Heaven."
  ),
  new Song(
    "His Goodness Will Carry Me",
    "/songs/his-goodness-will-carry-me",
    "Hymn",
    "HIS GOODNESS",
    "8.7.8.7",
    "Ryan Cornett, 2026",
    "Luther O. Emerson, 1863",
    null,
    null,
    null,
    null,
    "A prayer for contentment, prudence, and gratitude, asking Christ to teach us to value Him in both poverty and plenty and to remember that our true treasure is kept in Heaven.",
    true
  ),
  new Song(
    "In Glory Rests a Grand Receipt",
    "/songs/in-glory-rests-a-grand-receipt",
    "Hymn",
    "OSTEND",
    "8.8.8.8",
    "Ryan Cornett, 2026",
    "Luther O. Emerson, 1863",
    null,
    null,
    null,
    null,
    "A prayer for contentment, prudence, and gratitude, asking Christ to teach us to value Him in both poverty and plenty and to remember that our true treasure is kept in Heaven."
  ),
  new Song(
    "In Jesus' Name",
    "/songs/in-jesus-name",
    "Folk Spiritual",
    "IN JESUS' NAME",
    "IRREGULAR",
    "Ryan Cornett, 2026",
    "Luther O. Emerson, 1863",
    null,
    null,
    null,
    null,
    "A prayer for contentment, prudence, and gratitude, asking Christ to teach us to value Him in both poverty and plenty and to remember that our true treasure is kept in Heaven."
  ),
  new Song(
    "Laid Up for Us Is a Crown",
    "/songs/laid-up-for-us-is-a-crown",
    "Hymn",
    "LAID UP FOR US",
    "8.7.8.7",
    "Ryan Cornett, 2026",
    "Luther O. Emerson, 1863",
    null,
    null,
    null,
    null,
    "A prayer for contentment, prudence, and gratitude, asking Christ to teach us to value Him in both poverty and plenty and to remember that our true treasure is kept in Heaven.",
    true
  ),
  new Song(
    "Let Not My Soul Thy Works Forget",
    "/songs/let-not-my-soul-thy-works-forget",
    "Hymn",
    "LET NOT MY SOUL",
    "IRREGULAR",
    "Ryan Cornett, 2026",
    "Luther O. Emerson, 1863",
    null,
    null,
    null,
    null,
    "A prayer for contentment, prudence, and gratitude, asking Christ to teach us to value Him in both poverty and plenty and to remember that our true treasure is kept in Heaven."
  ),
  new Song(
    "Let There Be Light",
    "/songs/let-there-be-light",
    "Hymn",
    "LET THERE BE LIGHT",
    "IRREGULAR",
    "Ryan Cornett, 2026",
    "Luther O. Emerson, 1863",
    null,
    null,
    null,
    null,
    "A prayer for contentment, prudence, and gratitude, asking Christ to teach us to value Him in both poverty and plenty and to remember that our true treasure is kept in Heaven.",
    true
  ),
  new Song(
    "My Days Like Shadows Fade",
    "/songs/my-days-like-shadows-fade",
    "Hymn",
    "MY DAYS LIKE SHADOWS FADE",
    "IRREGULAR",
    "Ryan Cornett, 2026",
    "Luther O. Emerson, 1863",
    null,
    null,
    null,
    null,
    "A prayer for contentment, prudence, and gratitude, asking Christ to teach us to value Him in both poverty and plenty and to remember that our true treasure is kept in Heaven."
  ),
  new Song(
    "My Help and My Hope",
    "/songs/my-help-and-my-hope",
    "Hymn",
    "MY HELP AND MY HOPE",
    "IRREGULAR",
    "Ryan Cornett, 2026",
    "Luther O. Emerson, 1863",
    null,
    null,
    null,
    null,
    "A prayer for contentment, prudence, and gratitude, asking Christ to teach us to value Him in both poverty and plenty and to remember that our true treasure is kept in Heaven.",
    true
  ),
  new Song(
    "O Father of the Found and Freed",
    "/songs/o-father-of-the-found-and-freed",
    "Hymn",
    "O FATHER OF THE FOUND AND FREED",
    "IRREGULAR",
    "Ryan Cornett, 2026",
    "Luther O. Emerson, 1863",
    null,
    null,
    null,
    null,
    "A prayer for contentment, prudence, and gratitude, asking Christ to teach us to value Him in both poverty and plenty and to remember that our true treasure is kept in Heaven."
  ),
  new Song(
    "O God, Arise to Do Your Will",
    "/songs/o-god-arise-to-do-your-will",
    "Hymn",
    "O GOD, ARISE TO DO YOUR WILL",
    "IRREGULAR",
    "Ryan Cornett, 2026",
    "Luther O. Emerson, 1863",
    null,
    null,
    null,
    null,
    "A prayer for contentment, prudence, and gratitude, asking Christ to teach us to value Him in both poverty and plenty and to remember that our true treasure is kept in Heaven."
  ),
  new Song(
    "O Great and Glorious King",
    "/songs/o-great-and-glorious-king",
    "Hymn",
    "O GREAT AND GLORIOUS KING",
    "IRREGULAR",
    "Ryan Cornett, 2026",
    "Luther O. Emerson, 1863",
    null,
    null,
    null,
    null,
    "A prayer for contentment, prudence, and gratitude, asking Christ to teach us to value Him in both poverty and plenty and to remember that our true treasure is kept in Heaven."
  ),
  new Song(
    "O Risen Lord, Once Perished One",
    "/songs/o-risen-lord-once-perished-one",
    "Hymn",
    "O RISEN LORD, ONCE PERISHED ONE",
    "IRREGULAR",
    "Ryan Cornett, 2026",
    "Luther O. Emerson, 1863",
    null,
    null,
    null,
    null,
    "A prayer for contentment, prudence, and gratitude, asking Christ to teach us to value Him in both poverty and plenty and to remember that our true treasure is kept in Heaven."
  ),
  new Song(
    "Rise Up Saints, Raise a Song",
    "/songs/rise-up-saints-raise-a-song",
    "Hymn",
    "RISE UP SAINTS, RAISE A SONG",
    "IRREGULAR",
    "Ryan Cornett, 2026",
    "Luther O. Emerson, 1863",
    null,
    null,
    null,
    null,
    "A prayer for contentment, prudence, and gratitude, asking Christ to teach us to value Him in both poverty and plenty and to remember that our true treasure is kept in Heaven."
  ),
  new Song(
    "The Hands I Nailed to the Cross",
    "/songs/the-hands-i-nailed-to-the-cross",
    "Praise Song",
    "THE HANDS I NAILED TO THE CROSS",
    "IRREGULAR",
    "Ryan Cornett, 2026",
    "Luther O. Emerson, 1863",
    null,
    null,
    null,
    null,
    "A prayer for contentment, prudence, and gratitude, asking Christ to teach us to value Him in both poverty and plenty and to remember that our true treasure is kept in Heaven.",
    true
  ),
  new Song(
    "The Sun Is Sinking",
    "/songs/the-sun-is-sinking",
    "Folk Spiritual",
    "THE SUN IS SINKING",
    "IRREGULAR",
    "Ryan Cornett, 2026",
    "Luther O. Emerson, 1863",
    null,
    null,
    null,
    null,
    "A prayer for contentment, prudence, and gratitude, asking Christ to teach us to value Him in both poverty and plenty and to remember that our true treasure is kept in Heaven."
  ),
  new Song(
    "The Ways of God Are Higher",
    "/songs/the-ways-of-god-are-higher",
    "Folk Spiritual",
    "THE WAYS OF GOD ARE HIGHER",
    "IRREGULAR",
    "Ryan Cornett, 2026",
    "Luther O. Emerson, 1863",
    null,
    null,
    null,
    null,
    "A prayer for contentment, prudence, and gratitude, asking Christ to teach us to value Him in both poverty and plenty and to remember that our true treasure is kept in Heaven.",
    true
  ),
  new Song(
    "To Know Him More",
    "/songs/to-know-him-more",
    "Hymn",
    "TO KNOW HIM MORE",
    "IRREGULAR",
    "Ryan Cornett, 2026",
    "Luther O. Emerson, 1863",
    null,
    null,
    null,
    null,
    "A prayer for contentment, prudence, and gratitude, asking Christ to teach us to value Him in both poverty and plenty and to remember that our true treasure is kept in Heaven."
  ),
  new Song(
    "Welcomed to the Table",
    "/songs/welcomed-to-the-table",
    "Hymn",
    "WELCOMED TO THE TABLE",
    "IRREGULAR",
    "Ryan Cornett, 2026",
    "Luther O. Emerson, 1863",
    null,
    null,
    null,
    null,
    "A prayer for contentment, prudence, and gratitude, asking Christ to teach us to value Him in both poverty and plenty and to remember that our true treasure is kept in Heaven.",
    true
  ),
  new Song(
    "What Vastness the Redeemer Crossed",
    "/songs/what-vastness-the-redeemer-crossed",
    "Hymn",
    "WHAT VASTNESS THE REDEEMER CROSSED",
    "IRREGULAR",
    "Ryan Cornett, 2026",
    "Luther O. Emerson, 1863",
    null,
    null,
    null,
    null,
    "A prayer for contentment, prudence, and gratitude, asking Christ to teach us to value Him in both poverty and plenty and to remember that our true treasure is kept in Heaven.",
    true
  ),
  new Song(
    "When the Risen Christ Ascended",
    "/songs/when-the-risen-christ-ascended",
    "Hymn",
    "WHEN THE RISEN CHRIST ASCENDED",
    "IRREGULAR",
    "Ryan Cornett, 2026",
    "Luther O. Emerson, 1863",
    null,
    null,
    null,
    null,
    "A prayer for contentment, prudence, and gratitude, asking Christ to teach us to value Him in both poverty and plenty and to remember that our true treasure is kept in Heaven."
  ),
  new Song(
    "As the Lord Lives",
    "/songs/as-the-lord-lives",
    "Praise Song",
    null,
    null,
    "Ryan Cornett, 2026",
    "Luther O. Emerson, 1863",
    null,
    null,
    null,
    null,
    "A prayer for contentment, prudence, and gratitude, asking Christ to teach us to value Him in both poverty and plenty and to remember that our true treasure is kept in Heaven.",
    true
  ),
  new Song(
    "Awake, My Soul (Warrior King)",
    "/songs/awake-my-soul-warrior-king",
    "Praise Song",
    null,
    null,
    "Ryan Cornett, 2026",
    "Luther O. Emerson, 1863",
    null,
    null,
    null,
    null,
    "A prayer for contentment, prudence, and gratitude, asking Christ to teach us to value Him in both poverty and plenty and to remember that our true treasure is kept in Heaven.",
    true
  ),
  new Song(
    "Forgotten in the Sea",
    "/songs/forgotten-in-the-sea",
    "Kids/VBS Song",
    null,
    null,
    "Ryan Cornett, 2026",
    "Luther O. Emerson, 1863",
    null,
    null,
    null,
    null,
    "A prayer for contentment, prudence, and gratitude, asking Christ to teach us to value Him in both poverty and plenty and to remember that our true treasure is kept in Heaven.",
    true
  ),
  new Song(
    "From the Depths",
    "/songs/from-the-depths",
    "Hymn",
    null,
    null,
    "Ryan Cornett, 2026",
    "Luther O. Emerson, 1863",
    null,
    null,
    null,
    null,
    "A prayer for contentment, prudence, and gratitude, asking Christ to teach us to value Him in both poverty and plenty and to remember that our true treasure is kept in Heaven.",
    true
  ),
  new Song(
    "His Love Endures",
    "/songs/his-love-endures",
    "Praise Song",
    null,
    null,
    "Ryan Cornett, 2026",
    "Luther O. Emerson, 1863",
    null,
    null,
    null,
    null,
    "A prayer for contentment, prudence, and gratitude, asking Christ to teach us to value Him in both poverty and plenty and to remember that our true treasure is kept in Heaven.",
    true
  ),
  new Song(
    "I Will Rest",
    "/songs/i-will-rest",
    "Praise Song",
    null,
    null,
    "Ryan Cornett, 2026",
    "Luther O. Emerson, 1863",
    null,
    null,
    null,
    null,
    "A prayer for contentment, prudence, and gratitude, asking Christ to teach us to value Him in both poverty and plenty and to remember that our true treasure is kept in Heaven.",
    true
  ),
  new Song(
    "My Hope Is Found in This",
    "/songs/my-hope-is-found-in-this",
    "Praise Song",
    null,
    null,
    "Ryan Cornett, 2026",
    "Luther O. Emerson, 1863",
    null,
    null,
    null,
    null,
    "A prayer for contentment, prudence, and gratitude, asking Christ to teach us to value Him in both poverty and plenty and to remember that our true treasure is kept in Heaven.",
    true
  )
];

const songsContainer = document.getElementById("songs-container");
if (songsContainer) {
    songs.forEach(song => {
        const songElement = document.createElement("div");
        songElement.classList.add("song");
        const link = document.createElement("a");
        if (song.pdf !== null) { link.href = song.link; }
        else { link.href = "#"; }
        link.textContent = song.title;
        songElement.appendChild(link);
        const type = document.createElement("span");
        type.classList.add("song-chip");
        type.textContent = song.type;
        songElement.appendChild(type);
        if (song.forGuitar) {
          const guitarFriendly = document.createElement("p");
          guitarFriendly.classList.add("accent-light");
          guitarFriendly.textContent = "Guitar-friendly";
          songElement.appendChild(guitarFriendly);
        }
        songsContainer.appendChild(songElement);
    });
}

const projects = [
    {
        "title": "19point9",
        "subtitle": "A game to test your timing skills",
        "link": "https://19point9.com/",
        "desc": "Tap (mouse click or space bar) as close to the target times as possible. Can you tap close enough to the targets for a delta less than one second? If so, you've got skills!"
    },
    {
        "title": "The Baptist Hymnal",
        "subtitle": "(In Progress) Freely given, public domain hymns and psalms",
        "link": "https://baptisthymnal.org",
        "desc": "\"The goal of BaptistHymnal.org is simple: to provide public domain hymns & psalms for use in Jesus Christ's churches and believer's homes. We strongly believe that the materials to accomplish that should be free, in the public domain, and easily accessible.\""
    },
    {
        "title": "BSB Audio on Youtube",
        "subtitle": "Listen to the Berean Standard Bible by chapter and book with YouTube podcasts",
        "link": "https://youtube.com/@BSBAudioBible/podcasts",
        "desc": "Listen to the Berean Standard Bible (BSB) by chapter and book with YouTube podcasts. Your spot is saved on your desired mobile device so you can pick back up right where you left off. You can also download for offline listening."
    },
    {
        "title": "Custom Bible Plan",
        "subtitle": "Create your very own Bible reading plan",
        "link": "https://custombibleplan.com",
        "desc": "Choose your plan name, start date, end date, what days of the week you want to read, the time of day you want to be alerted, and the books of the Bible you want to read in your desired order. Pick from printed, CSV, and iCal formats (I use iCal and import to my Google calendar)."
    },
    {
        "title": "Dot Dot Node",
        "subtitle": "A daily strategy puzzle game",
        "link": "https://dotdotnode.com/",
        "desc": "Goal: fill every node with dots. But be careful! You can fill in only one direction at a time. You win if every node has a dot, but try to to do it with the lowest time and without assists."
    },
    {
        "title": "Gridle",
        "subtitle": "A daily logic puzzle grid game",
        "link": "https://gridlegame.com",
        "desc": "Guess the secret 5x5 layout in 6 attempts. Edge numbers show how many blocks are in that line except for one hidden row and one hidden column (marked with a \"?\"). Toggle squares purple, then Submit your guess."
    },
    {
        "title": "KR4BJN",
        "subtitle": "My amateur radio station site",
        "link": "https://kr4bjn.com",
        "desc": "I made a fun little page that I hope inspires others to pick up the hobby! Here you can see what I like to do on the air, how I get on the air, the ARRL transmission schedule, Parks on the Air (POTA) activations in my region, and current band conditions. I also built a practice oscillator so you can try out Morse code!"
    },
    {
        "title": "Lofi Bible",
        "subtitle": "Bible text and audio with background music",
        "link": "https://lofi.bible",
        "desc": "Read and listen to the BSB or KJV audio Bible with background lofi chill beats and/or lofi \"hymns.\" This was one of the first big hobby projects I finished and the first to garner a donation. (Thanks, Logan!)"
    },
    {
        "title": "Manchester Baptist Church",
        "subtitle": "My church!",
        "link": "https://manchesterbaptist.church",
        "desc": "I was blessed to be able to make this a few years ago, thus getting us away from the Wordpress CMS (too expensive and unnecessary for our small church). I have learned a lot since then and look forward to making an even better site."
    },
    {
        "title": "Read BSB",
        "subtitle": "A simple BSB reader",
        "link": "https://readbsb.com",
        "desc": "A minimal Berean Standard Bible reader focused on providing a clean, inviting, and distraction-free user experience presented without advertisements & freely given in perpetuity."
    }
];

const projectList = document.querySelector(".project-list");

function populateProjects() {
    if (projectList === null) { return };
    projects.forEach(project => {
        const item = document.createElement('div');
        const title = document.createElement('h3');
        title.textContent = project.title;
        item.appendChild(title);
        const link = document.createElement('a');
        link.classList.add('project-link');
        link.textContent = project.link;
        link.href = project.link;
        link.target = "_blank";
        item.appendChild(link);
        const subtitle = document.createElement('h4');
        subtitle.textContent = project.subtitle;
        item.appendChild(subtitle);
        const desc = document.createElement('p');
        desc.textContent = project.desc;
        item.appendChild(desc);
        projectList.appendChild(item);
    });
}

populateProjects();

const socials = document.querySelector('.socials');

socials.innerHTML = `
                    <a href="https://x.com/ryancornettky" target="_blank" rel="noopener noreferrer" aria-label="Follow me on X (formerly Twitter)" title="Follow me on X (formerly Twitter)">
                        <sl-icon name="twitter-x"></sl-icon>
                    </a>
                    <a href="https://www.youtube.com/@RyanCornett" target="_blank" rel="noopener noreferrer" aria-label="Subscribe to my YouTube channel" title="Subscribe to my YouTube channel">
                        <sl-icon name="youtube"></sl-icon>
                    </a>
                    <a href="https://github.com/ryancornett" target="_blank" rel="noopener noreferrer" aria-label="Find me on GitHub" title="Find me on GitHub">
                        <sl-icon name="github"></sl-icon>
                    </a>
                    <a href="https://discordapp.com/users/milestretch" target="_blank" rel="noopener noreferrer" aria-label="Find me on Discord" title="Find me on Discord">
                        <sl-icon name="discord"></sl-icon>
                    </a>
                    <a href="https://pota.app/#/profile/KR4BJN" target="_blank" rel="noopener noreferrer" aria-label="See my Parks on the Air amateur radio activity" title="See my Parks on the Air amateur radio activity">
                        <sl-icon name="broadcast-pin"></sl-icon>
                    </a>
                    <a href="https://ko-fi.com/ryancornett" target="_blank" rel="noopener noreferrer" aria-label="Support me on Ko-Fi" title="Support me on Ko-Fi">
                        <sl-icon name="cup-hot"></sl-icon>
                    </a>
                    <a href="mailto:contact@ryancornett.com" aria-label="Email me" title="Email me">
                        <sl-icon name="envelope"></sl-icon>
                    </a>`;


(function () {
  const READY = 'DOMContentLoaded';
  if (document.readyState === 'loading') document.addEventListener(READY, init);
  else init();

  function init() {
    // render all cards
    document.querySelectorAll('.yt-card').forEach(renderCard);
    // create modal once
    ensureModal();
    // delegate clicks
    document.addEventListener('click', onClick);
  }

  function renderCard(el) {
    const id = el.dataset.ytid;
    const title = el.dataset.title || 'Video';
    const thumb = el.dataset.thumb || `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    const caption = el.dataset.caption;

    const btn = document.createElement('button');
    btn.className = 'yt-open';
    btn.type = 'button';
    btn.setAttribute('aria-label', `Play video: ${title}`);
    btn.dataset.ytid = id;
    btn.dataset.title = title;

    const img = document.createElement('img');
    img.src = thumb;
    img.alt = `Video thumbnail: ${title}`;
    img.loading = 'lazy';
    img.classList.add("yt-thumb");

    const play = document.createElement('span');
    play.className = 'yt-play';
    play.setAttribute('aria-hidden', 'true');
    play.innerHTML = `<svg viewBox="0 0 60 60" width="60" height="60">
        <circle cx="30" cy="30" r="28" fill="rgba(0,0,0,0.6)"/>
        <polygon points="24,18 24,42 44,30" fill="#fff"/>
      </svg>`;

    btn.append(img, play);
    el.innerHTML = ''; // clear existing
    el.append(btn);

    if (caption) {
      const cap = document.createElement('div');
      cap.className = 'yt-caption';
      cap.textContent = caption;
      el.append(cap);
    }
  }

  function ensureModal() {
    if (document.getElementById('ytModal')) return;
    const modal = document.createElement('div');
    modal.className = 'yt-modal';
    modal.id = 'ytModal';
    modal.hidden = true;
    modal.innerHTML = `
      <div class="yt-backdrop" data-close></div>
      <div class="yt-dialog" role="dialog" aria-modal="true" aria-label="Video player">
        <button class="yt-close" type="button" aria-label="Close video" data-close>✕</button>
        <div class="yt-frame" id="ytFrame"></div>
      </div>`;
    document.body.appendChild(modal);
  }

  function onClick(e) {
    // open
    const btn = e.target.closest('.yt-open');
    if (btn) {
      openVideo(btn.dataset.ytid, btn.dataset.title, btn);
      return;
    }
    // close
    if (e.target.matches('[data-close]')) {
      closeVideo();
    }
  }

  let lastTrigger = null;

  function embedUrl(id) {
    return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
  }

  function openVideo(id, title, triggerEl) {
    lastTrigger = triggerEl || null;
    const frameWrap = document.getElementById('ytFrame');
    frameWrap.innerHTML =
      `<iframe src="${embedUrl(id)}"
               allow="autoplay; encrypted-media; picture-in-picture"
               allowfullscreen
               title="${title || 'Video'}"></iframe>`;

    const modal = document.getElementById('ytModal');
    modal.hidden = false;
    modal.querySelector('.yt-close').focus();

    document.addEventListener('keydown', onKeydown);
  }

  function closeVideo() {
    const modal = document.getElementById('ytModal');
    const frameWrap = document.getElementById('ytFrame');
    modal.hidden = true;
    frameWrap.innerHTML = ''; // stops playback
    document.removeEventListener('keydown', onKeydown);
    if (lastTrigger) lastTrigger.focus();
  }

  function onKeydown(e) {
    if (e.key === 'Escape') closeVideo();

    // simple focus trap
    if (e.key === 'Tab') {
      const modal = document.getElementById('ytModal');
      const focusables = modal.querySelectorAll('button,[href],[tabindex]:not([tabindex="-1"])');
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
    }
  }
})();

const topButton = document.getElementById('to-top');

function displayTopButton() {
    if (window.scrollY >= 650) {
        topButton.classList.add('visible');
    } else {
        topButton.classList.remove('visible');
    }
}

document.addEventListener('scroll', displayTopButton);

const hero = document.querySelector("#hero");

let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      hero.style.backgroundPosition =
        `center calc(50% + ${window.scrollY * 0.35}px)`;

      ticking = false;
    });

    ticking = true;
  }
});