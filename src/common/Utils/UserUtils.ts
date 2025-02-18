import { CloudStorage } from "@tma.js/sdk-react";

export class UserUtils {
    cloudStorage: CloudStorage

    constructor (cloudStorage: CloudStorage) {
        this.cloudStorage = cloudStorage
    }

    async deleteAll() {
        const keys = await this.cloudStorage.getKeys()
        await this.cloudStorage.delete(keys)
    }
}