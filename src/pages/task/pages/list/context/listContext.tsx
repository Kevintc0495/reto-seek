import {
  createContext,
  useState,
  ChangeEvent,
  useEffect,
  PropsWithChildren,
  useRef,
  FC,
} from "react";
import { useForm } from "react-hook-form";
import { Itask, ItaskFilter } from "@/pages/task/interfaces";
import { IFormWrapperRef } from "@/interface";
import { useTask } from "@/pages/task/hooks";
import { initialValueContext } from "@/pages/task/data";

export const TaskListContext = createContext(initialValueContext);

const TaskListProvider: FC<PropsWithChildren> = ({ children }) => {
  const [dataTable, setDataTable] = useState<Itask[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { controller, tasks, isLoadingList } = useTask();
  const ref = useRef<IFormWrapperRef<ItaskFilter>>(null);
  const methods = useForm();

  const cleanFields = () => methods.reset();

  const fetchListAll = async (
    filters: Partial<ItaskFilter> = {},
    signal?: AbortSignal,
  ) => {
    const filterValues = methods.getValues();
    const params = { page, rowsPerPage, ...filterValues, ...filters };

    const { data } = await tasks(params, signal);
    setDataTable(data.data);
    setCount(data.count);
  };

  const onSubmitSuccess = async (data: ItaskFilter) => fetchListAll(data);

  const handleSubmit = () => ref.current!.submit(onSubmitSuccess);

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    const pageSize = parseInt(target.value, 10);
    setRowsPerPage(pageSize);
    setPage(0);
  };

  useEffect(() => {
    fetchListAll({}, controller.signal);

    return () => {
      controller.abort();
    };
  }, [page, rowsPerPage]);

  const values = {
    cleanFields,
    count,
    dataTable,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSubmit,
    isLoadingList,
    page,
    ref,
    rowsPerPage,
    methods,
  };

  return (
    <TaskListContext.Provider value={values}>
      {children}
    </TaskListContext.Provider>
  );
};

export default TaskListProvider;
