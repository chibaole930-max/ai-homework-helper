import { GradeId, TextbookSeries } from '../types';
import { SUBJECTS as SUBJECTS_12, TEXTBOOKS as TEXTBOOKS_12 } from './subjects';
import { SUBJECTS_10, TEXTBOOKS_10 } from './subjects10';
import { SUBJECTS_11, TEXTBOOKS_11 } from './subjects11';
import { SUBJECTS_9, TEXTBOOKS_9 } from './subjects9';
import { SUBJECTS_6, TEXTBOOKS_6 } from './subjects6';
import { SUBJECTS_7, TEXTBOOKS_7 } from './subjects7';
import { SUBJECTS_8, TEXTBOOKS_8 } from './subjects8';

export const GRADES: { id: GradeId; label: string }[] = [
  { id: '06', label: 'Lớp 6' },
  { id: '07', label: 'Lớp 7' },
  { id: '08', label: 'Lớp 8' },
  { id: '09', label: 'Lớp 9' },
  { id: '10', label: 'Lớp 10' },
  { id: '11', label: 'Lớp 11' },
  { id: '12', label: 'Lớp 12' },
];

export const GRADE_LABELS: Record<GradeId, string> = {
  '06': 'Lớp 6',
  '07': 'Lớp 7',
  '08': 'Lớp 8',
  '09': 'Lớp 9',
  '10': 'Lớp 10',
  '11': 'Lớp 11',
  '12': 'Lớp 12',
};

export const SUBJECTS_BY_GRADE: Record<GradeId, typeof SUBJECTS_12> = {
  '06': SUBJECTS_6,
  '07': SUBJECTS_7,
  '08': SUBJECTS_8,
  '09': SUBJECTS_9,
  '10': SUBJECTS_10,
  '11': SUBJECTS_11,
  '12': SUBJECTS_12,
};

export const TEXTBOOKS_BY_GRADE: Record<GradeId, TextbookSeries[]> = {
  '06': TEXTBOOKS_6,
  '07': TEXTBOOKS_7,
  '08': TEXTBOOKS_8,
  '09': TEXTBOOKS_9,
  '10': TEXTBOOKS_10,
  '11': TEXTBOOKS_11,
  '12': TEXTBOOKS_12,
};