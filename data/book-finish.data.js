export const finishSteps = [
  {
    key: "spark",
    prompt: "What starts the comeback?",
    options: [
      { id: "candice-spark", label: "Candice brings him back to life", shortLabel: "Candice spark", opener: "Candice pulling Johnny back into the fight", tones: ["heart", "redemption"] },
      { id: "second-wind", label: "Pure heart / second wind", shortLabel: "Second wind", opener: "Johnny finding a second wind through pure heart", tones: ["heart", "statement"] },
      { id: "crowd-surge", label: "The crowd pulls him back into it", shortLabel: "Crowd surge", opener: "the crowd dragging Johnny back into himself", tones: ["crowd", "destiny"] },
      { id: "overconfidence", label: "The opponent gets too comfortable", shortLabel: "Opponent slips", opener: "the opponent getting too comfortable at exactly the wrong time", tones: ["chaos", "statement"] }
    ]
  },
  {
    key: "stress",
    prompt: "What is the biggest stress point?",
    options: [
      { id: "near-fall", label: "A brutal 2.9 near fall", shortLabel: "2.9 near fall", stressLine: "a brutal 2.9 near fall that almost breaks the building", tones: ["chaos", "crowd"] },
      { id: "submission-escape", label: "A submission escape", shortLabel: "Submission escape", stressLine: "a desperate submission escape that keeps the dream alive", tones: ["heart", "panic"] },
      { id: "reversal-sequence", label: "A wild reversal sequence", shortLabel: "Reversal chaos", stressLine: "a wild reversal sequence that feels one mistake away from disaster", tones: ["chaos", "statement"] },
      { id: "outside-chaos", label: "Outside chaos almost ruins it", shortLabel: "Outside chaos", stressLine: "outside chaos nearly wrecking everything before the finish can land", tones: ["chaos", "redemption"] }
    ]
  },
  {
    key: "move",
    prompt: "How does Johnny finish it?",
    options: [
      { id: "one-final-beat", label: "One Final Beat", shortLabel: "One Final Beat", finishLine: "One Final Beat landing like the exclamation point", tones: ["statement", "crowd"] },
      { id: "gargano-escape", label: "Gargano Escape", shortLabel: "Gargano Escape", finishLine: "Gargano Escape forcing the whole thing to tighten shut", tones: ["heart", "technical"] },
      { id: "flash-pin", label: "Flash pin after chaos", shortLabel: "Flash pin", finishLine: "a flash pin hit at the exact perfect second", tones: ["chaos", "clever"] },
      { id: "statement-counter", label: "Clean counter into a statement win", shortLabel: "Statement counter", finishLine: "a clean counter into a statement win that ends debate immediately", tones: ["statement", "destiny"] }
    ]
  },
  {
    key: "image",
    prompt: "What is the final emotional image?",
    options: [
      { id: "crowd-chant", label: "The crowd erupts into “Johnny Wrestling” chants", shortLabel: "Crowd eruption", endingLine: "the arena exploding into Johnny Wrestling chants", tones: ["crowd", "destiny"] },
      { id: "candice-present", label: "Candice is there for the moment", shortLabel: "Candice there", endingLine: "Candice being right there for the emotional release", tones: ["heart", "redemption"] },
      { id: "title-disbelief", label: "Johnny raises the title in total disbelief", shortLabel: "Title disbelief", endingLine: "Johnny holding the title like he can barely believe the chapter is real", tones: ["destiny", "statement"] },
      { id: "redemption", label: "The whole thing feels like redemption", shortLabel: "Redemption", endingLine: "the entire finish landing like redemption instead of just victory", tones: ["redemption", "heart"] }
    ]
  }
];
