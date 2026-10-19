class AccompanimentTrack {
  constructor(instrument, url, notes = null) {
    this.instrument = instrument;
    this.url = url;
    this.notes = notes;
  }
}

class Arrangement {
  constructor(label, key, timeSignature = null, modulation = null, format = "SATB", pdf = null, chordChart = null, png = null, accompanimentTracks = []) {
    this.label = label;
    this.key = key;
    this.timeSignature = timeSignature;
    this.modulation = modulation;
    this.format = format;
    this.pdf = pdf;
    this.chordChart = chordChart;
    this.png = png;
    this.accompanimentTracks = accompanimentTracks;
  }
}

class StreamingLink {
  constructor(platform, url, albumArt = null) {
    this.platform = platform;
    this.url = url;
    this.albumArt = albumArt;
  }
}

class SongMetadata {
  constructor(type = "Hymn", tune = null, meter = null, wordsBy = "Ryan Cornett, 2026", musicBy = "Ryan Cornett, 2026") {
    this.type = type;
    this.tune = tune;
    this.meter = meter;
    this.wordsBy = wordsBy;
    this.musicBy = musicBy;
  }
}

class HelpfulSongInfo {
  constructor(about = null, themes = [], scriptureReferences = [], yearWritten = 2026, lyricVideoUrl = null, playableOnGuitar = false) {
    this.about = about;
    this.themes = themes;
    this.scriptureReferences = scriptureReferences;
    this.yearWritten = yearWritten;
    this.lyricVideoUrl = lyricVideoUrl;
    this.playableOnGuitar = playableOnGuitar;
  } 
}

class Song {
  constructor(title, id, slug, demo_mp3 = null, songMetadata = new SongMetadata(), lyrics = [], arrangements = [], streamingLinks = [], helpfulSongInfo = new HelpfulSongInfo()) {
    this.title = title;
    this.id = id;
    this.slug = slug;
    this.demo_mp3 = demo_mp3;
    this.songMetadata = songMetadata;
    this.lyrics = lyrics;
    this.arrangements = arrangements;
    this.streamingLinks = streamingLinks;
    this.helpfulSongInfo = helpfulSongInfo;
  }
}

const songsNotReady = [
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
  )
]

