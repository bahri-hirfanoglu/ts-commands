import { IError } from "../app/interfaces/index";

export default {
  SIGNATURE_NOT_FOUND: <IError>{
    code: 400,
    detail: "no script found for the entered signature.",
  },
  UNKNOWN: <IError>{
    code: -1,
    detail: "unknown error occurred.",
  },
};
