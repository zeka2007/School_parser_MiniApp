import { List } from '@telegram-apps/telegram-ui';
import { useEffect, useState, type FC } from 'react';


import './IndexPage.css'

import UtilsComponent from './UtilsContent';
import ActionsComponent from './ActionsComponent';
import StatContent from './StatContent';

import { useCloudStorage } from '@tma.js/sdk-react';
import { HeaderContent } from './HeaderContent';
import { Lesson } from '@/common/Types/LessonTypes';
import { getMarksFromLessons } from '@/common/Utils/MarksUtils';
import { LessonUtils } from '@/common/Utils/LessonUtils';
import { UserUtils } from '@/common/Utils/UserUtils';

export const IndexPage: FC = () => {

  const cloudStorage = useCloudStorage()
 
  const LU = new LessonUtils(cloudStorage)
  const UU = new UserUtils(cloudStorage)
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    // UU.deleteAll()
    LU.getLessons().then((ls) => setLessons(ls))
  }, [])

    
  return (
        
      <List className='list'>
        <HeaderContent marks={getMarksFromLessons(lessons)}></HeaderContent>
        {lessons.length > 0 && <StatContent lessons={lessons}/>}
        <UtilsComponent lessons={lessons}/>

        <ActionsComponent lessons={lessons}/>
      
      </List>
    
  );
};
