
export const generateFormData = (values) => {
  const formData = new FormData();
  Object.keys(values).forEach(key => {
      if (values[key] != null) {
          formData.append(key, values[key]);
      }
  });

  return formData;
};

