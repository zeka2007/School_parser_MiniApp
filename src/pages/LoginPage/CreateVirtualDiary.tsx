import { List, Cell, Input, Switch, Text, Tooltip, FixedLayout, Button, Select } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import {
  retrieveLaunchParams,
  useHapticFeedback,
  usePopup,
} from '@tma.js/sdk-react';

import axios, { AxiosError } from 'axios'
import { useMutation } from 'react-query';
import { LoginData } from '@/common/Types';

async function sendData (data: {name: string}, initDataRaw: string | undefined) {
  await axios.post('http://localhost:5000/api/diary/create', data,
  {
    headers: {
      'Authorization': initDataRaw
    }
  }
)
}

const CreateVirtualDiary: FC = () => {


  const [nameValue, setNameValue] = useState("");

  const [isDisabled, setDisabled] = useState(false);

  const { initDataRaw } = retrieveLaunchParams();
  const haptic = useHapticFeedback()
  const popup = usePopup();

  const onError = () => {
      haptic.notificationOccurred('error')
      popup.open({
        title: 'Ошибка сервера',
        message: 'Произошла неизвестная ошибка, попробуйте повторить попытку позже.',
        buttons: [{
          id: 'ok',
          type: 'ok'
        }]
      })
    }
  

  const {mutate, isLoading} = useMutation(
    (data: {name: string}) => sendData(data, initDataRaw),
    {
      onError: onError,
      onSuccess: () => haptic.notificationOccurred('success') 
    }
  )

  useEffect(() => console.log(initDataRaw), [initDataRaw])

  React.useEffect(() => {
    if (nameValue === "") {
      setDisabled(true)
    }
    else {
      setDisabled(false)
    }
  }, [nameValue]);
  
  
  return (
    <div>
      <List style={{
        background: 'var(--tgui--bg_color)'
      }}>
        <Input 
          header="Имя"
          value={ nameValue }
          placeholder='Введите имя для дневника'
          onChange={ (e: React.FormEvent<HTMLInputElement>) => {
            setNameValue(e.currentTarget.value);
          }}/>
          <Select header='Скопировать из'>
            <option >Не копировать</option>
            <option >SCHOOLS.BY (412342)</option>
            <option >Виртуальный дневник #eva</option>
          </Select>
       
      </List>
      <FixedLayout style={{padding: '12px'}}>
        <Button
          size="l" 
          stretched 
          loading={isLoading}
          disabled={isLoading || isDisabled}
          onClick={() => mutate(
            {
              name: nameValue
            }
          )}>
            Создать
        </Button>
      </FixedLayout>
    </div>
  );
};

export default CreateVirtualDiary