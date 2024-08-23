import { List, Cell, Input, Switch, Text, Tooltip, FixedLayout, Button, Select } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import {
  retrieveLaunchParams,
  useHapticFeedback,
  usePopup,
} from '@tma.js/sdk-react';

import { useMutation, useQuery } from 'react-query';
import { DiaryCreate, DiaryData } from '@/common/Types/DiaryTypes';
import { useNavigate } from 'react-router-dom';
import { createDiary, getDiaries } from '@/common/Utils/DiaryUtils';

const CreateVirtualDiary: FC = () => {

  const { initDataRaw } = retrieveLaunchParams();

  const navigate = useNavigate()


  const [nameValue, setNameValue] = useState("");
  const [optionValue, setOptionValue] = useState("");
  const [optionType, setOptionType] = useState<string | null>("");

  const [isDisabled, setDisabled] = useState(false);

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
  
  // const diaries = useQuery('diaries', () => getDiaries(initDataRaw), {retry: true})
  
  const {mutate, isLoading} = useMutation(
    (data: DiaryCreate) => createDiary(data, initDataRaw),
    {
      onError: onError,
      onSuccess: (responce) => {
        haptic.notificationOccurred('success') 
        navigate(`/?type=1&id=${responce.id}`, {replace: true})
      }
    }
  )

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
          onChange={ (e: React.FormEvent<HTMLInputElement>) => setNameValue(e.currentTarget.value)}/>
          {/* <Select header='Скопировать из' onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setOptionValue(e.target.value)
              setOptionType(e.target.options[e.target.selectedIndex].getAttribute('data-type'))
            }
          }>
            <option key={0} value={'no'}>Не копировать</option>
            { diaries.data && diaries.data?.map((el, i) => <option key={i+1} data-type={el.type} value={el.id.toString()}>{`${el.type} (${el.name})`}</option>) }
          </Select> */}
       
      </List>
      <FixedLayout style={{padding: 16}}>
        <Button
          size="l" 
          stretched 
          loading={isLoading}
          disabled={isLoading || isDisabled}
          onClick={() => {
            let extend;
            if (optionValue != 'no') extend = {
              type: optionType,
              id: Number(optionValue)
            }
            mutate(
            {
              name: nameValue,
              extend: extend
            }
          )}}
          >
            Создать
        </Button>
      </FixedLayout>
    </div>
  );
};

export default CreateVirtualDiary