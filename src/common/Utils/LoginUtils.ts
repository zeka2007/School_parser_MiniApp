import axios from "axios";
import { LoginData } from "../Types/LoginTypes";

export async function LoginUser (loginData: LoginData, initDataRaw: string | undefined): Promise<{ id: number; }> {
    const {data} = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/api/user/login/`, loginData,
        {
        headers: {
            'Authorization': initDataRaw
        }
        }
    )
    return data
}