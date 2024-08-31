import { useState, type FC } from 'react';
import { QuaretrChoose } from '../MarkStatsPage/QuarterChoose';
import { useLocation } from 'react-router-dom';
import { retrieveLaunchParams } from '@tma.js/sdk-react';
import { useQuery } from 'react-query';
import { Button, Cell, FixedLayout, List, Modal, Placeholder, Text } from '@telegram-apps/telegram-ui';
import {  getMarkString, getMarks } from '@/common/Utils/MarksUtils';
import { LessonData } from '@/common/Types/LessonTypes';
import { getWeekDay } from '@/common/Utils/Utils';
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader';
import { AddMark } from './AddMark';
import { StudentData } from '@/common/Types/UserTypes';
import { Mark } from '@/common/Types/MarkTypes';



export const MarksPage: FC = () => {

  const state:  { lesson: LessonData; data: StudentData } = useLocation().state
  const { initDataRaw } = retrieveLaunchParams();
  const [quarter, setQuarter] = useState(state.data.user.quarter)
  const [modalState, setModalState] = useState(false)
  const [currentMark, setCurrentMark] = useState<Mark>()

  const query = useQuery(['lesson-marks', quarter], () => {
      let params = new URLSearchParams();
      
      params.append('diary_id', state.data.user.diary_id.toString())
      params.append('lesson_id', state.lesson.id.toString())
      params.append('quarter', quarter.toString())
      return getMarks(initDataRaw, params)
  })
 
  return (
    <div>
      <List style={{paddingBottom: 82}}>
          { query.data && query.data.length == 0 && <Placeholder header='Отметок нет' description='Попробуйте изменить четверть'/>}

          <QuaretrChoose state={state.data} query={query} callback={(quarter: number) =>{ setQuarter(quarter)}}/>

          {query.data?.map((mark, index) =>
              <Cell key={index} onClick={() => {setCurrentMark(mark); setModalState(true)}} description={mark.date} after={<Text>{getMarkString(mark)}</Text> }>{getWeekDay(new Date(mark.date))}</Cell>
          )}
      </List>
      <FixedLayout style={{padding: 16}}><Button 
            size="l" 
            stretched 
            onClick={() => setModalState(true)}>Добавить отметку</Button> </FixedLayout>
      
    
        <Modal
          header={<ModalHeader>Добавление предмета</ModalHeader>}
          onOpenChange={(is_open) => {
            setModalState(is_open)
            if (!is_open) setCurrentMark(undefined)
          }}
          open={modalState}
        >
          <List >
            <AddMark lesson={state.lesson} quarter={quarter} currentMark={currentMark} onSuccess={() => {
              query.refetch()
              setModalState(false)
            }}/>
        </List>
        
        </Modal>
    </div>
  );
};
