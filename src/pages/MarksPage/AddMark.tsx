import { Button, ButtonCell, Chip, Input, List } from '@telegram-apps/telegram-ui';
import { useState, type FC } from 'react';
import './AddMarkStyle.css'
import MarkChip from '@/components/TG/MarkChip/MarkChip';
import MarkChipSlash from '@/components/TG/MarkChip/MarkChipSlash';
import { createMark, deleteMarks, deleteOneMarkDialog, marksList, updateMark } from '@/common/Utils/MarksUtils';
import { useMutation } from 'react-query';
import { retrieveLaunchParams, usePopup } from '@tma.js/sdk-react';
import { DeleteMarkData, MarkCreate, UpdateMarkData } from '@/common/Types/MarkTypes';
import { LessonData } from '@/common/Types/LessonTypes';
import { Mark } from '@/common/Types';



export const AddMark: FC<{
    lesson: LessonData, 
    quarter: number, 
    currentMark?: Mark,
    onSuccess?: CallableFunction
  }> = ({lesson, quarter, currentMark, onSuccess = () => {}}) => {

  const [markIsSlash, setMarkIsSlash] = useState((currentMark?.second_value != undefined) && (currentMark?.first_value != undefined))
  const { initDataRaw } = retrieveLaunchParams()
  const popup = usePopup()
  const [firstMark, setFirstMark] = useState(currentMark?.first_value ? currentMark.first_value : '-')
  const [secondMark, setSecondMark] = useState(currentMark?.second_value ? currentMark.second_value : '-')
  const [mark, setMark] = useState((currentMark?.first_value || currentMark?.display_value) ? currentMark?.display_value : '-' )
  const [chooseFirst, setChooseFirst] = useState((currentMark?.second_value != undefined) && (currentMark?.first_value != undefined))
  const [date, setDate] = useState(currentMark?.date ? new Date(Date.parse(currentMark?.date)).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10))

  const createMutation = useMutation(
    (data: MarkCreate) => createMark(data, initDataRaw),
    {
      onSuccess: () => onSuccess()
    }
  )

  const deleteMutation = useMutation(
    (data: DeleteMarkData) => deleteMarks(data, initDataRaw),
    {
      onSuccess: () => onSuccess()
    }
  )

  const updateMutation = useMutation(
    (data: UpdateMarkData) => updateMark(data, initDataRaw),
    {
      onSuccess: () => onSuccess()
    }
  )

  const buttonDisabled = (): boolean => {
    if (!Date.parse(date)) return true

    if(markIsSlash) {
      return firstMark == '-' || secondMark == '-'
    }
    return mark == '-'
  }

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
      <div style={{margin: 0}}><Input header='Дата отметки' value={date} onChange={(e) => setDate(e.target.value)} type='date'/></div>
      {currentMark && <ButtonCell onClick={() => deleteOneMarkDialog(popup, deleteMutation, {diary_id: lesson.attached_to_diary, lesson_id: lesson.id, mark_ids: [currentMark._id]})} style={{margin: 0}} mode='destructive'>Удалить отметку</ButtonCell>}
      <div style={{padding: 16}}>
        <Button
          onClick={() => {
            const createData = {
              first_value: markIsSlash ? Number(firstMark) : ( Number(mark) ? Number(mark) : null),
              second_value: markIsSlash ? Number(secondMark) : null,
              display_value: markIsSlash ? null : mark,
              quarter: quarter,
              diary_id: lesson.attached_to_diary,
              attached_to_lesson: lesson.id,
              date: date
            }
            if (!currentMark) createMutation.mutate(createData)
            else updateMutation.mutate({id: currentMark._id, data: createData})
          }} 
          loading={createMutation.isLoading} 
          disabled={buttonDisabled()} 
        size="l" stretched>{ currentMark ? 'Изменить' : 'Добавить'}</Button>
      </div>
    </List>
    
  );
};
