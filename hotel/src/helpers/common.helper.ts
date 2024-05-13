import { GeneralResponse } from "types/types";

export const generalResponse: GeneralResponse = (
  response,
  data = null,
  message = "",
  isSuccess = true,
  toast = false,
  statusCode = 200
) => {
  response.status(statusCode).send({
    data: data,
    message: message,
    toast: toast,
    isSuccess: isSuccess,
  });
};
