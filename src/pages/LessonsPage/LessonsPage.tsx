import { Lesson } from '@/common/Types/LessonTypes';
import { LessonUtils } from '@/common/Utils/LessonUtils';
import { Button, Cell, FixedLayout, Input, List, Modal, Navigation, Placeholder } from '@telegram-apps/telegram-ui';
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader';
import { useCloudStorage, useHapticFeedback, usePopup } from '@tma.js/sdk-react';
import { useState, type FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';



export const LessonsPage: FC = () => {

  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [modalState, setModalState] = useState(false)
  const LU = new LessonUtils(useCloudStorage())

  const [lessons, setLessons] = useState<Lesson[]>(useLocation().state)

  const popup = usePopup()
  const haptic = useHapticFeedback()


  return (
    <div>
      <List >
        <Placeholder
              header='Управление предметами'
              description='На этой странице вы можете создать, изменить или удалить учебный предмет для виртуального дневника'/>


        {lessons.map((lesson, index) => <Cell 
                      key={index}
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
          <div >
            <Input value={name} onChange={(e) => setName(e.target.value)} header='Название предмета'/>
            <div style={{padding: 16}}>
              <Button onClick={() => {
                LU.addLesson(name).then(() => {
                    const data = lessons.concat(
                      [{
                        lesson_name: name,
                        marks: []
                      }]
                    )
                    setLessons(data)
                    setModalState(false)
                  })}} disabled={name.trim().length === 0} size="l" stretched>Добавить</Button>
            </div>
        </div>
        
        </Modal>
    </div>
  );
};
