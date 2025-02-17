import { ButtonCell, List, Section } from '@telegram-apps/telegram-ui';
import { type FC } from 'react';



export const SettingsPage: FC = () => {


  return (
    <List>
      <Section header='Настройки'>
        <ButtonCell 
          onClick={() => {}}
          mode='destructive'>Удалить все данные</ButtonCell>
        
      </Section>

      
    </List>
  );
};
