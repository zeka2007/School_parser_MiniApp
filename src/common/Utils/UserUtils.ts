import axios from "axios";
import { Popup } from "@tma.js/sdk-react";
import { UseMutationResult } from "react-query";
import { StudentData } from "../Types/UserTypes";

export const getUserData = async (initDataRaw: string | undefined, params: URLSearchParams): Promise<StudentData> => {
    const {data} = await axios.get(`${import.meta.env.VITE_SERVER_HOST}/api/user/get-data/?${params.toString()}`, {headers: {
      'Authorization': initDataRaw
    }})

    return data;
}

export const deleteUserDialog = async (popup: Popup, mutation: UseMutationResult<any, unknown, void, unknown>) => {
  popup.open(
      {
          title: 'Удалить аккаунт?',
          message: 'Все дневники, а также отметки и уроки из виртуальных дневников будут удалены. Это действие не затронет ваш аккаунт Telegram и вы всегда сможете начать заново пользоваться ботом.',
          buttons: [
              {id: 'cancel', type: 'cancel'},
              {id: 'delete', type: 'destructive', text: 'Удалить'}
          ]
      }
  ).then(
      btnId => {
          if (btnId == 'delete') mutation.mutate()
      }
  )
}

export async function deleteUser (initDataRaw: string | undefined) {
  const { data } = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/api/user/delete/`, {},
      {
        headers: {
            'Authorization': initDataRaw
        }
      }
  )
  return data
}
