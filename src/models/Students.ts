export interface studentModel{
  _id?: string,
  program?: string;
  year?: string;
  semester?: string;
  major?: string;
  block?: string;
};

export interface studentsModel {
  student?: studentModel;
}