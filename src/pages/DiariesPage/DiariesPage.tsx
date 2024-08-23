import { convertType, getDiaries } from '@/common/Utils/DiaryUtils';
import { Button, Cell, FixedLayout, List, Placeholder, Title, Image, Skeleton } from '@telegram-apps/telegram-ui';
import { retrieveLaunchParams } from '@tma.js/sdk-react';
import type { FC } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { NoDiaries } from './NoDiaries';

export const DiariesPage: FC = () => {

  const navigate = useNavigate()
  const { initDataRaw } = retrieveLaunchParams();

  const {data, isLoading} = useQuery('diaries', () => getDiaries(initDataRaw))
    
  if (data?.length == 0) return (<NoDiaries></NoDiaries>)

  return (
    <div>
      <List style={{ paddingBottom: 82, background: 'var(--tgui--bg_color)'}}>
        <Placeholder
          header='Управление дневниками'
          description='На этой странице вы можете переключиться на существующий дневник или добавть новый'/>

        {isLoading && [...Array(3)].map((_, i) => <Cell
          key={i}
          before={<Skeleton visible={isLoading}><Image size={40} src={''}/></Skeleton>}
          subtitle={<Skeleton visible={isLoading}>SCHOOLS.BY</Skeleton>}><Skeleton visible={isLoading}>DIARY FULL NAME</Skeleton></Cell>)}

        {data?.map((diary, i) => <Cell
          key={i}
          onClick={() => navigate(`/?type=${convertType(diary.type)}&id=${diary.id}`)}
          before={<Image size={40} src={''}><Title style={{color: 'var(--tgui--button_color)'}} weight='2' caps>{diary.type == 'SCHOOLS.BY' ? 'S' : diary.name[0]}</Title></Image>}
          subtitle={diary.name}>{diary.type}</Cell>)}

      </List>
      
      <FixedLayout style={{padding: 16}}>
        <Button size="l" stretched onClick={() => navigate('/login')}>Добавить дневник</Button>
      </FixedLayout>
      
    </div>
  );
};
