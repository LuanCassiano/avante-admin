import { IHeadOffice } from "../interfaces/IHeadOffice";
import { ITeacher } from "../interfaces/ITeacher";

export type GlobalParamList = {
  Home: undefined;
  SignIn: undefined;
  SignUp: undefined;
  HeadOfficeList: undefined;
  HeadOfficeForm: { data?: IHeadOffice };
  HeadOfficeNav: undefined;
  HeadOfficeDetail: { id: string };
  TeacherList: undefined;
  TeacherForm: { data?: ITeacher };
  TeacherDetail: { id: string };
}