import type { ComponentType, JSX } from 'react';

import { IndexPage } from '@/pages/IndexPage/IndexPage';
import { LoginPage } from '@/pages/LoginPage/LoginPage';
import { MarkStatsPage } from '@/pages/MarkStatsPage/MarkStatsPage';
import { TestPage } from '@/pages/TestPage/TestPage';
import { MarkStatsFullPage } from '@/pages/MarkStatFullPage/MarkStatFullPage';
import { DiariesPage } from '@/pages/DiariesPage/DiariesPage';


interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: IndexPage },
  { path: '/login', Component: LoginPage, title: 'login' },
  { path: '/mark-stat', Component: MarkStatsPage, title: 'mark-stat'},
  { path: '/diaries', Component: DiariesPage, title: 'diaries'},
  { path: '/mark-stat-full', Component: MarkStatsFullPage, title: 'mark-stat-full'},
  { path: '/test', Component: TestPage, title: 'test'}
];
