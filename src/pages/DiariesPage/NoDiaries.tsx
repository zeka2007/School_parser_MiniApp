import { Button, FixedLayout, Placeholder } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'

export const NoDiaries: FC = () => {

  const navigate = useNavigate()

  return (
    <div>
      <div className='center'>
        <Placeholder
          header='Дневников нет'
          description='Нажав на кнопку ниже, вы сможете создать виртуальный дневник или подключить существующий аккаунт SCHOOLS.BY'/>
      </div>
      
      <FixedLayout style={{padding: 16}}>
        <Button size="l" stretched onClick={() => navigate('/login')}>Добавить дневник</Button>
      </FixedLayout>
      
    </div>
  );
};
