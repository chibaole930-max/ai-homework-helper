export type SubjectId =
  | 'toan'
  | 'van'
  | 'anh'
  | 'ly'
  | 'hoa'
  | 'sinh'
  | 'su'
  | 'dia'
  | 'gdktpl'
  | 'tin'
  | 'congnghe';

export type TextbookSeries =
  | 'Kết nối tri thức với cuộc sống'
  | 'Cánh diều'
  | 'Chân trời sáng tạo'
  | 'Tổng hợp / Chung';

export type NoteStyle =
  | 'loigiaihay_full'
  | 'standard'
  | 'sgk_exercises'
  | 'formula_summary'
  | 'mindmap'
  | 'exam_prep';

export type LoigiaihaySection =
  | 'all'
  | 'theory'
  | 'activities'
  | 'practice'
  | 'exercises_sgk'
  | 'exercises_sbt';

export type DetailLevel = 'basic' | 'standard' | 'advanced';

export type SolutionDepth = 'detailed' | 'hint_only' | 'quick';

export interface LessonItem {
  id: string;
  number?: string;
  title: string;
  description?: string;
  loigiaihayUrl?: string;
}

export interface CurriculumChapter {
  id: string;
  title: string;
  description?: string;
  lessons: LessonItem[];
}

export interface SubjectInfo {
  id: SubjectId;
  name: string;
  shortName: string;
  badge: string;
  color: string;
  bgLight: string;
  borderColor: string;
  accentText: string;
  icon: string;
  description: string;
  loigiaihayUrl: string;
  popularLessons: string[];
  chapters?: CurriculumChapter[];
  sampleQuestions: {
    title: string;
    text: string;
    type: string;
  }[];
}

export interface SavedStudyItem {
  id: string;
  type: 'note' | 'exercise';
  title: string;
  subject: string;
  subjectId: SubjectId;
  textbook: string;
  content: string;
  date: string;
  isFavorite: boolean;
  style?: string;
  originalProblem?: string;
  hasImage?: boolean;
}

export interface TutorMessage {
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
}
