import { deleteAllDiaries, deleteAllDiariesDialog, getDiaries, getMainDiary, updateDiary } from '@/common/Utils/DiaryUtils';
import { deleteUser, deleteUserDialog } from '@/common/Utils/UserUtils';
import { Avatar, ButtonCell, Cell, Image, List, Modal, Navigation, Section, Selectable, Skeleton, Title } from '@telegram-apps/telegram-ui';
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader';
import { initInitData, initUtils, retrieveLaunchParams, useInitData, useMiniApp, usePopup } from '@tma.js/sdk-react';
import { useState, type FC } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';



export const SettingsPage: FC = () => {

  const initData = useInitData()
  const {initDataRaw} = retrieveLaunchParams()
  const miniApp = useMiniApp()
  const popup = usePopup()
  const navigate = useNavigate()

  const diariesQuery = useQuery('diaries', () => getDiaries(initDataRaw))
  const updateMutation = useMutation((diaryData: any) => updateDiary(diaryData, initDataRaw), {onSuccess: () => diariesQuery.refetch()})

  const deleteUserMutation = useMutation(() => deleteUser(initDataRaw), {onSuccess: () => miniApp.close()})
  const deleteAllDiariesMutation = useMutation(() => deleteAllDiaries(initDataRaw), {onSuccess: () => navigate('/', {replace: true})})
  const [modalState, setModalState] = useState(false)


  return (
    <List>
      <Cell description={<Skeleton visible={diariesQuery.isLoading}>{`дневников: ${diariesQuery.data?.length}`}</Skeleton>} >{`@${initData?.user?.username}`}</Cell>
      <Section header='Настройки'>
        <Cell 
          onClick={() => setModalState(true)}
          after={<Navigation/>}><Skeleton visible={diariesQuery.isLoading}>{`Дневник по умолчанию: ${diariesQuery.data ? getMainDiary(diariesQuery.data)?.name : ''}`}</Skeleton></Cell>
        <ButtonCell 
          onClick={() => deleteAllDiariesDialog(popup, deleteAllDiariesMutation)}
          mode='destructive'>Удалить все дневники</ButtonCell>
        <ButtonCell 
          onClick={() => deleteUserDialog(popup, deleteUserMutation)}
          mode='destructive'>Удалить аккаунт</ButtonCell>
      </Section>

      <Modal
          header={<ModalHeader>Выберите дневник</ModalHeader>}
          onOpenChange={(is_open) => {setModalState(is_open)}}
          open={modalState}
        >
          <List >
            {diariesQuery.data?.map((diary, i) => <Cell
              key={i}
              onClick={() => {
                setModalState(false)
                updateMutation.mutate(
                    {
                        type: diary.type,
                        id: diary.id,
                        is_main: true
                    }
                )}
              }
              after={<Selectable defaultChecked={diary.is_main}/>}
              before={<Image size={40} src={''}><Title style={{color: 'var(--tgui--button_color)'}} weight='2' caps>{diary.type == 'SCHOOLS.BY' ? 'S' : diary.name[0]}</Title></Image>}
              subtitle={diary.name}>{diary.type}</Cell>)}
          </List>
        
        </Modal>
    </List>
  );
};