const songs = [
  new Song(
    "Abiding in Jesus, the Vine",
    103, 
    "abiding-in-jesus-the-vine",
    "https://drive.google.com/file/d/1yA-gmT7amTm0DWhHyy0dfttOgGAjIGJA",
    new SongMetadata("Hymn", "ABIDING", "Irregular", "Ryan Cornett", "Ryan Cornett"),
    [
        {
            type: "stanza",
            number: 1,
            lines: [
                "In Jesus, the Vine, abiding,",
                "My soul finds its dearest place;",
                "The Spirit, within residing,",
                "I'm growing in gifts of grace."
            ],
            type: "refrain",
            number: 1,
            lines: [
                "In Jesus, the Vine, in Jesus, the Vine,",
                "In Jesus, the Vine, abiding;",
                "Sustained by the Root, and bearing the Fruit,",
                "Abiding in Jesus, the Vine."
            ],
            type: "stanza",
            number: 2,
            lines: [
                "Though pestilence, drought, diseases,",
                "And deep winter tarry fierce,",
                "The Vinedresser, my heart, pleases",
                "When His tending hand appears."
            ],
            type: "stanza",
            number: 3,
            lines: [
                "In Him, my supply, remaining,",
                "His light on me ever shines;",
                "The flow from the Root, sustaining,",
                "Exceeds earth's deceitful vines."
            ],
            type: "stanza",
            number: 4,
            lines: [
                "The Lord of the plenteous harvest,",
                "In His vineyard now, I dwell;",
                "Engrafted, I flourish, far blest",
                "Beyond every song could tell."
            ],

        }
    ],
    new Arrangement("SATB", "E flat major", "6/8", null, "SATB", "https://drive.google.com/file/d/1SJSgoave3nC57iW80sBFEjeHIz6p2W-f", null, "https://drive.google.com/file/d/1EJNqRszwwlrffQql3vuYTvhotvMThnOI", accompanimentTracks = null),
    streamingLinks = [null],
    new HelpfulSongInfo("A hymn for everyday Christian life centered around the believer's dependence upon Christ, drawing on the imagery of the vine and branches to express His sustaining grace through every season and the faithful care of the Vinedresser.", ["union with Christ", "abiding", "spiritual growth", "perseverance"], ["John 15:1-8", "Galatians 5:22-23", "Romans 11:17"], 2026, lyricVideoUrl = null, false)
  ),
  
  new Song(
    "All My Ways Are in Thy Hand",
    104,
    "all-my-ways-are-in-thy-hand",
    "https://drive.google.com/file/d/1LfWc1D4LfMgZZHVLJUauxH2fxzazn77A",
    new SongMetadata("Psalm", "QUAERES ME", "8.8.8.7. w/ repeat and refrain", "The New Metrical Version of the Psalms, 1909; alt.", "Ryan Cornett"),
    [
      {
        type: "refrain",
        number: 1,
        lines: [
          "LORD, Thou hast searched me, and dost know",
          "where'er I rest, where'er I go;",
          "Thou knowest all that I have planned,",
          "All my ways are in Thy hand,",
          "All my ways are in Thy hand."
        ]
      },
      {
        type: "stanza",
        number: 1,
        lines: [
          "My words from Thee I cannot hide,",
          "I feel Thy pow'r on ev'ry side;",
          "O wondrous knowledge, awesome might,",
          "Plumbless depth, unmeasured height!",
          "Plumbless depth, unmeasured height!"
        ]
      },
      {
        type: "stanza",
        number: 2,
        lines: [
          "Where can I go apart from Thee,",
          "Or whither from Thy presence flee?",
          "In heav'n? it is Thy dwelling fair;",
          "Death's abode? lo, Thou art there,",
          "Death's abode? lo, Thou art there."
        ]
      },
      {
        type: "stanza",
        number: 3,
        lines: [
          "If I the wings of morning take,",
          "And far away my dwelling make,",
          "The hand that leadeth me is Thine,",
          "My support, Thy pow'r divine,",
          "My support, Thy pow'r divine."
        ]
      },
      {
        type: "stanza",
        number: 4,
        lines: [
          "If darkest night shouldst cover me,",
          "The darkness hideth not from Thee;",
          "To Thee both night and day are bright,",
          "Darkness shineth as the light,",
          "Darkness shineth as the light."
        ]
      }
    ],
    [
      new Arrangement("SATB", "E major", "4/4", null, "SATB", "https://drive.google.com/file/d/1MwHup5Z7vSk7RbRtsQ9nEhfJhkWMRApX", null, "https://drive.google.com/file/d/1RHVCKDDCmo6zGhoLyX_8PCkYFPK3NHkN", accompanimentTracks = [null])
    ],
    streamingLinks = [null],
    new HelpfulSongInfo("A metrical treatment of Psalm 139 celebrating God's knowledge, presence, and guiding hand.", ["omniscience", "omnipresence", "providence", "guidance"], ["Psalm 139:1-12"], 2024, lyricVideoUrl = null, true)
  ),
  
  new Song(
    "Christ, Our Abiding Cornerstone",
    107,
    "christ-our-abiding-cornerstone",
    "https://drive.google.com/file/d/1Nm8wNVbmhDJwjiHwXgYy_-cy2VRAQSuW",
    new SongMetadata("Hymn", "ELLACOMBE", "C.M.D.", "Ryan Cornett", "Traditional German Melody"),
    [
      {
        type: "stanza",
        number: 1,
        lines: [
          "Christ, our abiding Cornerstone,",
          "Passover Lamb once slain,",
          "His blood has drowned what sin had sown,",
          "In righteous, crimson rain.",
          "Death has no vict'ry nor a sting,",
          "Hushed is the Law's fierce roar;",
          "Ours is the triumph by the King",
          "Who reigns forevermore."
        ]
      },
      {
        type: "stanza",
        number: 2,
        lines: [
          "Christ, our abiding Cornerstone,",
          "Upon the sinking sand,",
          "Fits us to rest before His throne,",
          "On earth, to firmly stand.",
          "By holy flame, as gold refined,",
          "He burns away the dross;",
          "His chosen treasure He has mined,",
          "Unearthed upon the cross."
        ]
      },
      {
        type: "stanza",
        number: 3,
        lines: [
          "Christ, our abiding Cornerstone,",
          "Our blessed cup and bread,",
          "Into one Body binds His own,",
          "Crowned hence is He, the Head.",
          "Stone laid on stone, our Lord will build,",
          "His Spirit will abide;",
          "God's house, in covenant, is sealed,",
          "His temple, unified."
        ]
      },
      {
        type: "stanza",
        number: 4,
        lines: [
          "Christ, our abiding Cornerstone",
          "In whom all worth is found,",
          "May voices raised to make Him known",
          "Through every land resound:",
          "\"As stars by Your decree burn bright",
          "And summer flow'rs You dress,",
          "O make Your Church a tow'ring light",
          "Adorned with righteousness.\""
        ]
      }
    ],
    [
    new Arrangement("SATB", "A major", "4/4", null, "SATB", "https://drive.google.com/file/d/1QdyOHrJkVaD3yJNmkzu5q-9l3xNN3xjN", null, "https://drive.google.com/file/d/1QY-DImGUDy2GzkQvzGgs7aTUO8TKj1K7", accompanimentTracks = [null])
    ],
    streamingLinks = [
      new StreamingLink("YouTube", "https://music.youtube.com/watch?v=e7CG9k1H_6c&si=sEqVVcUHlGp98DQn", albumArt = null)
    ],
    new HelpfulSongInfo("I wrote this text for a men's retreat, shaping the hymn around the three major themes of the retreat: unity, salvation, and sanctification from 1 Corinthians. I selected ELLACOMBE for its strong, jubilant character and familiarity since I wanted as many men as possible ready to sing it.", ["unity", "salvation", "sanctification"], ["1 Corinthians 5:7", "1 Corinthians 15:3-4 & 55-57", "Romans 5:9", "Isaiah 53:5", "1 Corinthians 3:11-15", "1 Corinthians 6:19-20", "James 1:12", "Malachi 3:2-3", "1 Peter 1:6-7", "1 Corinthians 10:16-17", "1 Corinthians 11:3", "1 Corinthians 12:12-13", "Ephesians 2:20-22", "1 Peter 2:4-5", "1 Corinthians 1:30-31", "Matthew 5:14-16", "Philippians 2:15", "Isaiah 61:10"], 2025, lyricVideoUrl = "https://youtu.be/e7CG9k1H_6c?si=Nb2LcntF9vFHP691", playableOnGuitar = true)
  ),
  
  new Song(
    "Christ, the Prize All Wealth Exceeding",
    "/songs/christ-the-prize-all-wealth-exceeding",
    "Hymn",
    "REDEEMER",
    "8.7.8.7",
    [
      {
        type: "stanza",
        number: 1,
        lines: [
          "Christ, the prize all wealth exceeding,",
          "Treasure of the Father's blest,",
          "Hear my lonely, midnight pleading",
          "That in Your supply I'll rest.",
        ]
      },
      {
        type: "stanza",
        number: 2,
        lines: [
          "Needful or abounding, teach me",
          "To find joy in all Your ways;",
          "Both in poverty and plenty,",
          "May my tongue sustain Your praise.",
        ]
      },
      {
        type: "stanza",
        number: 3,
        lines: [
          "Train me ever to be prudent,",
          "Greed and rashness to exclude;",
          "May I linger as Your student",
          "In the course of gratitude.",
        ]
      },
      {
        type: "stanza",
        number: 4,
        lines: [
          "Oh, the wealth of this believer",
          "Dwells above in Heaven fair;",
          "Though bereft of gold and silver,",
          "I am rich beyond compare.",
        ]
      },
      {
        type: "stanza",
        number: 5,
        lines: [
          "Let me, Your provision heeding,",
          "Grasp no good but Glory's strand;",
          "Christ, the prize all wealth exceeding,",
          "All I have is from Your hand.",
        ]
      }
    ],
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
    "His Goodness Will Carry Me",
    "/songs/his-goodness-will-carry-me",
    "Hymn",
    "HIS GOODNESS",
    [
      {
        type: "stanza",
        number: 1,
        lines: [
          "When peace appears like morning's glow,",
          "Or worry's evening tempests grow,",
          "God's grace remains in height or low,",
          "Whatever my lot may be.",
          "How dear this truth: my God is good;",
          "It stands as it has ever stood,",
          "And so I answer as I should:",
          "His goodness will carry me.",
        ]
      },
      {
        type: "stanza",
        number: 2,
        lines: [
          "Though gold and harvest multiply,",
          "Or broken cisterns leave me dry,",
          "On earthly bread I'll not rely,",
          "But Christ will my portion be.",
          "When thorns obscure this path I tread,",
          "'Tis there blood drops are glist'ning red;",
          "I'll follow where my Lord has led,",
          "His goodness will carry me.",
        ]
      },
      {
        type: "stanza",
        number: 3,
        lines: [
          "If favor fills my days with song,",
          "Or failing flesh makes night seem long,",
          "My fleeting frames to God belong,",
          "Each heartbeat, by His decree.",
          "My life a mist, a passing haze,",
          "But God, for ever and always,",
          "Will live and reign, thus I shall praise",
          "His goodness that carries me.",
        ]
      },
      {
        type: "stanza",
        number: 4,
        lines: [
          "When God requires my breath returned,",
          "This cherished jewel of truth, I've learned:",
          "I'll bask in light of love unearned",
          "For all of eternity.",
          "How dear this truth: my God is good;",
          "It stands as it has ever stood,",
          "And so I'll answer as I should:",
          "His goodness has carried me.",
        ]
      }
    ],
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
    [
      {
        type: "stanza",
        number: 1,
        lines: [
          "In Glory rests a grand receipt",
          "For rendered grace below;",
          "Christ stooped where love and justice meet,",
          "And bore His Father's blow.",
          "Yes, while I scorning, scoffing rude",
          "Condemned God's only Son,",
          "He paid the price my sins accrued,",
          "And saw their claim undone.",
        ]
      },
      {
        type: "stanza",
        number: 2,
        lines: [
          "'Twas for the debt I sinned to buy,",
          "Ink crimson on my page;",
          "The death disbursed was mine to die,",
          "His life earned not that wage.",
          "Yet I, when in this pauper's state,",
          "With nothing in my purse,",
          "Received the gold of countless weight",
          "That dispossessed the curse.",
        ]
      },
      {
        type: "stanza",
        number: 3,
        lines: [
          "My balance, stood in deficit",
          "All toil could not requite,",
          "Hark now, the Righteous Judge's writ:",
          "\"My Son has set it right.\"",
          "Behold the One of matchless worth:",
          "The cross His mercy proved;",
          "The Son redeeming sons of earth,",
          "Their every charge, removed.",
        ]
      },
      {
        type: "stanza",
        number: 4,
        lines: [
          "My soul, once scarlet, yet from hence",
          "Wears robes more white than wool,",
          "For lo, the blood of recompense",
          "Has paid the bill in full.",
          "Christ's payment settled all indeed:",
          "This debtor need not fear;",
          "The ledger evermore will read",
          "That my account is clear.",
        ]
      },
      {
        type: "stanza",
        number: 5,
        lines: [
          "No terms lie on that proof of sale,",
          "No dues, its records mar;",
          "But printed there by Calv'ry's nail",
          "Is love's enduring scar.",
          "Of God I loose my tongue to boast,",
          "What seal of grace divine!",
          "Salvation to the uttermost!",
          "Such pardon now is mine.",
        ]
      }
    ],
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
    [
      {
        type: "stanza",
        number: 1,
        lines: [
          "\"Let there be light,\" the Maker speaks,",
          "And darkness flies away.",
          "The morn is new as grace descends,",
          "Benighted heart sees day;",
          "What gladness fills the joyful eye",
          "As dawn of mercy breaks;",
          "From deathly slumber unto life,",
          "The ransomed soul awakes.",
        ]
      },
      {
        type: "stanza",
        number: 2,
        lines: [
          "The oil burned in heaven's lamp",
          "That cut through sin's thick night",
          "Flowed freely from the Savior's veins,",
          "Himself, the wick alight;",
          "There, trimmed and soaked, the off'ring lit",
          "By heat of holy wrath—",
          "The perfect sacrifice aflame—",
          "Revealed the righteous path.",
        ]
      },
      {
        type: "stanza",
        number: 3,
        lines: [
          "Upon that visage few may find,",
          "The born-again shall gaze;",
          "Once lost and darksome, gleaming bright,",
          "Beheld for endless days;",
          "So blazes Life amidst the gloom,",
          "For Christ in radiance beamed;",
          "From darkness, light shall ever shine",
          "On all who stand redeemed.",
        ]
      }
    ],
    null,
    null,
    null,
    null,
    "A prayer for contentment, prudence, and gratitude, asking Christ to teach us to value Him in both poverty and plenty and to remember that our true treasure is kept in Heaven.",
    true
  ),
  
  new Song(
    "My Help and My Hope",
    119,
    "my-help-and-my-hope",
    "https://drive.google.com/file/d/1uCpLy0BiyreQHwslRad6bCoF4mfTDDWH",
    new SongMetadata("Hymn", "LYDIA KATHERINE", "10.10.10.10.D.", "Ryan Daniel Cornett", "Ryan Daniel Cornett"),
    [
      {
        type: "stanza",
        number: 1,
        lines: [
          "My help and my hope, beyond me yet near,",
          "To this bruised reed come incline now Your ear;",
          "How brief are the days You filled up for me,",
          "Poured out like water, a drop in the sea.",
          "Yet my voice You hear, my cry You attend,",
          "Your fresh mercies bloom each morn without end;",
          "What gardens of joy! What fountains of peace!",
          "Your aid shall not fail, Your grace never cease."
        ],
      },
      {
        type: "stanza",
        number: 2,
        lines: [
          "O Salvation, rise! My Ark on the wave",
          "When floods of sin would sink me to the grave;",
          "The darkness draws near, the clouds hasten night;",
          "May my eyes feast upon Your dawning light.",
          "If not for the Vine, felled that I be whole",
          "The thorn of the curse would cut through my soul;",
          "What favor abounds! What riches supplied",
          "From storehouses grand, by arms open wide."
        ]
      },
      {
        type: "stanza",
        number: 3,
        lines: [
          "In once barren ground Your Spirit took root;",
          "May this branch bow, heavy laden with fruit;",
          "Now grafted to grow, come prune me to bear;",
          "In Christ abiding, upheld by Your care.",
          "To stranger and kin will I testify",
          "Till unto the fields of Glory I fly,",
          "That You hear and have regarded my plea;",
          "My help and my hope, You ever will be."
        ]
      }
    ],
    new Arrangement("SATB", "D major", "3/4", null, "SATB", "https://drive.google.com/file/d/1z1G2To6h64UH1C9xIHNet5Enb1iaP3IP", null, "https://drive.google.com/file/d/1zf9LvIviYRiuSc9wAKGsbwpbo7J5J-Vp/view?usp=sharing", accompanimentTracks = [null],
    new StreamingLink("YouTube", "https://www.youtube.com/watch?v=0g1k5J6X7xM", albumArt = null),
    new HelpfulSongInfo("A prayer for enduring mercy, salvation, spiritual fruitfulness, and faithful witness.", ["hope", "divine help", "salvation", "abiding", "witness"], ["Psalm 103:15-17", "Lamentations 3:22-23", "Isaiah 58:11", "Psalm 32:6-7", "1 Peter 3:20-21", "John 15:1-5", "Isaiah 35:1-2", "John 15:2-5", "Psalm 66:16"], 2022, lyricVideoUrl = null, playableOnGuitar = true)
  )),

  new Song(
    "O Great and Glorious King",
    "/songs/o-great-and-glorious-king",
    "Hymn",
    "O GREAT AND GLORIOUS KING",
    "IRREGULAR",
    "Ryan Cornett, 2026",
    "Luther O. Emerson, 1863",
    [
      {
        type: "stanza",
        number: 1,
        lines: [
          "O great and glorious King of kings,",
          "Whose will has worked such wondrous things,",
          "Our weak and humble hearts we raise",
          "That we may live but for Your praise.",
          "What ills Your strength has brought us from!",
          "Thus far we, by Your help, have come,",
          "Thus far we, by Your help, have come.",
        ]
      },
      {
        type: "stanza",
        number: 2,
        lines: [
          "Through raging flood and roaring flame,",
          "You freed us from our sin and shame;",
          "Your pow'r and pardon blazed the trail",
          "That we may pass within the veil.",
          "When we lay helpless in the grave,",
          "Your mighty arm reached down to save,",
          "Your mighty arm reached down to save.",
        ]
      },
      {
        type: "stanza",
        number: 3,
        lines: [
          "From plunging depths to vaulted height",
          "We rise to dwell in Your great light;",
          "There we, on whom Your grace has shone,",
          "Shall cast our crowns before the throne,",
          "Where grateful praise from every tongue",
          "Resounds in one eternal song,",
          "Resounds in one eternal song.",
        ]
      }
    ],
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
    [
      {
        type: "stanza",
        number: 1,
        lines: [
          "O risen Lord, once perished One,",
          "To whom I from the pit have flown,",
          "Blood-watered ground yields heark'ning bloom;",
          "Thy waking reckoned vain the tomb.",
        ]
      },
      {
        type: "refrain",
        number: 1,
        lines: [
          "Rise, now arise, O soul set free!",
          "Death's sting no longer pierces thee.",
        ]
      },
      {
        type: "stanza",
        number: 2,
        lines: [
          "From sin's o'erwhelming barrows stirred,",
          "My soul awakened at Thy word;",
          "Thus 'tis for all Thy righteous dead:",
          "The grave is but a borrowed bed.",
        ]
      },
      {
        type: "stanza",
        number: 3,
        lines: [
          "Hast Thou in drawing new life's breath,",
          "Wrought for Thy saints the death of Death?",
          "Yea we, as those in dust now lie,",
          "Wait for Thy day when Death shall die.",
        ]
      },
      {
        type: "stanza",
        number: 4,
        lines: [
          "Lo! Rolled aside was death's cold stone,",
          "Thou didst arise to life and throne;",
          "So shall we spring to glory won",
          "By Thee, O Lord, the Living One!",
        ]
      }
    ],
    null,
    null,
    null,
    null,
    "A prayer for contentment, prudence, and gratitude, asking Christ to teach us to value Him in both poverty and plenty and to remember that our true treasure is kept in Heaven."
  ),
  
  new Song(
    "The Sun Is Sinking",
    "/songs/the-sun-is-sinking",
    "Folk Spiritual",
    "THE SUN IS SINKING",
    "IRREGULAR",
    "Ryan Cornett, 2026",
    "Luther O. Emerson, 1863",
    [
      {
        type: "stanza",
        number: 1,
        lines: [
          "The sun is sinking o'er the mountains far,",
          "To shine in lands that lie beyond our sight;",
          "Thine own, O Father, all the nations are;",
          "O, give to them Thy Light.",
        ]
      },
      {
        type: "stanza",
        number: 2,
        lines: [
          "Earth hath no shadow like Thy shrouded face,",
          "No shining sun like knowledge that Thou art.",
          "Shine forth, great Light! In every darkened place;",
          "Make glad the weary heart.",
        ]
      },
      {
        type: "stanza",
        number: 3,
        lines: [
          "Shine in Thy saints who bear Thy holy light,",
          "Both near to us and those who dwell afar.",
          "Since Thou art with them, may they know no night;",
          "Be Thou their guiding star.",
        ]
      },
      {
        type: "stanza",
        number: 4,
        lines: [
          "When Heaven's morning dawns upon us all,",
          "With earthly sun and shade forever past,",
          "From ev'ry land Thou wilt Thy children call",
          "To dwell in light at last.",
        ]
      }
    ],
    null,
    null,
    null,
    null,
    "A prayer for contentment, prudence, and gratitude, asking Christ to teach us to value Him in both poverty and plenty and to remember that our true treasure is kept in Heaven."
  ),
  
  new Song(
    "What Vastness the Redeemer Crossed",
    "/songs/what-vastness-the-redeemer-crossed",
    "Hymn",
    "WHAT VASTNESS THE REDEEMER CROSSED",
    "IRREGULAR",
    "Ryan Cornett, 2026",
    "Luther O. Emerson, 1863",
    [
      {
        type: "stanza",
        number: 1,
        lines: [
          "What vastness the Redeemer crossed,",
          "A depth beyond all sounding,",
          "My guilt, a boundless chasm bridged",
          "By graciousness abounding.",
          "Sea to sky: how meager a scale!",
          "From star to star, yet failing;",
          "Still further reached His hand to me,",
          "His saving arm prevailing.",
        ]
      },
      {
        type: "stanza",
        number: 2,
        lines: [
          "What distance my dear Savior trod",
          "To stand on Calv'ry's mountain;",
          "He stepped where death's cold torrents rage,",
          "So I may cross the Jordan.",
          "Hopeless, languished I in the grave,",
          "In miry clay, I wallowed",
          "Until the Shepherd called my name:",
          "I woke, arose, and followed.",
        ]
      },
      {
        type: "stanza",
        number: 3,
        lines: [
          "To endless life He beckons me,",
          "My sin no more remembered,",
          "Far as the east is from the west,",
          "To plumbless depths surrendered.",
          "Like the morning sun I shall rise",
          "To dwell with Christ, my Savior;",
          "In borrowed robes of purest white,",
          "Brought near to God forever.",
        ]
      }
    ],
    null,
    null,
    null,
    null,
    "A prayer for contentment, prudence, and gratitude, asking Christ to teach us to value Him in both poverty and plenty and to remember that our true treasure is kept in Heaven.",
    true
  ),
  
  new Song(
    "There Is Rest",
    143,
    "there-is-rest",
    null,
    new SongMetadata("Praise Song", null, null, "Ryan Daniel Cornett", "Ryan Daniel Cornett"),
    [
      {
        type: "verse",
        number: 1,
        lines: [
          "Are You not good? Do I not have Your favor?",
          "Is all my hope in vain that I have such a Savior?",
          "A Lord who's near, near to the brokenhearted,",
          "Who hears the righteous cry, and saves the crushed in spirit?",
        ]
      },
      {
        type: "pre-chorus",
        number: 1,
        lines: [
          "When all other ground gives way,",
          "Still my breaking voice will say:",
        ]
      },
      {
        type: "chorus",
        number: 1,
        lines: [
          "There is rest in who You are, For who You are is sure;",
          "Though earth and heaven pass away, Your promises endure;",
          "When all I have is this, On who You are, God, I will rest.",
        ]
      },
      {
        type: "verse",
        number: 2,
        lines: [
          "Should I have doubt? My faith is greatly shaken,",
          "My feet can scarcely stand on Christ, the sure foundation.",
          "In my own strength, I'd fall in but a moment,",
          "The quakes of guilt assail and leave me bent and broken.",
        ]
      },
      {
        type: "pre-chorus",
        number: 2,
        lines: [
          "When all other ground gives way,",
          "Though this mortal heart You slay,",
        ]
      },
      {
        type: "verse",
        number: 3,
        lines: [
          "Are You not love? Do You not have compassion?",
          "Are You not moved that I, Your child, feel so abandoned?",
          "I know You hear, I am not lost in silence;",
          "In my heart hides Your Word, a well of deep assurance.",
        ]
      },
      {
        type: "pre-chorus",
        number: 3,
        lines: [
          "When all other ground gives way,",
          "You remain my hope and stay.",
        ]
      }
    ],
    [new Arrangement("Chord Chart", "C major", "4/4", null, "Chord Chart", null, null, null, accompanimentTracks = [null])],
    streamingLinks = [null],
    new HelpfulSongInfo("There Is Rest is a confession of faith amid doubt, suffering, guilt, and the apparent silence of God, finding unshakable assurance not in our circumstances or strength but in His immutable character. When every earthly foundation gives way, the believer can rest in the goodness, faithfulness, love, and enduring promises of God.", ["assurance", "hope", "faithfulness", "God's presence"], ["Psalm 34:15-19", "Psalm 119:11", "Psalm 119:49-50", "Psalm 73:25-26", "Job 13:15", "Isaiah 40:8", "Isaiah 54:10", "Lamentations 3:21-26", "Matthew 7:24-27", "Matthew 24:35", "Romans 8:35-39", "1 Corinthians 3:11", "2 Corinthians 1:20", "Hebrews 6:17-19", "Hebrews 13:8", "James 1:17", "1 Peter 5:7"], 2021, null, true)
  ),
  new Song(
    "My Hope Is Found in This",
    142,
    "my-hope-is-found-in-this",
    null,
    new SongMetadata("Praise Song", null, null, "Ryan Daniel Cornett", "Ryan Daniel Cornett"),
    [
      {
        type: "verse",
        number: 1,
        lines: [
          "Pure among the vile, the Holy One made low,",
          "Faultless, for the great exchange: His life for sinful ones;",
          "The Founder of salvation for strangers beckoned near,",
          "Perfect through His suff'ring, brought to glory many sons.",
        ]
      },
      {
        type: "chorus",
        number: 1,
        lines: [
          "My hope is found in this: I'm my Father's child;",
          "Once His foe, now family Christ has reconciled.",
        ]
      },
      {
        type: "verse",
        number: 2,
        lines: [
          "Sin His crushing burden, and Calvary His goal,",
          "God's own Son in bloody flesh sought out His wand'ring sheep;",
          "For like a lamb to slaughter the Suffering Servant went,",
          "Willingly made filthy so the filthy may be clean.",
        ]
      },
      {
        type: "chorus",
        number: 2,
        lines: [
          "My hope is found in this: Jesus on the tree;",
          "By His sacrifice atoned, His blood covers me.",
        ]
      },
      {
        type: "verse",
        number: 3,
        lines: [
          "Made alive in spirit once put to death in flesh,",
          "Righteous for unrighteous that He might bring us to God;",
          "To die, His earthly mission, eternal life the prize:",
          "Credited to my account—no longer counted flawed.",
        ]
      },
      {
        type: "chorus",
        number: 3,
        lines: [
          "My hope is found in this: God's wrath satisfied;",
          "When He looks on me He sees Jesus' blood applied.",
        ]
      },
      {
        type: "verse",
        number: 4,
        lines: [
          "Once a ruined sinner, now crucified with Christ,",
          "I no longer live, but it is Christ who lives in me;",
          "Of anything created or anything to come,",
          "None shall separate me from His love that set me free.",
        ]
      },
      {
        type: "chorus",
        number: 4,
        lines: [
          "My hope is found in this: I am not my own;",
          "Purchased by His precious blood, I am His alone.",
        ]
      }
    ],
    arrangements = [new Arrangement("Chord Chart", "C major", "4/4", null, "Chord Chart", null, null, null, accompanimentTracks = [null])],
    streamingLinks = [null],
    new HelpfulSongInfo("The believer's hope is anchored in adoption, atonement, justification, and assurance of God's preservation of His saints.", ["salvation", "redemption", "substitutionary atonement", "justification", "reconciliation", "adoption", "assurance", "perseverance"], ["Hebrews 2:9-11", "Isaiah 53:4-7", "2 Corinthians 5:18-21", "Romans 5:8-11", "1 Peter 3:18", "Galatians 2:20", "Romans 8:31-39", "1 Corinthians 6:19-20"], 2026, null, true)
  )
];

export default songs;