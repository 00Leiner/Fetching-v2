export interface schedInformation{
  schedNum?: string,
  room?: string,
  day?: string,
  startTime?: string, 
  endTime?: string, 
}

export interface scheduleItemModel{
    _id?: string;
    courseCode?: string,
    courseDescription?: string,
    courseUnit?: string,
    instructor?: string,
    schedule?: schedInformation
  }

export interface allScheduleItemModel{
  sched?: scheduleItemModel[]
}

export interface scheduleModel{
  _id?: string,
  program?: string;
  year?: string;
  semester?: string;
  major?: string;
  block?: string;
  sched?: scheduleItemModel;
};

export interface allScheduleModel{
  programs?: scheduleModel[];
}

export interface optionsModel{
  _id?: string,
  programs?: scheduleModel;
};

export interface optionModel{
  options?: optionsModel
}