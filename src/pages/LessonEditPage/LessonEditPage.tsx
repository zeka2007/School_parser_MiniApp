import { Lesson } from '@/common/Types/LessonTypes';
import { ButtonCell, Cell, Input, List, Navigation, Section } from '@telegram-apps/telegram-ui';
import { useState, type FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';



export const LessonsEditPage: FC = () => {

  const lesson: Lesson = useLocation().state

  const navigate = useNavigate()


  const [name, setName] = useState(lesson.lesson_name)

  return (
    <div>
      <List className='list'>
        <Section header='Основное'>
          <Input autoFocus value={name} onChange={(e) => setName(e.target.value)} header='Название предмета'/>

        </Section>
        <Section header='Действия'>
          <Cell after={<Navigation/>} onClick={() => navigate('/marks', {state: lesson})}>Управление отметками</Cell>
          <ButtonCell mode='destructive' onClick={() => {}}>Стереть все отметки</ButtonCell>
          <ButtonCell onClick={() => {}} mode='destructive'>Удалить предмет</ButtonCell>
        </Section>
      </List>
      
      {/* <FixedLayout style={{padding: 16}}>
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
      </FixedLayout> */}
    </div>
  );
};
