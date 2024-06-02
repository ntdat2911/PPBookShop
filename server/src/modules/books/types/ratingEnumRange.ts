type RatingRange = { min: number; max: number };

export const RatingEnumRange: { [key: number]: RatingRange } = {
  1: { min: 1, max: 2 },
  2: { min: 2, max: 3 },
  3: { min: 3, max: 4 },
  4: { min: 4, max: 5 },
  5: { min: 5, max: 5 },
};
