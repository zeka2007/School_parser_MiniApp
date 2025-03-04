import { Button, ButtonCell, Chip, Select } from '@telegram-apps/telegram-ui';
import { useContext, useState, type FC } from 'react';
import './AddMarkStyle.css'
import MarkChip from '@/components/TG/MarkChip/MarkChip';
import MarkChipSlash from '@/components/TG/MarkChip/MarkChipSlash';
import { addMark, marksList } from '@/common/Utils/MarksUtils';
import { Lesson } from '@/common/Types/LessonTypes';
import { PlatformContext } from '@/components/App';


export const AddMarkBase: FC<{
    currentMark?: string,
    children: React.ReactNode
    onSubmit?: CallableFunction
  }> = ({currentMark, children, onSubmit = () => {}}) => {

  const [markIsSlash, setMarkIsSlash] = useState((currentMark?.includes('/')))
  const [firstMark, setFirstMark] = useState('-')
  const [secondMark, setSecondMark] = useState('-')
  const [mark, setMark] = useState('-')
  const [chooseFirst, setChooseFirst] = useState(true)
  // const [date, setDate] = useState(currentMark?.date ? new Date(Date.parse(currentMark?.date)).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10))


  const checkClick = (element: React.MouseEvent<HTMLDivElement>) => {
    
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
      {markIsSlash && <div style={{marginBottom: '16px'}}><div className='mark-center'><MarkChipSlash onClick={onSlashChipClick} chooseFirst={chooseFirst} first={firstMark} second={secondMark}/></div></div>}
      {!markIsSlash && <div style={{marginBottom: '16px'}}><div className='mark-center'><MarkChip>{mark}</MarkChip></div></div>}
      
      <div style={{margin: '0 14px'}}>
        {marksList.map((element, i) => <Chip onClick={(e) => checkClick(e)} key={i} style={{margin: 8}} className='mark-preview' mode='outline'>{element}</Chip>)}

        <Chip onClick={() => {
            setMark('-')
            setFirstMark('-')
            setSecondMark('-')
            setChooseFirst(true); 
            setMarkIsSlash(!markIsSlash)
          }} style={{margin: 8}} className='mark-preview' mode={markIsSlash ? 'mono' : 'outline'}>отметка через /'</Chip>

      </div>

      {children}

      {currentMark && <ButtonCell onClick={() => {}} style={{margin: 0}} mode='destructive'>Удалить отметку</ButtonCell>}
      <div style={{padding: '12px 22px 16px'}}>
        <Button
          onClick={() => onSubmit(markIsSlash ? `${firstMark}/${secondMark}` : mark)} // TODO: edit
        size="l" stretched>{ currentMark ? 'Изменить' : 'Добавить'}</Button>
      </div>
    </div>
  );
};


export const AddMarkByLesson: FC<{lessons: Lesson[], onSuccess?: CallableFunction}> = ({lessons, onSuccess = () => {}}) => {
  const platform = useContext(PlatformContext)
  const [lesson_id, setLessonId] = useState(0);

  const onSubmit = (mark: string) => {
    addMark(lesson_id, mark).then(() => onSuccess())
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