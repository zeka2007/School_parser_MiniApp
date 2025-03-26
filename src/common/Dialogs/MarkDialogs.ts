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

