import { List } from '@telegram-apps/telegram-ui';
import { type FC } from 'react';


import './IndexPage.css'

import {  useNavigate } from 'react-router-dom';
import UtilsComponent from './UtilsContent';
import ActionsComponent from './ActionsComponent';
import StatContent from './StatContent';

import { useCloudStorage } from '@tma.js/sdk-react';
import { HeaderContent } from './HeaderContent';
import { Lesson } from '@/common/Types/LessonTypes';

export const IndexPage: FC = () => {

 
  const navigate = useNavigate()

  const cloudStorage = useCloudStorage();

  const readData = async () => { 
    console.log(await cloudStorage.getKeys())
  }


  const lessons: Lesson[] = [
    {
      lesson_name: 'lesson 1',
      marks: ['8', '9/10']
    }
  ]
  

  readData();
  
  return (
        
      <List className='list'>
        <HeaderContent marks={[8, 9, 10]}></HeaderContent>
        {lessons.length > 0 && <StatContent lessons={lessons}/>}
        <UtilsComponent lessons={lessons}/>

        <ActionsComponent lessons={lessons}/>
      
      </List>
    
  );
};
