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
exports.deleteTeacherCourses = exports.updateTeacherCourse = exports.addTeacherCourse = exports.readTeacherCourse = exports.readAllTeacherCourses = exports.deleteTeacher = exports.updateTeacher = exports.createTeacher = exports.readTeacher = exports.readAllTeachers = void 0;
const Teachers_1 = require("../api/Teachers");
const readAllTeachers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, Teachers_1.readAllTeachersData)();
        if (Array.isArray(response.teachers)) {
            const allTeachers = response.teachers.map((teacher) => ({
                _id: teacher._id,
                name: teacher.name,
                specialized: teacher.specialized
            }));
            return { allTeachers };
        }
        else {
            console.error('Invalid response format. Expected an array.');
            return null;
        }
    }
    catch (error) {
        console.error(`Failed to read all teachers: ${error.message}`);
    }
});
exports.readAllTeachers = readAllTeachers;
const readTeacher = (getID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teacher = { _id: getID };
        const response = yield (0, Teachers_1.readTeacherData)(teacher);
        const _id = response.teacher._id;
        const name = response.teacher.name;
        const specialized = response.teacher.specialized;
        return { _id, name, specialized };
    }
    catch (error) {
        console.error(`Failed to read teacher: ${error.message}`);
    }
});
exports.readTeacher = readTeacher;
const createTeacher = (getName, getSpecialized) => __awaiter(void 0, void 0, void 0, function* () {
    const newTeacher = {
        name: getName,
        specialized: getSpecialized,
    };
    try {
        const response = yield (0, Teachers_1.createTeacherData)(newTeacher);
        console.log(`Teacher created successfully:`, response);
        return response.teacher;
    }
    catch (error) {
        console.error(`Failed to delete teacher: ${error.message}`);
    }
});
exports.createTeacher = createTeacher;
const updateTeacher = (getID, getName, getSpecialized) => __awaiter(void 0, void 0, void 0, function* () {
    const newTeacher = {
        _id: getID,
        name: getName,
        specialized: getSpecialized
    };
    try {
        const response = yield (0, Teachers_1.updateTeacherData)(newTeacher);
        console.log(`Teacher update successfully:`, response);
        return response.teachers;
    }
    catch (error) {
        console.error(`Failed to update teacher: ${error.message}`);
    }
});
exports.updateTeacher = updateTeacher;
const deleteTeacher = (getID) => __awaiter(void 0, void 0, void 0, function* () {
    const newTeacher = {
        _id: getID
    };
    try {
        const response = yield (0, Teachers_1.deleteTeacherData)(newTeacher);
        console.log('Teacher Deleted!', response);
    }
    catch (error) {
        console.error(`Failed to delete teacher: ${error.message}`);
    }
});
exports.deleteTeacher = deleteTeacher;
const readAllTeacherCourses = (getID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teacher = { _id: getID };
        const response = yield (0, Teachers_1.readAllCourseData)(teacher);
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
exports.readAllTeacherCourses = readAllTeacherCourses;
const readTeacherCourse = (getTeacherID, getCourseCourse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teacher = { _id: getTeacherID };
        const course = { _id: getCourseCourse };
        const response = yield (0, Teachers_1.readCourseData)(teacher, course);
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
exports.readTeacherCourse = readTeacherCourse;
const addTeacherCourse = (getTeacherID, getCode, getDescription, getUnits, getType) => __awaiter(void 0, void 0, void 0, function* () {
    const teacher = { _id: getTeacherID };
    const newCourse = {
        code: getCode,
        description: getDescription,
        units: getUnits,
        type: getType
    };
    try {
        const response = yield (0, Teachers_1.addCoursesData)(teacher, newCourse);
        console.log(`Teacher created successfully:`, response);
        return response.teacher;
    }
    catch (error) {
        console.error(`Failed to delete teacher: ${error.message}`);
    }
});
exports.addTeacherCourse = addTeacherCourse;
const updateTeacherCourse = (getTeacherID, getID, getCode, getDescription, getUnits, getType) => __awaiter(void 0, void 0, void 0, function* () {
    const teacher = { _id: getTeacherID };
    const newCourse = {
        _id: getID,
        code: getCode,
        description: getDescription,
        units: getUnits,
        type: getType
    };
    try {
        const response = yield (0, Teachers_1.updateCourseData)(teacher, newCourse);
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
            console.log(`No courses found for the teacher.`);
        }
    }
    catch (error) {
        console.error(`Failed to update course: ${error.message}`);
    }
});
exports.updateTeacherCourse = updateTeacherCourse;
const deleteTeacherCourses = (getTeacherID, getCourseId) => __awaiter(void 0, void 0, void 0, function* () {
    const teacher = { _id: getTeacherID };
    const course = { _id: getCourseId };
    try {
        const deletedCourse = yield (0, Teachers_1.deleteCourseData)(teacher, course);
        console.log('Course Deleted!', deletedCourse);
        return deletedCourse;
    }
    catch (error) {
        console.error(`Failed to delete course: ${error.message}`);
        throw error; // Re-throw the error to let the caller handle it
    }
});
exports.deleteTeacherCourses = deleteTeacherCourses;
