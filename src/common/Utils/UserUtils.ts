import axios from "axios";
import { StudentData } from "../Types";

export const getUserData = async (initDataRaw: string | undefined, params: URLSearchParams): Promise<StudentData> => {
    const {data} = await axios.get(`http://localhost:5000/api/user/get-data/?${params.toString()}`, {headers: {
      'Authorization': initDataRaw
    }})

    return data;
}