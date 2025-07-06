import { addLesson, DEFAULT_LESSONS } from "@/common/Utils/LessonUtils"
import { Button, Cell, Checkbox, Divider, FixedLayout, List, Placeholder } from "@telegram-apps/telegram-ui"
import { FC, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Stage3: FC = () => {

    const navigator = useNavigate()
    const [items, setItems] = useState(DEFAULT_LESSONS)

    const handleChange = (world: string) => {
        if (items.includes(world)) setItems(items.filter((val) => val != world))
        else setItems([...items, world])
    }

    const selectAllChange = () => {
        if (items.length == 0) setItems(DEFAULT_LESSONS)
        else setItems([])
    }

    return <div>
        <Placeholder
            header='Выбор предметов'
            description='Вы сможете добавлять, удалять или изменять предметы в будущем' />
        <List className="list-padding">
            <Cell key={'selectAll'} Component="label"
                before={<Checkbox indeterminate={items.length != DEFAULT_LESSONS.length} checked={items.length > 0} onChange={selectAllChange}/>}>Выбрать все</Cell>
            <Divider />
            {DEFAULT_LESSONS.map((lesson) => <Cell key={lesson} Component="label"
                before={<Checkbox onChange={() => handleChange(lesson)} checked={items.includes(lesson)} value={lesson} />}>{lesson}</Cell>)}
        </List>
        <FixedLayout className="bottom-layout">
            <Button
                size="l"
                stretched
                onClick={() => { addLesson(items).then(() => { navigator('/', {replace: true})} )}}>Готово</Button>
        </FixedLayout>
    </div>
}