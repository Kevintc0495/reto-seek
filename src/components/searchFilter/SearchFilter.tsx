import { Button, Paper, Stack, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SearchIcon from "@mui/icons-material/Search";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { IFormWrapperRef, ISearchFilter } from "@/interface";
import FormWrapper from "../formWrapper/FormWrapper";
import { ForwardedRef, forwardRef } from "react";

export const SearchFilter = forwardRef(function SearchFilter<T>(
  { children, cleanFields, handleSubmit, isLoading, methods }: ISearchFilter,
  ref: ForwardedRef<IFormWrapperRef<T>>,
) {
  return (
    <Paper sx={{ p: 2, mb: 5 }}>
      <FormWrapper methods={methods} ref={ref}>
        <Typography component="h2" variant="h5" mb={3}>
          Filtros de Búsqueda
        </Typography>
        {children}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
          mt={2}
        >
          <LoadingButton
            loading={isLoading}
            onClick={handleSubmit}
            variant="contained"
            startIcon={<SearchIcon />}
          >
            Buscar
          </LoadingButton>
          <Button
            variant="outlined"
            onClick={cleanFields}
            startIcon={<CleaningServicesIcon />}
          >
            Limpiar filtros
          </Button>
        </Stack>
      </FormWrapper>
    </Paper>
  );
});
