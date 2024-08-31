import { useState, type FC } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { QuaretrChoose } from './QuarterChoose';
import { Cell, List, Placeholder, Text} from '@telegram-apps/telegram-ui';
import { useQuery } from 'react-query';
import { getUserData } from '@/common/Utils/UserUtils';
import { retrieveLaunchParams } from '@tma.js/sdk-react';
import { convertType } from '@/common/Utils/DiaryUtils';
import { calculateAverage, calculateSumAndCount } from '@/common/Utils/MarksUtils';
import { StudentData } from '@/common/Types/UserTypes';

export const MarkStatsPage: FC = () => {

    const state: StudentData = useLocation().state
    const navigatePath = useSearchParams()[0].get('navto')
    const title = useSearchParams()[0].get('title')
    const description = useSearchParams()[0].get('description')
    const navigate = useNavigate()
    const { initDataRaw } = retrieveLaunchParams();
    const [quarter, setQuarter] = useState(state.user.quarter)

    const query = useQuery(['lesson-marks', quarter], () => {
        let params = new URLSearchParams();
        
        params.append('type', convertType(state.user.type).toString())
        params.append('id', state.user.diary_id.toString())
        params.append('quarter', quarter.toString())
        return getUserData(initDataRaw, params)
    }, {initialData: quarter == state.user.quarter ? state : undefined})

    return (
        <List>
            {(title || description) && <Placeholder header={title} description={description}/>}

            <QuaretrChoose state={state} query={query} callback={(quarter: number) =>{ setQuarter(quarter)}}/>

            { query.data && query.data.lessons.length == 0 && <Placeholder header='Отметок нет' description='Попробуйте изменить четверть'/>}

            {query.data?.lessons.map((val) => <Cell 
                    key={val.lesson_name} 
                    description={"Отметок: " + calculateSumAndCount(val.marks).length}
                    onClick={() => navigate(navigatePath ? navigatePath : '/', {state: val})}
                    after={<Text>{calculateAverage(val.marks)}</Text>}>{val.lesson_name}</Cell>
            )}
        </List>
    );
};
