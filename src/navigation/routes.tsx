import type { ComponentType, JSX } from 'react';

import { IndexPage } from '@/pages/IndexPage/IndexPage';
import { MarkStatsPage } from '@/pages/MarkStatsPage/MarkStatsPage';
import { SettingsPage } from '@/pages/SettingsPage/SettingsPage';
import { MarkStatsFullPage } from '@/pages/MarkStatFullPage/MarkStatFullPage';
import { LessonsPage } from '@/pages/LessonsPage/LessonsPage';
import { LessonsEditPage } from '@/pages/LessonEditPage/LessonEditPage';
import { MarksPage } from '@/pages/MarksPage/MarksPage';
import { MarkAddCheckPage } from '@/pages/MarkAddCheckPage/MarkAddCheckPage';
import { FixesPage } from '@/pages/FixesPage/FixesPage';


interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: IndexPage },
  { path: '/mark-stat', Component: MarkStatsPage, title: 'mark-stat'},
  { path: '/lessons', Component: LessonsPage, title: 'lesson'},
  { path: '/lesson-edit', Component: LessonsEditPage, title: 'lesson-edit'},
  { path: '/mark-stat-full', Component: MarkStatsFullPage, title: 'mark-stat-full'},
  { path: '/marks', Component: MarksPage, title: 'marks-control'},
  { path: '/mark-add-check', Component: MarkAddCheckPage},
  { path: '/fixes', Component: FixesPage},

  { path: '/settings', Component: SettingsPage}
];
