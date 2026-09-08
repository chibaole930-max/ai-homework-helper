import { GradeId, TextbookSeries } from '../types';
import { SUBJECTS as SUBJECTS_12, TEXTBOOKS as TEXTBOOKS_12 } from './subjects';
import { SUBJECTS_10, TEXTBOOKS_10 } from './subjects10';
import { SUBJECTS_11, TEXTBOOKS_11 } from './subjects11';

export const GRADES: { id: GradeId; label: string }[] = [
  { id: '10', label: 'Lớp 10' },
  { id: '11', label: 'Lớp 11' },
  { id: '12', label: 'Lớp 12' },
];

export const GRADE_LABELS: Record<GradeId, string> = {
  '10': 'Lớp 10',
  '11': 'Lớp 11',
  '12': 'Lớp 12',
};

export const SUBJECTS_BY_GRADE: Record<GradeId, typeof SUBJECTS_12> = {
  '10': SUBJECTS_10,
  '11': SUBJECTS_11,
  '12': SUBJECTS_12,
};

export const TEXTBOOKS_BY_GRADE: Record<GradeId, TextbookSeries[]> = {
  '10': TEXTBOOKS_10,
  '11': TEXTBOOKS_11,
  '12': TEXTBOOKS_12,
};
