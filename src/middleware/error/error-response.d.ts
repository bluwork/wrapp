type ErrorResponse = {
  name: string;
  status?: number;
  path?: string;
  message: string;
  headers?: [];
  errors?: [];
};
