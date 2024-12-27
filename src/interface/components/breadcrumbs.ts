import { BreadcrumbsProps } from "@mui/material";

export interface Ilink {
  href?: string;
  name: string;
}

export interface IBreadcrumbs {
  links: Ilink[];
  breadcrumbsProps?: BreadcrumbsProps;
}