import { Section, List, Cell, Navigation, IconContainer, Spinner, Accordion, Image, Selectable, ButtonCell, Snackbar, Placeholder, Text, Title } from '@telegram-apps/telegram-ui';
import { useEffect, useState, type FC } from 'react';

import { Error } from '@mui/icons-material';

import './IndexPage.css'
import axios from 'axios';
import {retrieveLaunchParams} from '@tma.js/sdk-react';
import { StudentData } from '@/common/Types';

import StatContent from './StatContent';
import UtilsComponent from './UtilsContent';
import ActionsComponent from './ActionsComponent';
import { useQuery } from 'react-query';


export const IndexPage: FC = () => {

  // const { initDataRaw } = retrieveLaunchParams();
  const initDataRaw = 'query_id=AAHzAJ5DAAAAAPMAnkPYzpuq&user=%7B%22id%22%3A1134428403%2C%22first_name%22%3A%22%D0%95%D0%B2%D0%B3%D0%B5%D0%BD%D0%B8%D0%B9%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22zeka2007%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1723827523&hash=3925bde0ed587958646e79b2a9c6b89e15283dcb70f61fa6720b1d14d692f3ae'
  const [showNotification, setShowNotification] = useState(false)

  const getData = async (): Promise<StudentData> => {
      const {data} = await axios.get('http://localhost:5000/api/user/get-data', {headers: {
        'Authorization': initDataRaw
      }})

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

  

  const { data, isLoading, isError} = useQuery('user', getData, {
    retry:false,
    keepPreviousData: true,
    refetchOnWindowFocus: false
  })

  console.log(isLoading)

  useEffect(() => setShowNotification(isError), [isError])

  if (isLoading) {
      return <div id='loading-spinner'><Spinner size='l'/></div>
  }

  return (
    <List style={{
      height: '100vh',
      background: 'var(--tgui--secondary_bg_color)',

      maxWidth: '100%',
      margin: 'auto',
    }}>

      <Section>

        <Cell
            before={<Image size={40} src={'https://avatars.githubusercontent.com/u/84640980?v=4'}/>}
            after={<Selectable defaultChecked/>}
            subtitle={data?.user.student_id}>Дневник SCHOOLS.BY</Cell>
        <ButtonCell>Управление дневниками</ButtonCell>

      </Section>

      
      {data?.lessons && data?.lessons.length > 0 &&
        <Section header={'Статистика четверти'}><StatContent data={data}/></Section>}
      
      <UtilsComponent data={data}/>

      <ActionsComponent data={data}/>
      
      {showNotification && <Snackbar 
        before={<IconContainer><Error/></IconContainer>}
        description='Доступны только виртуальные дневники'

        onClose={() => {setShowNotification(false)}}>Произошла ошибка</Snackbar>}
      </List>
  );
};
