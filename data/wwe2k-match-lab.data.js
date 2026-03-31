export const matchLabData = {
  sectionLabel: "WWE 2K26 Match Lab",
  title: "One Point Apart",
  lede: "Johnny earned the shot. WWE 2K26 says the fight is almost dead even.",
  hook: "76 for Johnny. 75 for Borne. That is not comfort. That is pressure.",
  fighters: [
    {
      key: "johnny",
      name: "Johnny Gargano",
      ovr: 76,
      brand: "SmackDown",
      weightClass: "Cruiserweight",
      seriesHistory: "8th main-series appearance",
      debut: "WWE 2K18 debut",
      summary: "Veteran game presence. Slight edge on paper. Built for speed, technique, and experience.",
      image: "assets/johnny-gargano-wwewk26.png",
      imageAlt: "Johnny Gargano render from the WWE 2K26 website"
    },
    {
      key: "myles",
      name: "Myles Borne",
      ovr: 75,
      brand: "NXT",
      weightClass: "Heavyweight",
      seriesHistory: "Main-series debut",
      debut: "First WWE game appearance: WWE 2K26",
      summary: "Series newcomer. NXT champion. One point behind Johnny and rising fast.",
      image: "assets/myles-borne-wwewk26.png",
      imageAlt: "Myles Borne render from the WWE 2K26 website"
    }
  ],
  movesIntro: "Johnny's kit is built for clever violence. Borne's is built to make one opening count.",
  moves: {
    johnny: {
      label: "Johnny Gargano",
      signatures: [
        {
          name: "Lawn Dart 1",
          blurb: "A reminder that Johnny can weaponize the corner and turn precision into panic."
        },
        {
          name: "Superkick 14",
          blurb: "Pure Johnny timing: one clean kick and the whole pace changes."
        },
        {
          name: "School Boy Superkick",
          blurb: "Pure Johnny chaos: clever setup, instant punishment."
        },
        {
          name: "Superkick 16",
          blurb: "Another variation that keeps the threat alive from any angle."
        }
      ],
      finishers: [
        {
          name: "Arm Trapped Crossface 2",
          blurb: "The kind of finish that makes surviving Johnny feel impossible once he has you locked down."
        },
        {
          name: "Arm Trapped Crossface 1",
          blurb: "A technical endgame move built to squeeze the moment shut."
        }
      ]
    },
    myles: {
      label: "Myles Borne",
      signatures: [
        {
          name: "Ushigoroshi",
          blurb: "A punishing carry move that makes Borne feel heavier than the one-point gap suggests."
        },
        {
          name: "Fireman's Carry Neckbreaker",
          blurb: "A high-impact reminder that one clean lift can flip the whole match."
        }
      ],
      finishers: [
        {
          name: "Borne Again 1",
          blurb: "The kind of finisher that turns momentum into silence."
        },
        {
          name: "Borne Again 2",
          blurb: "A second variation that keeps Johnny under real danger the second Borne gets an opening."
        }
      ]
    }
  },
  outcomes: {
    winners: [
      { key: "johnny", label: "Johnny Gargano" },
      { key: "myles", label: "Myles Borne" }
    ],
    finishes: [
      { key: "johnny-submission", label: "Johnny by submission", winner: "johnny" },
      { key: "johnny-superkick", label: "Johnny by superkick sequence", winner: "johnny" },
      { key: "myles-borne-again", label: "Borne by Borne Again", winner: "myles" },
      { key: "myles-power", label: "Borne by power finish", winner: "myles" },
      { key: "chaotic-nxt", label: "Chaotic NXT ending", winner: "either" }
    ],
    results: {
      "johnny-submission": {
        badge: "Johnny pick",
        winner: "Johnny Gargano",
        finish: "Johnny by submission",
        headline: "Johnny Wrestling steals the moment again.",
        support: "Experience beats momentum when the margin is this thin."
      },
      "johnny-superkick": {
        badge: "Johnny pick",
        winner: "Johnny Gargano",
        finish: "Johnny by superkick sequence",
        headline: "Johnny turns one burst into gold.",
        support: "The speed gap shows up just enough for the comeback to hit full force."
      },
      "myles-borne-again": {
        badge: "Borne pick",
        winner: "Myles Borne",
        finish: "Borne by Borne Again",
        headline: "Borne proves this era belongs to him.",
        support: "One clean opening is all the champion needs when his finisher is waiting."
      },
      "myles-power": {
        badge: "Borne pick",
        winner: "Myles Borne",
        finish: "Borne by power finish",
        headline: "Borne keeps the dream just out of reach.",
        support: "The champion survives the emotion and makes the weight difference matter late."
      },
      "chaotic-nxt": {
        badge: "Wildcard",
        winner: "Anything can happen",
        finish: "Chaotic NXT ending",
        headline: "This turns into the kind of NXT mess fans replay immediately.",
        support: "A one-point gap, title pressure, and total chaos is exactly how legends and arguments get made."
      }
    }
  },
  closing: {
    title: "Book it in 2K26",
    copy: "This is exactly the kind of match WWE 2K26 was built for: a veteran fan favorite, a rising champion, a one-point gap, and a title fight you immediately want to run in Universe Mode.",
    tags: ["Universe", "MyGM", "Showcase"]
  }
};
