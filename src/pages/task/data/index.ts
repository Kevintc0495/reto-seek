import { ChangeEvent, RefObject } from "react";
import { Itask, ItaskFilter } from "../interfaces";
import { IFormWrapperRef } from "@/interface";

export const initialValueContext = {
  cleanFields: () => {},
  count: 0,
  dataTable: [] as Itask[],
  handleChangePage: (_: unknown, __: number) => {},
  handleChangeRowsPerPage: (_: ChangeEvent<HTMLInputElement>) => {},
  handleSubmit: () => {},
  isLoadingList: true,
  page: 0,
  rowsPerPage: 0,
  ref: { current: null } as RefObject<IFormWrapperRef<ItaskFilter>>,
  methods: {},
};

export const task = {
  id: 0, 
  title: '',
  description: '',
  state: ''
};