import { List, Placeholder, Select } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import DiaryLogin from './DiaryLogin';
import CreateVirtualDiary from './CreateVirtualDiary';



export const LoginPage: FC = () => {


  const CHOOSE_SCHOOLS_BY = 'SCHOOLS_BY';
  const CHOOSE_VIRTUAL = 'VIRTUAL';

  const [type, setType] = useState(CHOOSE_SCHOOLS_BY);

  
  return (
    <div>
      <List style={
        {
          background: 'var(--tgui--bg_color)',
        }
      }>
        <Placeholder
          header='Давайте начнем'
          description='Вы можете войти в существующий аккаунт SCHOOLS.BY или создать виртуальный дневник'/>
      </List>
      <Select value={type} header='Тип дневника' onChange={(e) => setType(e.target.value)}>
        <option value={CHOOSE_SCHOOLS_BY}>Аккаунт SCHOOLS.BY</option>
        <option value={CHOOSE_VIRTUAL}>Виртуальный дневник</option>
      </Select>
      {type == CHOOSE_SCHOOLS_BY && <DiaryLogin/>}
      {type == CHOOSE_VIRTUAL && <CreateVirtualDiary/>}
    </div>
  );
};
