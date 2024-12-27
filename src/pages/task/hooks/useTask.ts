import { useState } from "react";
import { AxiosResponse } from "axios";
import { IApiResponse } from "@/interface";
import { taskRoutes, getApi, postApi, putApi } from "@/services";
import { ItaskFilter, ItaskListResponse, Itask, ItaskCreateUpdate } from '../interfaces';
import { generateQuery } from "@/util";
import { task } from "../data";

export const useTask = () => {
  const [isLoadingList, setIsLoadingList] = useState<boolean>(true);
  const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
  const controller = new AbortController();

  const tasks = async (params: Partial<ItaskFilter>, signal?: AbortSignal): Promise<IApiResponse<ItaskListResponse>> => {
    setIsLoadingList(true);
    const url =  generateQuery(params, taskRoutes);

    try {
      const response: AxiosResponse<IApiResponse<ItaskListResponse>> = await getApi(url, { signal });
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: { data: [], count: 0 }, status: 500 };
    } finally {
      setIsLoadingList(false);
    }
  }

  const taskById = async (id: string): Promise<IApiResponse<Itask>> => {
    setIsLoadingUpdate(true);
    try {
      const response: AxiosResponse<IApiResponse<Itask>> = await getApi(`${taskRoutes}/${id}`);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: task, status: 500 };
    } finally {
      setIsLoadingUpdate(false);
    }
  }

  const createTask = async (params: ItaskCreateUpdate): Promise<IApiResponse<Itask>> => {
    setIsLoadingCreate(true);
    try {
      const response: AxiosResponse<IApiResponse<Itask>> = await postApi(taskRoutes, params);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: task, status: 500 };
    } finally {
      setIsLoadingCreate(false);
    }
  };

  const updateTask = async (id: string ,params: ItaskCreateUpdate): Promise<IApiResponse<Itask>> => {
    setIsLoadingCreate(true);
    try {
      const response: AxiosResponse<IApiResponse<Itask>> = await putApi(`${taskRoutes}/${id}`, params);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: task, status: 500 };
    } finally {
      setIsLoadingCreate(false);
    }
  };

  return {
    taskById,
    tasks,
    createTask,
    controller,
    isLoadingCreate,
    isLoadingList,
    isLoadingUpdate,
    updateTask
  }
}