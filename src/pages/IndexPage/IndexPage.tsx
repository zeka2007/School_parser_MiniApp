import { Section, List, Cell, IconContainer, Spinner, Image, Selectable, ButtonCell, Snackbar, Title } from '@telegram-apps/telegram-ui';
import { useEffect, useState, type FC } from 'react';

import Error from '@mui/icons-material/Error'

import './IndexPage.css'
import { AxiosError } from 'axios';
import {retrieveLaunchParams} from '@tma.js/sdk-react';
import { StudentData } from '@/common/Types';

import StatContent from './StatContent';
import UtilsComponent from './UtilsContent';
import ActionsComponent from './ActionsComponent';
import { useQuery } from 'react-query';
import {  useNavigate, useSearchParams } from 'react-router-dom';
import { getUserData } from '@/common/Utils/UserUtils';


export const IndexPage: FC = () => {

  const { initDataRaw } = retrieveLaunchParams();
  const [showNotification, setShowNotification] = useState(false)
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()

  const { data, error, isLoading, isError} = useQuery<StudentData, AxiosError>('user', () => {
    let params = new URLSearchParams()
    const type = searchParams.get('type')
    const id = searchParams.get('id')
    if ( type && id ) {
      params.append('type', type)
      params.append('id', id)
    }
    return getUserData(initDataRaw, params)
  }, {keepPreviousData: true})

  useEffect(() => setShowNotification(isError), [isError])

  if (isLoading) {
      return <div id='loading-spinner'><Spinner size='l'/></div>
  }

  if (error && error.response?.status == 404) navigate('/diaries', {replace: true})

  else return (
    <List style={{
      height: '100vh',
      background: 'var(--tgui--secondary_bg_color)',

      maxWidth: '100%',
      margin: 'auto',
    }}>

      <Section>

        <Cell
            before={<Image size={40} src={''}><Title style={{color: 'var(--tgui--button_color)'}} weight='2' caps>{data?.user.description[0]}</Title></Image>}
            after={<Selectable defaultChecked/>}
            subtitle={data?.user.description}>{data?.user.type}</Cell>
        <ButtonCell onClick={() => navigate('/diaries')}>Управление дневниками</ButtonCell>

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
