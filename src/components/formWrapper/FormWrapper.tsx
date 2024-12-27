import { forwardRef, useImperativeHandle } from "react";
import { FormProvider } from "react-hook-form";
import { IFormWrapperProps } from "@/interface";

const FormWrapper = forwardRef(
  ({ children, methods: formMethods }: IFormWrapperProps, ref) => {
    const methods = formMethods;
    const { handleSubmit } = methods;

    useImperativeHandle(ref, () => {
      return {
        submit: (callback = () => {}, errorCallback = () => {}) =>
          handleSubmit(callback, errorCallback)(),
      };
    }, []);

    return (
      <FormProvider {...methods}>
        <form>{children}</form>
      </FormProvider>
    );
  },
);

export default FormWrapper;
