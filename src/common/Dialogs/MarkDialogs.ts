import { popup } from "@telegram-apps/sdk-react"

export const showDeleteTemporaryMarkDialog = async (callback: CallableFunction = () => {}) => {
    popup.open(
        {
            message: `Удалить отметку?`,
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

export const showDeleteFewMarksDialog = async (callback: CallableFunction = () => {}, marksCount: number) => {
    popup.open(
        {
            title: `Удалить отметки?`,
            message: `Количество отметок, которые будут удалены: ${marksCount}`,
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

export const showDeleteMarksDialog = async (callback: CallableFunction = () => {}) => {
    popup.open(
        {
            message: `Удалить все отметки для этого предмета?`,
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
