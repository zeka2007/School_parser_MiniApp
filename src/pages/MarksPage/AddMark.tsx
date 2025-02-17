import { Button, ButtonCell, Chip, List } from '@telegram-apps/telegram-ui';
import { useState, type FC } from 'react';
import './AddMarkStyle.css'
import MarkChip from '@/components/TG/MarkChip/MarkChip';
import MarkChipSlash from '@/components/TG/MarkChip/MarkChipSlash';
import { usePopup } from '@tma.js/sdk-react';
import { marksList } from '@/common/Utils/MarksUtils';
import { Lesson } from '@/common/Types/LessonTypes';



export const AddMark: FC<{
    lesson: Lesson, 
    currentMark?: string,
    onSuccess?: CallableFunction
  }> = ({lesson, currentMark, onSuccess = () => {}}) => {

  const [markIsSlash, setMarkIsSlash] = useState((currentMark?.includes('/')))
  const popup = usePopup()
  const [firstMark, setFirstMark] = useState('-')
  const [secondMark, setSecondMark] = useState('-')
  const [mark, setMark] = useState('-')
  const [chooseFirst, setChooseFirst] = useState(true)
  // const [date, setDate] = useState(currentMark?.date ? new Date(Date.parse(currentMark?.date)).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10))


  const checkClick = (element: React.MouseEvent<HTMLDivElement>, index: number) => {
    const text = element.currentTarget.textContent == null ? '' : element.currentTarget.textContent
    if (index > 9) {
      setMarkIsSlash(false)
      setMark(text)
    }
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
    <List style={{margin: 0}}>
      {markIsSlash && <div style={{marginBottom: '16px'}}><div className='mark-center'><MarkChipSlash onClick={onSlashChipClick} chooseFirst={chooseFirst} first={firstMark} second={secondMark}/></div></div>}
      {!markIsSlash && <div style={{marginBottom: '16px'}}><div className='mark-center'><MarkChip>{mark}</MarkChip></div></div>}
      
      <div style={{margin: '0 16px'}}>
        {marksList.map((element, i) => <Chip onClick={(e) => checkClick(e, i)} key={i} style={{margin: 8}} className='mark-preview' mode='outline'>{element}</Chip>)}

        <Chip onClick={() => {
            setMark('-')
            setFirstMark('-')
            setSecondMark('-')
            setChooseFirst(true); 
            setMarkIsSlash(!markIsSlash)
          }} style={{margin: 8}} className='mark-preview' mode={markIsSlash ? 'mono' : 'outline'}>отметка через /'</Chip>
       
      </div>
      {/* <div style={{margin: 0}}><Input header='Дата отметки' value={date} onChange={(e) => setDate(e.target.value)} type='date'/></div> */}
      {currentMark && <ButtonCell onClick={() => {}} style={{margin: 0}} mode='destructive'>Удалить отметку</ButtonCell>}
      <div style={{padding: 16}}>
        <Button
          onClick={() => {
            // const createData = {
            //   first_value: markIsSlash ? Number(firstMark) : ( Number(mark) ? Number(mark) : null),
            //   second_value: markIsSlash ? Number(secondMark) : null,
            //   display_value: markIsSlash ? null : mark,
            //   quarter: quarter,
            //   diary_id: lesson.attached_to_diary,
            //   attached_to_lesson: lesson.id,
            //   date: date
            // }
            // if (!currentMark) createMutation.mutate(createData)
            // else updateMutation.mutate({id: currentMark._id, data: createData})
          }}  
        size="l" stretched>{ currentMark ? 'Изменить' : 'Добавить'}</Button>
      </div>
    </List>
    
  );
};
