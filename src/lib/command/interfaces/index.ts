export interface Result {
  status: boolean;
  data: Object;
  errors?: Array<Error>;
}

export interface Error {
  code: number;
  detail: string;
}
