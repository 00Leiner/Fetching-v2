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
exports.deleteCourse = exports.updateCourse = exports.createCourse = exports.readCourse = exports.readAllCourses = void 0;
const Courses_1 = require("../api/Courses");
const readAllCourses = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, Courses_1.readAllCoursesData)();
        if (Array.isArray(response.courses)) {
            const allCourses = response.courses.map((course) => ({
                _id: course._id,
                code: course.code,
                description: course.description,
                units: course.units,
                type: course.type,
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
exports.readAllCourses = readAllCourses;
const readCourse = (getID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = { _id: getID };
        const response = yield (0, Courses_1.readCourseData)(course);
        const _id = response.course._id;
        const code = response.course.code;
        const description = response.course.description;
        const units = response.course.units;
        const type = response.course.type;
        return { _id, code, description, units, type };
    }
    catch (error) {
        console.error(`Failed to read course: ${error.message}`);
    }
});
exports.readCourse = readCourse;
const createCourse = (getCode, getDescription, getUnits, getType) => __awaiter(void 0, void 0, void 0, function* () {
    const newCourse = {
        code: getCode,
        description: getDescription,
        units: getUnits,
        type: getType,
    };
    try {
        const response = yield (0, Courses_1.createCourseData)(newCourse);
        console.log(`Course created successfully:`, response);
        return response.course;
    }
    catch (error) {
        console.error(`Failed to delete course: ${error.message}`);
    }
});
exports.createCourse = createCourse;
const updateCourse = (getID, getCode, getDescription, getUnits, getType) => __awaiter(void 0, void 0, void 0, function* () {
    const newCourse = {
        _id: getID,
        code: getCode,
        description: getDescription,
        units: getUnits,
        type: getType,
    };
    try {
        const response = yield (0, Courses_1.updateCourseData)(newCourse);
        console.log(`Course update successfully:`, response);
        return response.courses;
    }
    catch (error) {
        console.error(`Failed to update course: ${error.message}`);
    }
});
exports.updateCourse = updateCourse;
const deleteCourse = (getID) => __awaiter(void 0, void 0, void 0, function* () {
    const newCourse = {
        _id: getID
    };
    try {
        const response = yield (0, Courses_1.deleteCourseData)(newCourse);
        console.log('Course Deleted!', response);
    }
    catch (error) {
        console.error(`Failed to delete course: ${error.message}`);
    }
});
exports.deleteCourse = deleteCourse;
