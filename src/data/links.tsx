import React from 'react';
import { taskRoutes } from '../routes/paths'
import AssignmentIcon from '@mui/icons-material/Assignment';

export const links = [
  {
    adminOnly: true,
    text: "Tarea",
    icon: <AssignmentIcon />,
    path: taskRoutes.get,
  }
];
