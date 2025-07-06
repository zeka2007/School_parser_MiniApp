import { cloudStorage } from "@telegram-apps/sdk-react";
import { SETTING_MARK } from "./Utils";
import { MinMaxMarkData } from "../Types/UserTypes";

export async function deleteAll() {
    const keys = await cloudStorage.getKeys()
    await cloudStorage.deleteItem(keys)
}

export async function setMinMaxMark(minMark: number, maxMark: number) {
    await cloudStorage.setItem(SETTING_MARK, `${minMark}:${maxMark}`)
}

export async function getMinMaxMark(): Promise<MinMaxMarkData | undefined> {
    const data = await cloudStorage.getItem([SETTING_MARK])
    if (data[SETTING_MARK] == '') return undefined

    const splitData = data[SETTING_MARK].split(':')
    return {min_mark: Number(splitData[0]), max_mark: Number(splitData[1])}
}