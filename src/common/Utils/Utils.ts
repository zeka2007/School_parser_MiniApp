import { Popup } from "@tma.js/sdk-react";
import { useEffect, useRef, useState } from "react";

export function useStateRef(initialValue: any): [any, React.Dispatch<any>, React.MutableRefObject<any>] {
  const [value, setValue] = useState(initialValue);

  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return [value, setValue, ref];
}

export function showErrorDialog(popup: Popup) {
  popup.open(
    {
      title: 'Произошла ошибка',
      message: 'Повторите попытку позже'
    }
  )
}

export function randomInteger(min: number, max: number): number {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

export function getWeekDay(date: Date): string {
  const days = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
  ];

  return days[date.getDay()];
}

export function getRandomString(minLenght: number = 20, maxLenght: number = 50): string {
  const length = Math.floor(Math.random() * (maxLenght - minLenght) + minLenght)
  return new Array(length).join('a')
}
