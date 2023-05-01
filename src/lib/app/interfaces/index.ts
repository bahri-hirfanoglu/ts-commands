export interface IResult {
  status: boolean;
  data?: any;
  errors?: Array<IError>;
}

export interface IError {
  code: number;
  detail: string;
}
