"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourseData = exports.updateCourseData = exports.addCoursesData = exports.readCourseData = exports.readAllCourseData = exports.deleteTeacherData = exports.updateTeacherData = exports.createTeacherData = exports.readTeacherData = exports.readAllTeachersData = void 0;
const axios_1 = __importDefault(require("axios"));
const Teachers_1 = require("./endpoints/Teachers");
const baseUrl = 'http://localhost:3000';
const readDataURL = `${baseUrl}${Teachers_1.readData}`;
const createDataURL = `${baseUrl}${Teachers_1.createData}`;
const updateDataURL = `${baseUrl}${Teachers_1.updateData}`;
const deleteDataURL = `${baseUrl}${Teachers_1.deleteData}`;
const addCourseDataURL = `${baseUrl}${Teachers_1.addCourseData}`;
const readAllTeachersData = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(readDataURL);
    if (response.status === 200) {
        return response.data;
    }
    else if (response.status === 404) {
        throw new Error(`No Teacher Found`);
    }
    else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
});
exports.readAllTeachersData = readAllTeachersData;
const readTeacherData = (teacherData) => __awaiter(void 0, void 0, void 0, function* () {
    const id = teacherData._id;
    const url = `${readDataURL}${id}`;
    const response = yield axios_1.default.get(url);
    if (response.status === 200) {
        return response.data;
    }
    else if (response.status === 404) {
        throw new Error(`No Teacher Found`);
    }
    else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
});
exports.readTeacherData = readTeacherData;
const createTeacherData = (teacherData) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post(createDataURL, teacherData);
    if (response.status === 201) {
        return response.data;
    }
    else {
        throw new Error(`Creating Unsuccessful: ${response.status}`);
    }
});
exports.createTeacherData = createTeacherData;
const updateTeacherData = (teacherData) => __awaiter(void 0, void 0, void 0, function* () {
    const id = teacherData._id;
    const url = `${updateDataURL}${id}`;
    const response = yield axios_1.default.put(url, teacherData);
    if (response.status === 200) {
        return response.data;
    }
    else if (response.status === 404) {
        throw new Error(`Teacher not found: ${response.status}`);
    }
    else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
});
exports.updateTeacherData = updateTeacherData;
const deleteTeacherData = (teacherData) => __awaiter(void 0, void 0, void 0, function* () {
    const id = teacherData._id;
    const url = `${deleteDataURL}${id}`;
    const response = yield axios_1.default.delete(url);
    if (response.status === 204) {
        return response.data;
    }
    else if (response.status === 404) {
        throw new Error(`Teacher not found: ${response.status}`);
    }
    else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
});
exports.deleteTeacherData = deleteTeacherData;
const readAllCourseData = (teacherData) => __awaiter(void 0, void 0, void 0, function* () {
    const teacherId = teacherData._id;
    const url = `${readDataURL}teacher/${teacherId}/courses`;
    const response = yield axios_1.default.get(url);
    if (response.status === 200) {
        // console.log(response.data.courses)
        return response.data.courses;
    }
    else if (response.status === 404) {
        throw new Error(`No Courses Found`);
    }
    else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
});
exports.readAllCourseData = readAllCourseData;
const readCourseData = (teacherData, courseData) => __awaiter(void 0, void 0, void 0, function* () {
    const teacherId = teacherData._id;
    const courseCode = courseData._id;
    const url = `${readDataURL}teacher/${teacherId}/course/${courseCode}`;
    const response = yield axios_1.default.get(url);
    if (response.status === 200) {
        return response.data;
    }
    else if (response.status === 404) {
        throw new Error(`No Teacher Found`);
    }
    else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
});
exports.readCourseData = readCourseData;
const addCoursesData = (teacherData, courseData) => __awaiter(void 0, void 0, void 0, function* () {
    const teacherId = teacherData._id;
    const url = `${addCourseDataURL}${teacherId}`;
    const response = yield axios_1.default.post(url, courseData);
    if (response.status === 200) {
        return response.data;
    }
    else if (response.status === 404) {
        throw new Error(`No Student Found`);
    }
    else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
});
exports.addCoursesData = addCoursesData;
const updateCourseData = (teacherData, courseData) => __awaiter(void 0, void 0, void 0, function* () {
    const teacherId = teacherData._id;
    const courseId = courseData._id;
    const url = `${updateDataURL}teacher/${teacherId}/course/${courseId}`;
    const response = yield axios_1.default.put(url, courseData);
    if (response.status === 200) {
        return response.data.courses;
    }
    else if (response.status === 404) {
        throw new Error(`No Student Found`);
    }
    else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
});
exports.updateCourseData = updateCourseData;
const deleteCourseData = (teacherData, courseData) => __awaiter(void 0, void 0, void 0, function* () {
    const teacherId = teacherData._id;
    const courseId = courseData._id;
    const url = `${deleteDataURL}teacher/${teacherId}/course/${courseId}`;
    const response = yield axios_1.default.delete(url);
    if (response.status === 200) {
        return response.data.courses;
    }
    else if (response.status === 404) {
        throw new Error(`No Student Found`);
    }
    else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
});
exports.deleteCourseData = deleteCourseData;
