import { GradeId, TextbookSeries } from '../types';
import { SUBJECTS as SUBJECTS_12, TEXTBOOKS as TEXTBOOKS_12 } from './subjects';
import { SUBJECTS_10, TEXTBOOKS_10 } from './subjects10';
import { SUBJECTS_11, TEXTBOOKS_11 } from './subjects11';
import { SUBJECTS_9, TEXTBOOKS_9 } from './subjects9';
import { SUBJECTS_6, TEXTBOOKS_6 } from './subjects6';
import { SUBJECTS_7, TEXTBOOKS_7 } from './subjects7';
import { SUBJECTS_8, TEXTBOOKS_8 } from './subjects8';

export const GRADES: { id: GradeId; label: string }[] = [
  { id: '6', label: 'Lớp 6' },
  { id: '7', label: 'Lớp 7' },
  { id: '8', label: 'Lớp 8' },
  { id: '9', label: 'Lớp 9' },
  { id: '10', label: 'Lớp 10' },
  { id: '11', label: 'Lớp 11' },
  { id: '12', label: 'Lớp 12' },
];

export const GRADE_LABELS: Record<GradeId, string> = {
  '6': 'Lớp 6',
  '7': 'Lớp 7',
  '8': 'Lớp 8',
  '9': 'Lớp 9',
  '10': 'Lớp 10',
  '11': 'Lớp 11',
  '12': 'Lớp 12',
};

export const SUBJECTS_BY_GRADE: Record<GradeId, typeof SUBJECTS_12> = {
  '6': SUBJECTS_6,
  '7': SUBJECTS_7,
  '8': SUBJECTS_8,
  '9': SUBJECTS_9,
  '10': SUBJECTS_10,
  '11': SUBJECTS_11,
  '12': SUBJECTS_12,
};

export const TEXTBOOKS_BY_GRADE: Record<GradeId, TextbookSeries[]> = {
  '6': TEXTBOOKS_6,
  '7': TEXTBOOKS_7,
  '8': TEXTBOOKS_8,
  '9': TEXTBOOKS_9,
  '10': TEXTBOOKS_10,
  '11': TEXTBOOKS_11,
  '12': TEXTBOOKS_12,
};