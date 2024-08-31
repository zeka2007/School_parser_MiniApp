import { DeleteLessonData, LessonData, LessonUpdate } from '@/common/Types/LessonTypes';
import { DeleteMarkData } from '@/common/Types/MarkTypes';
import { StudentData } from '@/common/Types/UserTypes';
import { deleteLesson, deleteLessonDialog, updateLesson } from '@/common/Utils/LessonUtils';
import { deleteLessonMarksDialog, deleteMarks, getMarksCount } from '@/common/Utils/MarksUtils';
import { Button, ButtonCell, Cell, FixedLayout, Input, List, Navigation, Section } from '@telegram-apps/telegram-ui';
import { retrieveLaunchParams, usePopup } from '@tma.js/sdk-react';
import { useState, type FC } from 'react';
import { useMutation } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';



export const LessonsEditPage: FC = () => {

  const data: {lesson: LessonData, data: StudentData} = useLocation().state
  const { initDataRaw } = retrieveLaunchParams();

  const popup = usePopup()

  const navigate = useNavigate()

  const updateMutation = useMutation((diaryData: LessonUpdate) => updateLesson(diaryData, initDataRaw))
  const deleteMutation = useMutation(
    (deleteData: DeleteLessonData) => deleteLesson(deleteData, initDataRaw),
      {
          onSuccess: () => navigate(-1)
      }
  )
  const deleteMarksMutation = useMutation(
    (deleteData: DeleteMarkData) => deleteMarks(deleteData, initDataRaw),
      {
          onSuccess: () => navigate(-1)
      }
  )

  const [name, setName] = useState(data.lesson.name)

  return (
    <div>
      <List>
        <Section header='Основное'>
          <Input value={name} onChange={(e) => setName(e.target.value)} header='Название предмета'/>

        </Section>
        <Section header='Действия'>
          <Cell after={<Navigation/>} onClick={() => navigate('/marks', {state: data})}>Управление отметками</Cell>
          <ButtonCell mode='destructive' onClick={() => {
              deleteLessonMarksDialog(popup, deleteMarksMutation, {
                lesson_id: data.lesson.id,
                diary_id: data.lesson.attached_to_diary
            }, getMarksCount(data.lesson.marks))
          }}>Стереть все отметки</ButtonCell>
          <ButtonCell onClick={() => {
              deleteLessonDialog(popup, deleteMutation, {
                id: data.lesson.id,
                diary_id: data.lesson.attached_to_diary
            })
          }} mode='destructive'>Удалить предмет</ButtonCell>
        </Section>
      </List>
      
      <FixedLayout style={{padding: 16}}>
          <Button 
            size="l" 
            disabled={data.lesson.name == name || name.trim() == ''} 
            stretched 
            onClick={() => {
              updateMutation.mutate(
                {
                    id: data.lesson.id,
                    attached_to: data.data.user.diary_id,
                    fields: {
                      name: name
                    }
                }
            )
            }}>Сохранить</Button>
      </FixedLayout>
    </div>
  );
};
