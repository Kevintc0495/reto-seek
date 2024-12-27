import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { homeRoutes } from "@/routes";

export const useProtectedRouter = (isAdmin: boolean) => {
  const navigate = useNavigate();

  useEffect(() => {
    if(!isAdmin) navigate(homeRoutes.home);
  }, [])
  
}