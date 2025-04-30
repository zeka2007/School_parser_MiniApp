import { showDeleteLessonDialog } from '@/common/Dialogs/LessonDialogs';
import { showDeleteMarksDialog } from '@/common/Dialogs/MarkDialogs';
import { Lesson } from '@/common/Types/LessonTypes';
import { editLessonName, removeLesson } from '@/common/Utils/LessonUtils';
import { getMarksFromLesson, removeAllMarksFromLesson } from '@/common/Utils/MarksUtils';
import { ButtonCell, Cell, Input, List, Navigation, Section, Snackbar } from '@telegram-apps/telegram-ui';
import { useEffect, useRef, useState, type FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { hapticFeedback, mainButton, themeParams } from '@telegram-apps/sdk-react';
import './LessonEditPage.css'

export const LessonsEditPage: FC = () => {

  const lesson: Lesson = useLocation().state

  const navigate = useNavigate()
  const [name, setName] = useState(lesson.lesson_name)
  const [snackbarState, setSnackbarState] = useState(false)
  const nameRef = useRef(name)

  nameRef.current = name;

  const editNameListenner = () => {
    mainButton.setParams({ isLoaderVisible: true })
    editLessonName(lesson.id, nameRef.current).then(() => {
      mainButton.setParams({ isVisible: false })
      setSnackbarState(true)
      lesson.lesson_name = nameRef.current
      hapticFeedback.notificationOccurred("success")
    })
  }

  useEffect(() => {
    getMarksFromLesson(lesson.id).then((result) => {
      lesson.marks = result
    })
    mainButton.setParams(
      {
        text: 'Сохранить',
        backgroundColor: themeParams.accentTextColor()
      }
    )
    mainButton.onClick(editNameListenner)
    return () => mainButton.offClick(editNameListenner)
    
  }, [])


  useEffect(() => mainButton.setParams({ isVisible: !(lesson.lesson_name == name || name.trim() == '') }), [name])

  return (
    <div>
      <List className='list'>

        <Section header='Основное'>
          <Input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            header='Название предмета' />

        </Section>
        <Section header='Действия'>
          <Cell after={<Navigation />} onClick={() => navigate('/marks', { state: lesson })}>Управление отметками</Cell>
          <ButtonCell mode='destructive' onClick={() => showDeleteMarksDialog(() => removeAllMarksFromLesson(lesson.id).then(() => navigate(-1)))}>Стереть все отметки</ButtonCell>
          <ButtonCell onClick={() => showDeleteLessonDialog(() => removeLesson(lesson.id).then(() => navigate(-1)))} mode='destructive'>Удалить предмет</ButtonCell>
        </Section>
      </List>
      
      {snackbarState && <Snackbar onClose={() => setSnackbarState(false)}>Успешно сохранено</Snackbar>}
    </div>
  );
};
