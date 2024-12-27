const updateFormValues = <T extends object>(
  data: T, 
  setValue: (name: keyof T, value: T[keyof T]) => void
) => {
  (Object.keys(data) as Array<keyof T>).forEach((key) => {
    setValue(key, data[key]);
  });
};

export default updateFormValues;