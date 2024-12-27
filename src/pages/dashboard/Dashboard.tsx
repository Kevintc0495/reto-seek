import { Outlet } from "react-router-dom";
import { Layout } from "@/components";

const Dashboard = () => (
  <Layout>
    <Outlet />
  </Layout>
);

export default Dashboard;
