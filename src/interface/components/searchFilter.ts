import { PropsWithChildren } from "react";
import { UseFormReturn } from "react-hook-form";

export interface ISearchFilter extends PropsWithChildren {
  handleSubmit: () => void;
  cleanFields: () => void;
  isLoading?: boolean;
  methods: UseFormReturn;
};