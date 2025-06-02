import { IHeadOffice } from "../interfaces/IHeadOffice";

export type GlobalParamList = {
  Home: undefined;
  SignIn: undefined;
  SignUp: undefined;
  HeadOfficeList: undefined;
  HeadOfficeForm: { data?: IHeadOffice };
  HeadOfficeNav: undefined;
  HeadOfficeDetail: { id: string };
}