import { RouteObject } from "react-router-dom";
import { authenticationRouter } from "@/util";
import { taskRoutes } from "./paths";

const loadCreateUpdatePage = async () => {
  const { TaskCreateUpdatePage } = await import(
    /* webpackChunkName: "LazyTaskCreateUpdatePage" */ "@/pages/task/pages/createUpdate"
  );
  return { Component: TaskCreateUpdatePage };
};

export const taskRoute: RouteObject[] = [
  {
    path: taskRoutes.get,
    async lazy() {
      const [{ TaskListProvider }, { TaskListPage }] = await Promise.all([
        import(
          /* webpackChunkName: "LazyTaskListProvider" */ "@/pages/task/pages/list/context"
        ),
        import(
          /* webpackChunkName: "LazyTaskListPage" */ "@/pages/task/pages/list"
        ),
      ]);
      return {
        Component: () => (
          <TaskListProvider>
            <TaskListPage />
          </TaskListProvider>
        ),
      };
    },
    loader: () => authenticationRouter(true),
  },
  {
    path: taskRoutes.create,
    lazy: loadCreateUpdatePage,
    loader: () => authenticationRouter(true),
  },
  {
    path: taskRoutes.update,
    lazy: loadCreateUpdatePage,
    loader: () => authenticationRouter(true),
  },
];
