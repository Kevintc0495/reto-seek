import { PropsWithChildren } from "react";
import { UseFormReturn } from "react-hook-form";

export interface IFormWrapperRef <T>{
  submit: (callback: (data: T) => void, errorCallback?: (data: T) => void) => void;
}

export interface IFormWrapperProps extends PropsWithChildren {
  methods: UseFormReturn;
}