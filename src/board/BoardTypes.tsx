export enum Level {
  BEGINNER = 1,
  EASY = 2,
  PROFESSIONAL = 3,
  WORLD_CLASS = 4,
}

export const PREDEFINED_LEVELS: { name: string; value: Level }[] = [
  {
    name: "Beginner",
    value: Level.BEGINNER,
  },
  {
    name: "Easy",
    value: Level.EASY,
  },
  {
    name: "Professional",
    value: Level.PROFESSIONAL,
  },
  {
    name: "World Class",
    value: Level.WORLD_CLASS,
  },
];
