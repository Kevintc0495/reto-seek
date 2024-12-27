import { useNavigate } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "@mui/material";
import { IBreadcrumbs } from "@/interface";

const BreadcrumbsComponent = ({ breadcrumbsProps, links }: IBreadcrumbs) => {
  const navigate = useNavigate();

  const handleClick = (url: string) => navigate(url);

  return (
    <Breadcrumbs {...breadcrumbsProps} separator="›">
      {links.map(({ href, name }, i) => {
        const isLast = i === links.length - 1;

        return isLast ? (
          <Typography key={i} component="span" variant="body2">
            {name}
          </Typography>
        ) : (
          <Link
            underline="hover"
            key={i}
            color="inherit"
            href={href}
            onClick={() => handleClick(href!)}
          >
            <Typography component="span" variant="body2">
              {name}
            </Typography>
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsComponent;
