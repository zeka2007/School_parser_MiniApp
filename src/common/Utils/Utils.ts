import { useEffect, useRef, useState } from "react";

export function useStateRef(initialValue: any): [any, React.Dispatch<any>, React.MutableRefObject<any>] {
  const [value, setValue] = useState(initialValue);

  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return [value, setValue, ref];
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
