import { describe, expect, it } from 'vitest';
import { calculateStudyProgress, STUDY_END_DATE, STUDY_START_DATE } from './study-progress';

describe('calculateStudyProgress', () => {
  it('clamps dates at and before the university start to zero', () => {
    expect(calculateStudyProgress(new Date('2024-08-01T00:00:00Z'))).toBe(0);
    expect(calculateStudyProgress(new Date(`${STUDY_START_DATE}T00:00:00Z`))).toBe(0);
  });

  it('calculates a midpoint percentage during university study', () => {
    const midpoint = new Date('2026-08-01T00:00:00Z');
    expect(calculateStudyProgress(midpoint)).toBeGreaterThan(0);
    expect(calculateStudyProgress(midpoint)).toBeLessThan(100);
  });

  it('clamps dates at and after graduation to one hundred', () => {
    expect(calculateStudyProgress(new Date(`${STUDY_END_DATE}T00:00:00Z`))).toBe(100);
    expect(calculateStudyProgress(new Date('2029-01-01T00:00:00Z'))).toBe(100);
  });
});
