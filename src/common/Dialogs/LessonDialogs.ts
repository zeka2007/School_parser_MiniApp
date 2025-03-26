import { popup } from "@telegram-apps/sdk-react"

export const showDeleteLessonDialog = async (callback: CallableFunction = () => {}) => {
    popup.open(
        {
            message: `Удалить предмет?`,
            buttons: [
                {id: 'cancel', type: 'default', text: 'Нет'},
                {id: 'delete', type: 'destructive', text: 'Да'}
            ]
        }
    ).then(
        btnId => {
            if (btnId == 'delete') callback()
        }
    )
}

