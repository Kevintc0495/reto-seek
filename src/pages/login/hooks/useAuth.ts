import { useState } from "react";
import { AxiosResponse } from "axios";
import { authRoutes, postApi, setCookies } from "@/services";
import { IApiResponse } from "@/interface";
import { ILogin, IUserLogin } from '../interfaces';
import { decodeToken, setStorage } from "@/util";


const initialDateUserLogin: IUserLogin = {
  token: '',
  user: {
    id: 0,
    name: '',
    lastName: '',
    email: ''
  }
}

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (credential: ILogin): Promise<IApiResponse<IUserLogin>> => {
    setIsLoading(true);

    try {
      const response: AxiosResponse<IApiResponse<IUserLogin>> = await postApi(authRoutes.login, credential);
      const { data, message, status } = response.data;
      
      if(data?.token) {
        setCookies('token', data.token);
        const payload = decodeToken(data.token);
        setStorage('user', payload);
      }

      return { data, message, status };
    } 
    catch (_) { 
      return { message: 'Ocurrio un error.' , data: initialDateUserLogin, status: 500 };
    } 
    finally { 
      setIsLoading(false) 
    }
  };

  return { isLoading, login };
};