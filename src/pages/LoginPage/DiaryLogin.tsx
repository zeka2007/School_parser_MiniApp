import { List, Cell, Input, Switch, Text, Tooltip, FixedLayout, Button } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import React, { useState } from 'react';
import {
  retrieveLaunchParams,
  useHapticFeedback,
  usePopup,
} from '@tma.js/sdk-react';

import { AxiosError } from 'axios'
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { LoginData } from '@/common/Types/LoginTypes';
import { LoginUser } from '@/common/Utils/LoginUtils';

const DiaryLogin: FC = () => {


  const tipRef = React.createRef<HTMLElement>();
  const navigate = useNavigate()
  const [tipState, setTipState] = React.useState(false);

  const [loginVal, setLoginVal] = useState("");
  const [passworVal, setPasswordVal] = useState("");
  const [switchState, setSwitchState] = useState(false);

  const [isDisabled, setDisabled] = useState(false);

  const { initDataRaw } = retrieveLaunchParams();
  const haptic = useHapticFeedback()
  const popup = usePopup();

  const onError = (err: AxiosError) => {
      haptic.notificationOccurred('error')
      if (err.response?.status == 403) {
        popup.open({
          title: 'Ошибка входа',
          message: 'Проверьте данные и попробуйте снова',
          buttons: [{
            id: 'ok',
            type: 'ok'
          }]
        })
      }
      else {
        popup.open({
          title: 'Ошибка сервера',
          message: 'Произошла неизвестная ошибка, попробуйте повторить попытку позже.',
          buttons: [{
            id: 'ok',
            type: 'ok'
          }]
        })
      }
    }
  

  const {mutate, isLoading} = useMutation(
    (loginData: LoginData) => LoginUser(loginData, initDataRaw),
    {
      onError: onError,
      onSuccess: (responce) => {
        haptic.notificationOccurred('success') 
        navigate(`/?type=0&id=${responce.id}`, {replace: true})
      } 
    }
  )

  React.useEffect(() => {
    if (loginVal === "" || passworVal === "") {
      setDisabled(true)
    }
    else {
      setDisabled(false)
    }
  }, [loginVal, passworVal]);
  
  
  return (
    <div>
      <List style={{
        background: 'var(--tgui--bg_color)',
      }}>
        <Input 
          style={{
            margin: 0
          }}
          header="Логин"
          value={ loginVal }
          onChange={ (e: React.FormEvent<HTMLInputElement>) => {
            setLoginVal(e.currentTarget.value);
          }}/>
        <Input 
          value={ passworVal }
          type='password'
          onChange={ (e: React.FormEvent<HTMLInputElement>) => {
            setPasswordVal(e.currentTarget.value);
          }}
          header="Пароль"/>
        <Cell 
          before={ <Text>
                        Сохранить логин и пароль
                    </Text>}
          after={ <Switch 
                      checked={ switchState }
                      onChange={ (e: React.ChangeEvent<HTMLInputElement>) => {
                        setSwitchState(e.currentTarget.checked)
                      }}/> }
          ref={tipRef}
          onClick={() => setTipState(!tipState)}
        />
        {tipState && <Tooltip
          mode="light"
          placement="bottom"
          targetRef={tipRef}
        >
          Логин и пароль нужны только для авторизации, так как дальше будет использован токен.
          Если вы откажитесь от сохранения данных, то в случае проблем с токеном вам нужно будет авторизоваться заново.
        </Tooltip>
      }
      </List>
      <FixedLayout style={{padding: 16}}>
        <Button
          size="l" 
          stretched 
          loading={isLoading}
          disabled={isLoading || isDisabled}
          onClick={() => mutate(
            {
              login: loginVal,
              password: passworVal,
              saveData: switchState
            }
          )}>
            Войти
        </Button>
      </FixedLayout>
    </div>
  );
};

export default DiaryLogin