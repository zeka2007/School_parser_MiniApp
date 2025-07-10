import { showDeleteAllDataDialog } from "@/common/Dialogs/UserDialogs";
import { Lesson } from "@/common/Types/LessonTypes";
import { MinMaxMarkData } from "@/common/Types/UserTypes";
import { getSessionMarksData } from "@/common/Utils/MarksUtils";
import { deleteAll, setMinMaxMark } from "@/common/Utils/UserUtils";
import { MAX_MARK_LIMIT } from "@/common/Utils/Utils";
import { NumberInput } from "@/components/TG/NumberInput/NumberInput";
import { hapticFeedbackNotificationOccurred } from "@telegram-apps/sdk-react";
import { Button, ButtonCell, Cell, Modal, Navigation, Section } from "@telegram-apps/telegram-ui";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ActionsComponent: FC<{ lessons: Lesson[] }> = ({ lessons }) => {

    const navigate = useNavigate()
    const [changeMarksLimitsDialog, setChangeMarksLimitsDialog] = useState(false)

    const [minMark, setMinMark] = useState(0)
    const [maxMark, setMaxMark] = useState(10)
    const [disableUpMinBtn, setDisableUpMinBtn] = useState(false)
    const [disableUpMaxBtn, setDisableUpMaxBtn] = useState(false)
    const [disableDownMinBtn, setDisableDownMinBtn] = useState(true)
    const [disableDownMaxBtn, setDisableDownMaxBtn] = useState(false)

    const minMakrChange = (v: number) => {
        const cond = v >= maxMark || v >= MAX_MARK_LIMIT

        setDisableDownMinBtn(v <= 0)
        setDisableUpMinBtn(cond)

        setDisableDownMaxBtn(cond)

        setMinMark(v)
    }
    const maxMakrChange = (v: number) => {

        const cond = minMark >= v

        setDisableUpMinBtn(cond)


        setDisableDownMaxBtn(cond)
        setDisableUpMaxBtn(v >= MAX_MARK_LIMIT)


        setMaxMark(v)
    }

    const saveMarkLimits = () => {
        setMinMaxMark(minMark, maxMark)
        const data: MinMaxMarkData = {
            min_mark: minMark,
            max_mark: maxMark
        }
        sessionStorage.setItem('min_max_mark', JSON.stringify(data))
        hapticFeedbackNotificationOccurred('success')
        setChangeMarksLimitsDialog(false)
    }

    useEffect(() => {
        const data = getSessionMarksData();
        setMinMark(data.min_mark)
        setMaxMark(data.max_mark)
    }, [changeMarksLimitsDialog])

    return (
        <div>
            <Section header={'Действия'}>
                <Cell
                    className="no-hover"
                    onClick={() => navigate('/lessons', { state: lessons })}
                    after={<Navigation />}>Управление предметами</Cell>
                <Cell
                    className="no-hover"
                    onClick={() => setChangeMarksLimitsDialog(true)}>Изменить интервал отметок</Cell>
                <ButtonCell onClick={() => showDeleteAllDataDialog(() => {
                    deleteAll().then(() => {
                        hapticFeedbackNotificationOccurred('success')
                        sessionStorage.removeItem('min_max_mark')
                        sessionStorage.removeItem('lessons')
                        navigate('/welcome', { replace: true })
                    })
                })} mode='destructive'>Удалить все данные</ButtonCell>
            </Section>
            <Modal
                header={<ModalHeader>Интервал отметок</ModalHeader>}
                open={changeMarksLimitsDialog}
                onOpenChange={(state) => setChangeMarksLimitsDialog(state)}>
                <div style={{ display: 'flex', justifyContent: 'space-around', margin: "16px" }}>
                    <NumberInput value={minMark} onChange={minMakrChange} label="Минимальный балл" disableDownBtn={disableDownMinBtn} disableUpBtn={disableUpMinBtn} />
                    <NumberInput value={maxMark} onChange={maxMakrChange} label="Максимальный балл" disableDownBtn={disableDownMaxBtn} disableUpBtn={disableUpMaxBtn} />
                </div>
                <div style={{ padding: '0 16px 16px' }}>
                    <Button
                        size="l"
                        stretched
                        onClick={saveMarkLimits}>Сохранить</Button>
                </div>
            </Modal>
        </div>
    )
}

export default ActionsComponent