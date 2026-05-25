export const STUDY_START_DATE = '2024-09-01';
export const STUDY_END_DATE = '2028-06-30';

const start = Date.parse(`${STUDY_START_DATE}T00:00:00Z`);
const end = Date.parse(`${STUDY_END_DATE}T00:00:00Z`);

export function calculateStudyProgress(currentDate: Date = new Date()): number {
  const elapsed = currentDate.getTime() - start;
  const percentage = (elapsed / (end - start)) * 100;
  return Math.min(100, Math.max(0, percentage));
}
