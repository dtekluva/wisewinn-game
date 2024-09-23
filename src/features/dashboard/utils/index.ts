import { SubmissionNumber } from '@/features/dashboard';

export const sumUpSubmissionProperty = (
  dataForSubmission: SubmissionNumber[],
  property: string,
): number => {
  return dataForSubmission.reduce(
    (partialSum, currentSubmission) =>
      partialSum + Number(currentSubmission[property]),
    0,
  );
};
