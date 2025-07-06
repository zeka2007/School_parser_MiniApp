import { Button, ButtonCell, Chip, Select } from '@telegram-apps/telegram-ui';
import { useContext, useState, type FC } from 'react';
import './AddMarkStyle.css'
import MarkChip from '@/components/TG/MarkChip/MarkChip';
import MarkChipSlash from '@/components/TG/MarkChip/MarkChipSlash';
import { addMark, getConstMarksList} from '@/common/Utils/MarksUtils';
import { Lesson } from '@/common/Types/LessonTypes';
import { PlatformContext } from '@/components/App';
import { showDeleteTemporaryMarkDialog } from '@/common/Dialogs/MarkDialogs';
import { hapticFeedbackImpactOccurred } from '@telegram-apps/sdk-react';


export const AddMarkBase: FC<{
  currentMark?: string,
  children?: React.ReactNode
  onSubmit?: CallableFunction
  onDelete?: CallableFunction
}> = ({ currentMark, children, onSubmit = () => { }, onDelete = () => { } }) => {

  const isSlash = currentMark?.includes('/')

  const marksList = getConstMarksList()

  const [markIsSlash, setMarkIsSlash] = useState(isSlash)
  const [firstMark, setFirstMark] = useState(isSlash ? currentMark?.split('/')[0] : '-')
  const [secondMark, setSecondMark] = useState(isSlash ? currentMark?.split('/')[1] : '-')
  const [mark, setMark] = useState(isSlash || currentMark == null ? '-' : currentMark)
  const [chooseFirst, setChooseFirst] = useState(true)

  const checkClick = (element: React.MouseEvent<HTMLDivElement>) => {

    hapticFeedbackImpactOccurred('light')

    const text = element.currentTarget.textContent == null ? '' : element.currentTarget.textContent

    if (markIsSlash) {
      if (chooseFirst) {
        setFirstMark(text)
        setChooseFirst(false)
      }
      else setSecondMark(text)
    }
    else setMark(text)
  }

  const onSlashChipClick = (index: 0 | 1) => setChooseFirst(index == 0)
  return (
    <div>
      {markIsSlash && <div style={{ marginBottom: '16px' }}><div className='mark-center'><MarkChipSlash onClick={onSlashChipClick} chooseFirst={chooseFirst} first={firstMark} second={secondMark} /></div></div>}
      {!markIsSlash && <div style={{ marginBottom: '16px' }}><div className='mark-center'><MarkChip>{mark}</MarkChip></div></div>}

      <div style={{ margin: '0 14px' }}>
        {marksList.map((element, i) => <Chip onClick={(e) => checkClick(e)} key={i} style={{ margin: 8 }} className='mark-preview' mode='outline'>{element}</Chip>)}

        <Chip onClick={() => {
          hapticFeedbackImpactOccurred('medium')
          setMark('-')
          setFirstMark('-')
          setSecondMark('-')
          setChooseFirst(true);
          setMarkIsSlash(!markIsSlash)
        }} style={{ margin: 8 }} className='mark-preview' mode={markIsSlash ? 'mono' : 'outline'}>отметка через /</Chip>

      </div>

      {children}

      {currentMark && <ButtonCell
        onClick={() => {
          hapticFeedbackImpactOccurred('medium')
          showDeleteTemporaryMarkDialog(onDelete)
        }}
        style={{ padding: '0 22px' }}
        mode='destructive'>Удалить отметку</ButtonCell>}
      <div style={{ padding: '12px 22px 16px' }}>
        <Button
          onClick={() => onSubmit(markIsSlash ? `${firstMark}/${secondMark}` : mark)}
          disabled={markIsSlash ? (firstMark == '-' || secondMark == '-') : mark == '-'} size="l" stretched>{currentMark ? 'Изменить' : 'Добавить'}</Button>
      </div>
    </div>
  );
};


export const AddMarkByLesson: FC<{ lessons: Lesson[], onSuccess?: CallableFunction }> = ({ lessons, onSuccess = () => { } }) => {
  const platform = useContext(PlatformContext)
  const [lesson_id, setLessonId] = useState(0)

  const onSubmit = (mark: string) => {
    addMark(lesson_id, mark).then(() => onSuccess(lesson_id, mark))
  }

  return (
    <AddMarkBase onSubmit={onSubmit}>
      <Select onChange={(e) => {
        e.preventDefault()
        setLessonId(Number(e.target.value))
      }} className={platform == 'ios' ? 'select-ios' : ''}>
        {lessons.map((lesson, index) => <option key={index} value={lesson.id}>{lesson.lesson_name}</option>)}
      </Select>
    </AddMarkBase>
  )
}