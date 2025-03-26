import { List } from '@telegram-apps/telegram-ui';
import { useEffect, useState, type FC } from 'react';


import './IndexPage.css'

import UtilsComponent from './UtilsContent';
import ActionsComponent from './ActionsComponent';
import StatContent from './StatContent';

import { HeaderContent } from './HeaderContent';
import { Lesson } from '@/common/Types/LessonTypes';
import { getLessons } from '@/common/Utils/LessonUtils';
import { init, mainButton } from '@telegram-apps/sdk-react';

export const IndexPage: FC = () => {


  const [lessons, setLessons] = useState<Lesson[]>(JSON.parse(sessionStorage.getItem('lessons') ?? '[]'));

  useEffect(() => {
    init()
    getLessons().then((ls) => {
      setLessons(ls)
      sessionStorage.setItem('lessons', JSON.stringify(ls))
    })
  }, [])


  return (

    <List className='list'>
      <HeaderContent lessons={lessons} onMarkAdd={(lesson_id: number, mark: string) => {
        setLessons(lessons.map(({id, lesson_name, marks}) => (lesson_id === id ? {id: id, lesson_name: lesson_name, marks: marks.concat(mark)} : {id: id, lesson_name: lesson_name, marks: marks})))
      }}></HeaderContent>
      {lessons.length > 0 && <StatContent lessons={lessons} />}
      <UtilsComponent lessons={lessons} />

      <ActionsComponent lessons={lessons} />

    </List>

  );
};
