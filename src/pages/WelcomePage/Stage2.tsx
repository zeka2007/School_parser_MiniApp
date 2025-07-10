import { NumberInput } from "@/components/TG/NumberInput/NumberInput"
import { Button, FixedLayout, Placeholder } from "@telegram-apps/telegram-ui"
import { FC, useState } from "react"
import './Stage2.css'
import { useNavigate } from "react-router-dom"
import { setMinMaxMark } from "@/common/Utils/UserUtils"
import { MAX_MARK_LIMIT } from "@/common/Utils/Utils"

export const Stage2: FC = () => {

    const navigator = useNavigate()

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

    return <div className="parent">
        <div>
            <Placeholder

                header='Настройка шкалы оценивания'
                description='Установите минимальный и максимальный балл, который предусмотрен вашей системой образования. Вы всегда сможете изменить эти значения' />
            <div className="inputs-block">
                <NumberInput value={minMark} onChange={minMakrChange} label="Минимальный балл" disableDownBtn={disableDownMinBtn} disableUpBtn={disableUpMinBtn} />
                <NumberInput value={maxMark} onChange={maxMakrChange} label="Максимальный балл" disableDownBtn={disableDownMaxBtn} disableUpBtn={disableUpMaxBtn} />
            </div>
        </div>
        <FixedLayout className="bottom-layout">
            <Button
                size="l"
                stretched
                onClick={() => {
                    setMinMaxMark(minMark, maxMark)
                    navigator('/welcome/stage3', {replace: true})
                }}>Далее</Button>

        </FixedLayout>
    </div>
}