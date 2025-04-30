import { useEffect, useRef, useState, type FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Cell, List, Modal, Multiselectable, Placeholder, Section, Text, Title } from '@telegram-apps/telegram-ui';
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader';
import { Lesson } from '@/common/Types/LessonTypes';
import { AddMarkBase } from '@/components/TG/AddMark/AddMark';
import { MainPlaceholder } from '@/components/TG/MainPlaceholder/MainPlaceholder';
import { addMark, deleteMark } from '@/common/Utils/MarksUtils';
import { hapticFeedback, mainButton, themeParams } from '@telegram-apps/sdk-react';
import { showDeleteFewMarksDialog } from '@/common/Dialogs/MarkDialogs';
import { MarkWithID } from '@/common/Types/MarkTypes';

export const MarksPage: FC = () => {

  const lesson: Lesson = useLocation().state
  const [lessonMarks, setLessonMarks] = useState<MarkWithID[]>(lesson.marks.map(m => { return { id: crypto.randomUUID(), value: m } }))
  const [modalState, setModalState] = useState(false)
  const [choosedMarks, setChoosedMarks] = useState<number[]>([])
  const choosedMarksRef = useRef(choosedMarks)
  const lessonMarksRef = useRef(lessonMarks)

  const changeState = (index: number) => {
    const isFind = choosedMarks.includes(index)
    if (isFind) setChoosedMarks(choosedMarks.filter(v => v !== index))
    else setChoosedMarks([...choosedMarks, index])
  }

  const deleteMarks = () => {
    showDeleteFewMarksDialog(() => {
      deleteMark(lesson.id, choosedMarksRef.current)
      setLessonMarks(lessonMarksRef.current.filter((_, i) => !choosedMarksRef.current.includes(i)))
      setChoosedMarks([])
      hapticFeedback.notificationOccurred('success')
    }, choosedMarksRef.current.length)

  }

  useEffect(() => {
    mainButton.setParams(
      {
        isVisible: choosedMarks.length > 0,
        text: 'Удалить',
        backgroundColor: themeParams.destructiveTextColor()
      }
    )
    mainButton.onClick(deleteMarks)

    return () => mainButton.offClick(deleteMarks)

  }, [])

  useEffect(() => {
    lessonMarksRef.current = lessonMarks
  }, [lessonMarks])

  useEffect(() => {
    choosedMarksRef.current = choosedMarks

    mainButton.setParams(
      {
        isVisible: choosedMarks.length > 0,
      }
    )
  }, [choosedMarks])

  return (
    <div>
      <List className='list'>
        <MainPlaceholder>
          <div style={{ padding: 16 }}>
            <Placeholder
              header='Управление отметками'
              description='На этой странице можно добавлять отметки, а также удалять несколько штук сразу' />
            <Button
              size="l"
              stretched
              onClick={() => setModalState(true)}>Добавить отметку</Button>
          </div>
        </MainPlaceholder>

        {lessonMarks.length == 0 && <MainPlaceholder>
          <Placeholder header={<Title weight='2'>Отметок нет</Title>} />
        </MainPlaceholder>}

        <Section>
          {lessonMarks.map((mark, index) =>
            <Cell Component='label' before={<Multiselectable onChange={() => changeState(index)} checked={choosedMarks.includes(index)} />} key={mark.id} after={<Text>{mark.value}</Text>}>Отметка</Cell>
          )}
        </Section>

      </List>

      <Modal
        header={<ModalHeader>Добавление отметки</ModalHeader>}
        onOpenChange={(is_open) => {
          setModalState(is_open)
        }}
        open={modalState}
      >
        <div >
          <AddMarkBase onSubmit={(mark: string) => {
            addMark(lesson.id, mark)
            setLessonMarks([...lessonMarks, { id: crypto.randomUUID(), value: mark }])
            setModalState(false)
          }} />
        </div>
      </Modal>
    </div>
  );
};
