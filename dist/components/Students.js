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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudentCourses = exports.updateStudentCourse = exports.addStudentCourse = exports.readStudentCourse = exports.readAllStudentCourses = exports.deleteStudent = exports.updateStudent = exports.createStudent = exports.readStudent = exports.readAllStudents = void 0;
const Students_1 = require("../api/Students");
const readAllStudents = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, Students_1.readAllStudentsData)();
        if (Array.isArray(response.students)) {
            const allStudents = response.students.map((student) => ({
                _id: student._id,
                program: student.program,
                year: student.year,
                semester: student.semester,
                block: student.block,
                courses: student.courses
            }));
            return { allStudents };
        }
        else {
            console.error('Invalid response format. Expected an array.');
            return null;
        }
    }
    catch (error) {
        console.error(`Failed to read all students: ${error.message}`);
    }
});
exports.readAllStudents = readAllStudents;
const readStudent = (getID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = { _id: getID };
        const response = yield (0, Students_1.readStudentData)(student);
        const _id = response._id;
        const program = response.program;
        const year = response.year; //response.student.year
        const semester = response.semester;
        const block = response.block;
        const courses = response.courses;
        return { _id, program, year, semester, block, courses };
    }
    catch (error) {
        console.error(`Failed to read student: ${error.message}`);
    }
});
exports.readStudent = readStudent;
const createStudent = (getProgram, getYear, getSemester, getBlock, getCourses) => __awaiter(void 0, void 0, void 0, function* () {
    const newStudent = {
        program: getProgram,
        year: getYear,
        semester: getSemester,
        block: getBlock,
        courses: getCourses
    };
    try {
        const response = yield (0, Students_1.createStudentData)(newStudent);
        console.log(`Student created successfully:`, response.student);
        return response.student;
    }
    catch (error) {
        console.error(`Failed to delete student: ${error.message}`);
    }
});
exports.createStudent = createStudent;
const updateStudent = (getID, getProgram, getYear, getSemester, getBlock, getCourses) => __awaiter(void 0, void 0, void 0, function* () {
    const newStudent = {
        _id: getID,
        program: getProgram,
        year: getYear,
        semester: getSemester,
        block: getBlock,
        courses: getCourses
    };
    try {
        const response = yield (0, Students_1.updateStudentData)(newStudent);
        console.log(`Student update successfully:`, response.students);
        return response.students;
    }
    catch (error) {
        console.error(`Failed to update student: ${error.message}`);
    }
});
exports.updateStudent = updateStudent;
const deleteStudent = (getID) => __awaiter(void 0, void 0, void 0, function* () {
    const newStudent = {
        _id: getID
    };
    try {
        const response = yield (0, Students_1.deleteStudentData)(newStudent);
        console.log('Student Deleted!', response);
    }
    catch (error) {
        console.error(`Failed to delete student: ${error.message}`);
    }
});
exports.deleteStudent = deleteStudent;
const readAllStudentCourses = (getID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = { _id: getID };
        const response = yield (0, Students_1.readAllCourseData)(student);
        if (Array.isArray(response)) {
            const allCourses = response.map((course) => ({
                _id: course._id,
                code: course.code,
                description: course.description,
                units: course.units,
                type: course.type
            }));
            return { allCourses };
        }
        else {
            console.error('Invalid response format. Expected an array.');
            return null;
        }
    }
    catch (error) {
        console.error(`Failed to read all courses: ${error.message}`);
    }
});
exports.readAllStudentCourses = readAllStudentCourses;
const readStudentCourse = (getStudentID, getCourseCourse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = { _id: getStudentID };
        const course = { _id: getCourseCourse };
        const response = yield (0, Students_1.readCourseData)(student, course);
        const _id = response.course._id;
        const code = response.course.code;
        const description = response.course.description;
        const units = response.course.units;
        const type = response.course.type;
        return { _id, code, description, units, type };
    }
    catch (error) {
        console.error(`Failed to read all courses: ${error.message}`);
    }
});
exports.readStudentCourse = readStudentCourse;
const addStudentCourse = (getStudentID, getCode, getDescription, getUnits, getType) => __awaiter(void 0, void 0, void 0, function* () {
    const student = { _id: getStudentID };
    const newCourse = {
        code: getCode,
        description: getDescription,
        units: getUnits,
        type: getType
    };
    try {
        const response = yield (0, Students_1.addCoursesData)(student, newCourse);
        console.log(`Student created successfully:`, response);
        return response.student;
    }
    catch (error) {
        console.error(`Failed to delete student: ${error.message}`);
    }
});
exports.addStudentCourse = addStudentCourse;
const updateStudentCourse = (getStudentID, getID, getCode, getDescription, getUnits, getType) => __awaiter(void 0, void 0, void 0, function* () {
    const student = { _id: getStudentID };
    const newCourse = {
        _id: getID,
        code: getCode,
        description: getDescription,
        units: getUnits,
        type: getType
    };
    try {
        const response = yield (0, Students_1.updateCourseData)(student, newCourse);
        if (response.length > 0) {
            const updatedCourse = response.find(course => course._id === getID);
            if (updatedCourse) {
                console.log(`Course update successfully:`, updatedCourse);
                return updatedCourse;
            }
            else {
                console.log(`Updated course not found.`);
            }
        }
        else {
            console.log(`No courses found for the student.`);
        }
    }
    catch (error) {
        console.error(`Failed to update course: ${error.message}`);
    }
});
exports.updateStudentCourse = updateStudentCourse;
const deleteStudentCourses = (getStudentID, getCourseId) => __awaiter(void 0, void 0, void 0, function* () {
    const student = { _id: getStudentID };
    const course = { _id: getCourseId };
    try {
        const deletedCourse = yield (0, Students_1.deleteCourseData)(student, course);
        console.log('Course Deleted!', deletedCourse);
        return deletedCourse;
    }
    catch (error) {
        console.error(`Failed to delete course: ${error.message}`);
        throw error; // Re-throw the error to let the caller handle it
    }
});
exports.deleteStudentCourses = deleteStudentCourses;
