export interface IResult {
  status: boolean;
  data?: Object;
  errors?: Array<IError>;
}

export interface IError {
  code: number;
  detail: string;
}
