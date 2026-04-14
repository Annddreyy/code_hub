import type { ExperienceLevel } from '@/entities/experienceLevel';
import type { Goal } from '@/entities/goal';
import type { Language } from '@/entities/language';

export enum Steps {
  LANGUAGE = 'language',
  EXPERIENCE = 'experience',
  GOAL = 'goal',
  ROADMAP = 'roadmap',
}

export type UserChoices = {
  languages: Language[];
  experienceLevels: ExperienceLevel[];
  goals: Goal[];
};
