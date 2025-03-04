import { useState, type FC } from 'react';
import { useLocation } from 'react-router-dom';
import { retrieveLaunchParams } from '@tma.js/sdk-react';
import { Button, Cell, FixedLayout, List, Modal, Placeholder, Text } from '@telegram-apps/telegram-ui';
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader';
import { Lesson } from '@/common/Types/LessonTypes';



export const MarksPage: FC = () => {

  const lesson: Lesson = useLocation().state
  const { initDataRaw } = retrieveLaunchParams();
  const [modalState, setModalState] = useState(false)
  const [currentMark, setCurrentMark] = useState<string>()
 
  return (
    <div>
      <List style={{paddingBottom: 82}}>
          { lesson.marks.length == 0 && <Placeholder header='Отметок нет' description='Попробуйте изменить четверть'/>}


          {lesson.marks.map((mark, index) =>
              <Cell key={index} onClick={() => {setCurrentMark(mark); setModalState(true)}} after={<Text>{mark}</Text> }>Отметка</Cell>
          )}
      </List>
      <FixedLayout style={{padding: 16}}><Button 
            size="l" 
            stretched 
            onClick={() => setModalState(true)}>Добавить отметку</Button> </FixedLayout>
      
    
        <Modal
          header={<ModalHeader>Добавление отметки</ModalHeader>}
          onOpenChange={(is_open) => {
            setModalState(is_open)
            if (!is_open) setCurrentMark(undefined)
          }}
          open={modalState}
        >
          <div >
            {/* <AddMark lesson={lesson} currentMark={currentMark} onSuccess={() => {
              setModalState(false)
            }}/> */}
        </div>
        
        </Modal>
    </div>
  );
};
