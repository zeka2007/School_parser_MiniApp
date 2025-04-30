import { Lesson } from '@/common/Types/LessonTypes';
import { addLesson, getLessons } from '@/common/Utils/LessonUtils';
import { mainButton } from '@telegram-apps/sdk-react';
import { Button, Cell, FixedLayout, Input, List, Modal, Navigation, Placeholder, Skeleton } from '@telegram-apps/telegram-ui';
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader';
import { useEffect, useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';

export const LessonsPage: FC = () => {

  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [modalState, setModalState] = useState(false)

  const [lessons, setLessons] = useState<Lesson[]>(JSON.parse(sessionStorage.getItem('lessons') ?? '[]'))
  const [isLoading, setLoadingState] = useState(sessionStorage.getItem('lessons') == null)

  useEffect(() => {
    if (!mainButton.isMounted()) mainButton.mount()
    mainButton.setParams({ isVisible: false })
    getLessons().then((l) => {
      setLessons(l)
      sessionStorage.setItem('lessons', JSON.stringify(l))
      setLoadingState(false)
    })
  }, [])

  return (
    <div>
      <List className='list-padding'>
        <Placeholder
          header='Управление предметами'
          description='На этой странице вы можете создать, изменить или удалить учебный предмет' />

        {isLoading && [...Array(3)].map((_, i) => <Cell key={i}><Skeleton withoutAnimation visible>{new Array(50).join('*')}</Skeleton></Cell>)}

        {!isLoading && lessons.map((lesson, index) => <Cell
          key={index}
          after={<Navigation />}
          onClick={() => navigate('/lesson-edit', { state: lesson })}
        >{lesson.lesson_name}
        </Cell>)}
      </List>

      <FixedLayout style={{ padding: 16 }}><Button
        size="l"
        stretched
        onClick={() => setModalState(true)}>Добавить предмет</Button> </FixedLayout>


      <Modal
        header={<ModalHeader>Добавление предмета</ModalHeader>}
        onOpenChange={(is_open) => setModalState(is_open)}
        open={modalState}
      >
        <div >
          <Input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder='Введите название предмета' header='Название предмета' />
          <div style={{ padding: 16 }}>
            <Button onClick={() => {
              addLesson(name).then(() => {
                const newLesson = [
                  {
                    lesson_name: name,
                    id: lessons.length > 0 ? lessons[lessons.length - 1].id + 1 : 0,
                    marks: []
                  }
                ]
                const data = lessons.concat(newLesson)
                setLessons(data)
                setModalState(false)
              })
            }} disabled={name.trim().length === 0} size="l" stretched>Добавить</Button>
          </div>
        </div>

      </Modal>
    </div>
  );
};
