import React from 'react';
import {
  Calculator,
  BookOpen,
  Languages,
  Atom,
  FlaskConical,
  Dna,
  Hourglass,
  Globe2,
  Scale,
  Laptop,
  Cpu,
  GraduationCap,
} from 'lucide-react';
import { SubjectId } from '../types';

interface SubjectIconProps {
  icon: string;
  className?: string;
}

export const SubjectIcon: React.FC<SubjectIconProps> = ({ icon, className = 'w-5 h-5' }) => {
  switch (icon) {
    case 'Calculator':
      return <Calculator className={className} />;
    case 'BookOpen':
      return <BookOpen className={className} />;
    case 'Languages':
      return <Languages className={className} />;
    case 'Atom':
      return <Atom className={className} />;
    case 'FlaskConical':
      return <FlaskConical className={className} />;
    case 'Dna':
      return <Dna className={className} />;
    case 'Hourglass':
      return <Hourglass className={className} />;
    case 'Globe2':
      return <Globe2 className={className} />;
    case 'Scale':
      return <Scale className={className} />;
    case 'Laptop':
      return <Laptop className={className} />;
    case 'Cpu':
      return <Cpu className={className} />;
    default:
      return <GraduationCap className={className} />;
  }
};
