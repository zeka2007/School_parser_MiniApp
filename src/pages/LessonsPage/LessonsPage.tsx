import { StudentData } from '@/common/Types';
import { LessonCreate, LessonData } from '@/common/Types/LessonTypes';
import { createLesson, getLessons } from '@/common/Utils/LessonUtils';
import { getRandomString } from '@/common/Utils/Utils';
import { Button, Cell, FixedLayout, Input, List, Modal, Navigation, Placeholder, Skeleton } from '@telegram-apps/telegram-ui';
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader';
import { retrieveLaunchParams } from '@tma.js/sdk-react';
import { AxiosError } from 'axios';
import { useState, type FC } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';



export const LessonsPage: FC = () => {

  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [modalState, setModalState] = useState(false)
  const { initDataRaw } = retrieveLaunchParams();

  const userData: StudentData = useLocation().state

  const { data, isLoading, refetch} = useQuery<LessonData[]>('lessons', () => getLessons(initDataRaw, userData.user.diary_id), {
    retry: true
  })

  const createMutation = useMutation((lessonData: LessonCreate) => createLesson(lessonData, initDataRaw))

  return (
    <div>
      <List >
        <Placeholder
              header='Управление предметами'
              description='На этой странице вы можете создать, изменить или удалить учебный предмет для виртуального дневника'/>

        {isLoading && [...Array(3)].map((_, i) => <Cell key={i}><Skeleton withoutAnimation visible>{new Array(50).join('*')}</Skeleton></Cell>)}

        {data?.map((lesson) => <Cell 
                      key={lesson.id}
                      after={<Navigation/>}
                      onClick={() => navigate('/lesson-edit', {state: {lesson: lesson, data: userData}})}
                    >{lesson.name}
                  </Cell>)}
      </List>

      <FixedLayout style={{padding: 16}}><Button 
            size="l" 
            stretched 
            onClick={() => setModalState(true)}>Добавить предмет</Button> </FixedLayout>
      
    
        <Modal
          header={<ModalHeader>Добавление предмета</ModalHeader>}
          onOpenChange={(is_open) => {refetch(); setModalState(is_open)}}
          open={modalState}
        >
          <List >
            <Input value={name} onChange={(e) => setName(e.target.value)} header='Название предмета'/>
            <div style={{padding: 16}}>
              <Button onClick={() => {
                createMutation.mutate({
                  diary_id: userData.user.diary_id,
                  name: name
                }, {onSuccess: () => setModalState(false)})
              }} loading={createMutation.isLoading} disabled={name.trim().length === 0} size="l" stretched>Добавить</Button>
            </div>
        </List>
        
        </Modal>
    </div>
  );
};
