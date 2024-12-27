import { createBrowserRouter } from "react-router-dom";
import { logindRoute } from "./login.router";
import { menuRoute } from "./menu.router";

const router = createBrowserRouter([...logindRoute, menuRoute]);

export default router;
