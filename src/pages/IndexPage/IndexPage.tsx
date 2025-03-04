import { List } from '@telegram-apps/telegram-ui';
import { useEffect, useState, type FC } from 'react';


import './IndexPage.css'

import UtilsComponent from './UtilsContent';
import ActionsComponent from './ActionsComponent';
import StatContent from './StatContent';

import { HeaderContent } from './HeaderContent';
import { Lesson } from '@/common/Types/LessonTypes';
import { getMarksFromLessons } from '@/common/Utils/MarksUtils';
import { getLessons } from '@/common/Utils/LessonUtils';
import { init } from '@telegram-apps/sdk-react';

export const IndexPage: FC = () => {


  const [lessons, setLessons] = useState<Lesson[]>(JSON.parse(sessionStorage.getItem('lessons') ?? '[]'));

  useEffect(() => {
    init()
    getLessons().then((ls) => {
      setLessons(ls)
      sessionStorage.setItem('lessons', JSON.stringify(lessons))
    })
  }, [])

    
  return (
        
      <List className='list'>
        <HeaderContent lessons={lessons}></HeaderContent>
        {lessons.length > 0 && <StatContent lessons={lessons}/>}
        <UtilsComponent lessons={lessons}/>

        <ActionsComponent lessons={lessons}/>
      
      </List>
    
  );
};
