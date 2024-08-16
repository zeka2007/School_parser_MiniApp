import { StudentData, TransferData } from '@/common/Types';
import { calculateAverage } from '@/common/Utils/MarksUtils';
import { Accordion, Cell, LargeTitle, List, Placeholder, Section, Selectable, Spinner, Text } from '@telegram-apps/telegram-ui';
import { AccordionContent } from '@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionContent/AccordionContent';
import { AccordionSummary } from '@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionSummary/AccordionSummary';
import { retrieveLaunchParams } from '@tma.js/sdk-react';
import axios from 'axios';
import { useEffect, useState, type FC } from 'react';
import { useQuery } from 'react-query';
import { Link, useLocation, useNavigate, } from 'react-router-dom';

export const MarkStatsPage: FC = () => {
    const [expanded, setExpanded] = useState(false)
    const { initDataRaw } = retrieveLaunchParams();
    const { state } = useLocation()
    const dataForReturn: StudentData = state
    const navigate = useNavigate()
    const [data, setData] = useState<StudentData>(state)
    const [selectQuarter, setSelectQuarter] = useState(data.user.quarter - 1)
    const [quarterLoading, setQuarterLoading] = useState(false)

    const getData = async (): Promise<StudentData> => {
        const {data} = await axios.get('https://dummyjson.com/users')
  
        return data;
        // then((value) => {
        //   if (value.status == 200) {
        //     const newData:StudentData = value.data
        //     const best_lesson_data = getBestLesson(newData.lessons)
        //     newData.best_lesson = best_lesson_data
        //     setData(value.data)
        //     setLoading(false)
        //   }
        // }).catch(() => {
        //   setLoading(false)
        //   setErrorState(true)
        // })
    }
  
    const result = useQuery('test', getData)
    console.log(result)
    return (
        <List>
            <h1>{result.isLoading}</h1>
            {!data.lessons.length &&<Placeholder header='Отметок нет' description='Попробуйте изменить четверть'/>}
            <Accordion 
                onChange={(state: boolean) => {if (!quarterLoading) setExpanded(state) }} 
                expanded={expanded}>
                <AccordionSummary
                    disabled={quarterLoading}
                    after={quarterLoading && <Spinner size='s'/>}
                    style={{
                        background: 'var(--tgui--bg_color)',
                        margin: 0
                    }}>Четверть: {selectQuarter + 1}</AccordionSummary>
                <AccordionContent >
                    {[...Array(4)].map((_, i) => 
                        <Cell
                            key={i}
                            after={i == selectQuarter ? <Selectable defaultChecked/> : ''}
                            onClick={() => {
                                if (i != selectQuarter) {
                                    setSelectQuarter(i)
                                    setQuarterLoading(true)
                                    axios.get('http://localhost:5000/api/get-user-data/?quarter=' + (i + 1) , {headers: {
                                        'Authorization': initDataRaw
                                    }}).then((value) => {
                                        if (value.status == 200) {
                                            const newData = value.data as StudentData
                                            var oldData = data
                                         
                                            oldData.lessons = newData.lessons
                                            oldData.user = newData.user
                                            setData(oldData)
                                            setQuarterLoading(false) 
                                        }
                                    })
                                    
                                }
                                setExpanded(false)
                            }}>{i+1} четверть</Cell>)}
                </AccordionContent>
            </Accordion>

            {data.lessons.map((val) =>
                <Cell 
                    key={val.lesson_name} 
                    description={"Отметок: " + val.marks.length} 
                    onClick={() => navigate('mark-stat-full', {state: val})}
                    after={<Text>{calculateAverage(val.marks)}</Text>}>{val.lesson_name}</Cell>
            )}
        </List>
    );
};
