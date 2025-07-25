const projects = [
    {
        "title": "21st Century Baptist Catechism",
        "subtitle": "In Progress",
        "link": "https://thebaptistcatechism.org",
        "desc": "The historic 1695 Baptist Catechism with updated language and resources such as children's songs, coloring sheets, and more."
    },
    {
        "title": "Background Bible",
        "subtitle": "(In Progress) Bible text and audio, ambient sounds, music",
        "link": "https://backgroundbible.com",
        "desc": "Read and listen to the BSB or KJV audio Bible with background sounds like city rain, autumn leaves, lofi tracks, classical music, and more!"
    },
    {
        "title": "The Baptist Hymnal",
        "subtitle": "(In Progress) Freely given, public domain hymns and psalms",
        "link": "https://baptisthymnal.org",
        "desc": "\"The goal of BaptistHymnal.org is simple: to provide public domain hymns & psalms for use in Jesus Christ's churches and believer's homes. We strongly believe that the materials to accomplish that should be free, in the public domain, and easily accessible.\""
    },
    {
        "title": "Bible & Song",
        "subtitle": "Ongoing with new songs every month",
        "link": "https://bibleandsong.com",
        "desc": "Freely given memory verse songs created for kids, but adults love them too! We use the Berean Standard Bible (BSB), and will attempt to accommodate requests for specific verses to be put to music."
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
        "title": "KR4BJN",
        "subtitle": "My amateur radio station site",
        "link": "https://kr4bjn.com",
        "desc": "I made a fun little page that I hope inspires others to pick up the hobby! Here you can see what I like to do on the air, how I get on the air, the ARRL transmission schedule, Parks on the Air (POTA) activations in my region, and current band conditions. I also built a practice oscillator so you can try out Morse code!"
    },
    {
        "title": "Lofi Bible",
        "subtitle": "Bible text and audio with background music",
        "link": "https://https://lofi.bible",
        "desc": "Read and listen to the BSB or KJV audio Bible with background lofi chill beats and/or lofi \"hymns.\" This was one of the first big hobby projects I finished and the first to garner a donation. (Thanks, Logan!)"
    },
    {
        "title": "Particular Baptist Publications",
        "subtitle": "In Progress",
        "link": "https://pbpublications.org",
        "desc": "I'm excited to be working on the website for PBP, which is dedicated to preserving and retrieving the works of our 17th and 18th century Baptist forefathers. The currently available libraries cover 1) Baptism, 2) Covenant Theology, 3) Congregationalism, and 4) Liturgy & Worship."
    },
    {
        "title": "Manchester Baptist Church",
        "subtitle": "My church!",
        "link": "https://manchesterbaptist.church",
        "desc": "I was blessed to be able to make this a few years ago, thus getting us away from the Wordpress CMS (too expensive and unnecessary for our small church). I have learned a lot since then and look forward to making an even better site."
    },
    {
        "title": "Saint & Assembly",
        "subtitle": "In Progress",
        "link": "https://saintandassembly.com",
        "desc": "The goal of Saint & Assembly is to promote biblically robust and freely given music for the church and private worship, and to encourage and facilitate the sharing of talent and resources to build an exceptional library of God-honoring songs free in perpetuity."
    }
];

const projectList = document.querySelector(".project-list");

function populateProjects() {
    projects.forEach(project => {
        const item = document.createElement('div');
        const title = document.createElement('h3');
        title.textContent = project.title;
        item.appendChild(title);
        link = document.createElement('a');
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