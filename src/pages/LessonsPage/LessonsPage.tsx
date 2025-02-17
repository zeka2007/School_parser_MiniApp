import { Lesson } from '@/common/Types/LessonTypes';
import { StudentData } from '@/common/Types/UserTypes';
import { showErrorDialog } from '@/common/Utils/Utils';
import { Button, Cell, FixedLayout, Input, List, Modal, Navigation, Placeholder, Skeleton } from '@telegram-apps/telegram-ui';
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader';
import { retrieveLaunchParams, useHapticFeedback, usePopup } from '@tma.js/sdk-react';
import { AxiosError } from 'axios';
import { useState, type FC } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';



export const LessonsPage: FC = () => {

  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [modalState, setModalState] = useState(false)

  const lessons: Lesson[] = useLocation().state

  const popup = usePopup()
  const haptic = useHapticFeedback()


  return (
    <div>
      <List >
        <Placeholder
              header='Управление предметами'
              description='На этой странице вы можете создать, изменить или удалить учебный предмет для виртуального дневника'/>


        {lessons.map((lesson) => <Cell 
                      after={<Navigation/>}
                      onClick={() => navigate('/lesson-edit', {state: lesson})}
                    >{lesson.lesson_name}
                  </Cell>)}
      </List>

      <FixedLayout style={{padding: 16}}><Button 
            size="l" 
            stretched 
            onClick={() => setModalState(true)}>Добавить предмет</Button> </FixedLayout>
      
    
        <Modal
          header={<ModalHeader>Добавление предмета</ModalHeader>}
          onOpenChange={(is_open) => setModalState(is_open)}
          open={modalState}
        >
          <List >
            <Input value={name} onChange={(e) => setName(e.target.value)} header='Название предмета'/>
            <div style={{padding: 16}}>
              <Button onClick={() => {}} disabled={name.trim().length === 0} size="l" stretched>Добавить</Button>
            </div>
        </List>
        
        </Modal>
    </div>
  );
};
