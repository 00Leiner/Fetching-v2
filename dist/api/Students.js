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
exports.deleteCourseData = exports.updateCourseData = exports.addCoursesData = exports.readCourseData = exports.readAllCourseData = exports.deleteStudentData = exports.updateStudentData = exports.createStudentData = exports.readStudentData = exports.readAllStudentsData = void 0;
const axios_1 = __importDefault(require("axios"));
const Students_1 = require("./endpoints/Students");
const baseUrl = 'http://localhost:3000';
const readDataURL = `${baseUrl}${Students_1.readData}`;
const createDataURL = `${baseUrl}${Students_1.createData}`;
const updateDataURL = `${baseUrl}${Students_1.updateData}`;
const deleteDataURL = `${baseUrl}${Students_1.deleteData}`;
const addCourseDataURL = `${baseUrl}${Students_1.addCourseData}`;
const readAllStudentsData = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(readDataURL);
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
exports.readAllStudentsData = readAllStudentsData;
const readStudentData = (studentData) => __awaiter(void 0, void 0, void 0, function* () {
    const id = studentData._id;
    const url = `${readDataURL}${id}`;
    const response = yield axios_1.default.get(url);
    if (response.status === 200) {
        return response.data.student;
    }
    else if (response.status === 404) {
        throw new Error(`No Student Found`);
    }
    else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
});
exports.readStudentData = readStudentData;
const createStudentData = (studentData) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post(createDataURL, studentData);
    if (response.status === 201) {
        return response.data;
    }
    else {
        throw new Error(`Creating Unsuccessful: ${response.status}`);
    }
});
exports.createStudentData = createStudentData;
const updateStudentData = (studentData) => __awaiter(void 0, void 0, void 0, function* () {
    const id = studentData._id;
    const url = `${updateDataURL}${id}`;
    const response = yield axios_1.default.put(url, studentData);
    if (response.status === 200) {
        return response.data;
    }
    else if (response.status === 404) {
        throw new Error(`Student not found: ${response.status}`);
    }
    else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
});
exports.updateStudentData = updateStudentData;
const deleteStudentData = (studentData) => __awaiter(void 0, void 0, void 0, function* () {
    const id = studentData._id;
    const url = `${deleteDataURL}${id}`;
    const response = yield axios_1.default.delete(url);
    if (response.status === 204) {
        return response.data;
    }
    else if (response.status === 404) {
        throw new Error(`Student not found: ${response.status}`);
    }
    else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
});
exports.deleteStudentData = deleteStudentData;
const readAllCourseData = (studentData) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = studentData._id;
    const url = `${readDataURL}student/${studentId}/courses`;
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
const readCourseData = (studentData, courseData) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = studentData._id;
    const courseCode = courseData._id;
    const url = `${readDataURL}student/${studentId}/course/${courseCode}`;
    const response = yield axios_1.default.get(url);
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
exports.readCourseData = readCourseData;
const addCoursesData = (studentData, courseData) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = studentData._id;
    const url = `${addCourseDataURL}${studentId}`;
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
const updateCourseData = (studentData, courseData) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = studentData._id;
    const courseId = courseData._id;
    const url = `${updateDataURL}student/${studentId}/course/${courseId}`;
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
const deleteCourseData = (studentData, courseData) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = studentData._id;
    const courseId = courseData._id;
    const url = `${deleteDataURL}student/${studentId}/course/${courseId}`;
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
