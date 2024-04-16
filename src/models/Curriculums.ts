export interface curriculumCourseModel{
    _id?: string;
    code?: string;
    description?: string;
    units?: string;
    type?: string;
  }

export interface curriculumCoursesModel{
    curriculum?: curriculumCourseModel
  }

export interface curriculumModel {
  _id?: string;
  program?: string;
  year?: string;
  semester?: string;
  major?: string;
  curriculum?: curriculumCourseModel;
}
export interface curriculumsModel {
  curriculum: curriculumModel;
}