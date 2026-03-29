export const fanTypes = {
  believer: {
    title: "The Believer",
    subtitle: "You are here for the heart, the faith, and the chapter where Johnny looks finished but somehow rises anyway.",
    description: "You do not need everything to be easy, polished, or inevitable. You stay because Johnny Gargano stories hit deepest when belief has to carry the whole arena before momentum finally catches up.",
    quote: "He was down. He was doubted. He still found a way.",
    shareLine: "I got “The Believer” on this Johnny Wrestling fan quiz. This site absolutely gets Gargano fans.",
    declaration: "You believe the point of a Johnny Gargano story is that faith has to survive before victory does.",
    chant: "HEART OVER DOUBT"
  },
  historian: {
    title: "The #DIY Historian",
    subtitle: "You love Johnny not just for tonight, but for the full legacy arc that made him matter in the first place.",
    description: "You are wired for continuity, history, and all the emotional weight that comes from knowing where this story sits inside the larger NXT picture. You love the present most when it deepens the legend.",
    quote: "Johnny Gargano never really stops fighting, and the fans who love him never really stop believing.",
    shareLine: "I got “The #DIY Historian” on this Johnny Wrestling fan quiz. Legacy matters, and this site knows it.",
    declaration: "You see this title shot as another chapter in a much bigger Johnny Wrestling history book.",
    chant: "#DIY FOREVER"
  },
  comeback: {
    title: "The Comeback Addict",
    subtitle: "You do not watch Johnny Gargano for comfort. You watch for near-falls, suffering, panic, and payoff.",
    description: "You live for the stretch where everything feels lost, the nerves are shredded, and then the comeback hits anyway. For you, Johnny Wrestling is not just a wrestler. He is emotional cardio.",
    quote: "Because when Johnny Gargano rises, it feels earned.",
    shareLine: "I got “The Comeback Addict” on this Johnny Wrestling fan quiz. Emotional damage is part of the experience.",
    declaration: "You want chaos, drama, and the exact kind of match that leaves your pulse in another dimension.",
    chant: "ONE MORE RUN"
  },
  prophet: {
    title: "The Stand & Deliver Prophet",
    subtitle: "You are fully locked in on the title-night destiny of all this. For you, this is not random. This is a sign.",
    description: "You are tuned to momentum shifts, big-stage timing, and the feeling that some match opportunities arrive with a glow around them. You are already seeing the title-night reveal in your head.",
    quote: "Give Johnny Gargano the stage, the pressure, and the possibility, and he will make the moment matter.",
    shareLine: "I got “The Stand & Deliver Prophet” on this Johnny Wrestling fan quiz. The title-night vision is alive.",
    declaration: "You are already living in the chapter where the big stage turns this whole comeback into something real.",
    chant: "TAKE THAT TITLE HOME"
  },
  loyalist: {
    title: "The Johnny Never Quits Loyalist",
    subtitle: "Grit, underdog energy, and refusal to fold are the core of why Johnny matters to you.",
    description: "You love the version of Johnny Gargano who keeps pushing when quitting would be easier. You are attached to the spirit of the thing: the heart, the stubbornness, and the refusal to stop chasing the light.",
    quote: "Too small. Too overlooked. Too easy to dismiss. And still he became one of the defining figures in modern NXT history.",
    shareLine: "I got “The Johnny Never Quits Loyalist” on this Johnny Wrestling fan quiz. Grit wins me over every time.",
    declaration: "You are here because Johnny Gargano never quits on the dream or on the fans who ride with him.",
    chant: "JOHNNY WRESTLING 👏👏👏👏👏"
  }
};

export const quizQuestions = [
  {
    prompt: "What pulls you hardest into a Johnny Gargano story?",
    options: [
      { label: "The comeback when he looks finished", score: { believer: 2, comeback: 1 } },
      { label: "The history and everything he has already built", score: { historian: 2, loyalist: 1 } },
      { label: "The emotion of a match that keeps escalating", score: { comeback: 2, believer: 1 } },
      { label: "The sense that one big moment is about to change everything", score: { prophet: 2, believer: 1 } }
    ]
  },
  {
    prompt: "What feels most Johnny Wrestling to you?",
    options: [
      { label: "Heart", score: { believer: 2 } },
      { label: "Legacy", score: { historian: 2 } },
      { label: "Surviving chaos", score: { comeback: 2 } },
      { label: "Delivering when the stage is biggest", score: { prophet: 2, loyalist: 1 } }
    ]
  },
  {
    prompt: "What kind of match moment destroys your nervous system the fastest?",
    options: [
      { label: "A late comeback", score: { believer: 2, comeback: 1 } },
      { label: "A callback to earlier eras", score: { historian: 2 } },
      { label: "A 2.9 near fall", score: { comeback: 2 } },
      { label: "The setup for the final sequence", score: { prophet: 2 } }
    ]
  },
  {
    prompt: "What is your ideal finish on title night?",
    options: [
      { label: "Johnny digs deep and wills himself there", score: { loyalist: 2, believer: 1 } },
      { label: "A finish that adds to his legend", score: { historian: 2 } },
      { label: "Absolute drama and emotional catharsis", score: { comeback: 2, believer: 1 } },
      { label: "One clean signature statement win", score: { prophet: 2, loyalist: 1 } }
    ]
  },
  {
    prompt: "Why do you still believe?",
    options: [
      { label: "Because he never quits", score: { loyalist: 2 } },
      { label: "Because Johnny matters to NXT history", score: { historian: 2 } },
      { label: "Because nobody does suffering-and-payoff like him", score: { comeback: 2 } },
      { label: "Because this feels like destiny", score: { prophet: 2, believer: 1 } }
    ]
  }
];

export const fanPriority = ["believer", "comeback", "prophet", "loyalist", "historian"];
