import { popup } from "@telegram-apps/sdk-react"

export const showDeleteAllDataDialog = async (callback: CallableFunction = () => {}) => {
    popup.open(
        {
            title: 'Удалить данные дневника?',
            message: `Все данные, сохраненные в приложении, будут удалены, но вы сможете в любой момент внести их повторно`,
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