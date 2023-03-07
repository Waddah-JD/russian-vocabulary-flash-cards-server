import { ValidPracticeBatchSizes } from './types';

interface PracticeWordsDistribution {
  notPracticedRecently: number;
  lowScore: number;
  random: number;
}

export function getPracticeWordsDistribution(
  batchSize: ValidPracticeBatchSizes,
): PracticeWordsDistribution {
  switch (batchSize) {
    case 5:
      return {
        notPracticedRecently: 1,
        lowScore: 1,
        random: 3,
      };
    case 10:
      return {
        notPracticedRecently: 2,
        lowScore: 2,
        random: 6,
      };
    case 20:
      return {
        notPracticedRecently: 4,
        lowScore: 4,
        random: 12,
      };
    case 30:
      return {
        notPracticedRecently: 7,
        lowScore: 7,
        random: 16,
      };
  }
}
