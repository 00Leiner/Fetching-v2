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
exports.deleteUserData = exports.updateUserData = exports.createUserData = exports.readUserData = exports.readAllUsersData = void 0;
const axios_1 = __importDefault(require("axios"));
const Users_1 = require("./endpoints/Users");
const baseUrl = 'http://localhost:3000';
const readDataURL = `${baseUrl}${Users_1.readData}`;
const createDataURL = `${baseUrl}${Users_1.createData}`;
const updateDataURL = `${baseUrl}${Users_1.updateData}`;
const deleteDataURL = `${baseUrl}${Users_1.deleteData}`;
const readAllUsersData = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(readDataURL);
    if (response.status === 200) {
        return response.data;
    }
    else if (response.status === 404) {
        throw new Error(`No User Found`);
    }
    else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
});
exports.readAllUsersData = readAllUsersData;
const readUserData = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const id = userData._id;
    const url = `${readDataURL}${id}`;
    const response = yield axios_1.default.get(url);
    if (response.status === 200) {
        return response.data;
    }
    else if (response.status === 404) {
        throw new Error(`No User Found`);
    }
    else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
});
exports.readUserData = readUserData;
const createUserData = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post(createDataURL, userData);
    if (response.status === 201) {
        return response.data;
    }
    else {
        throw new Error(`Creating Unsuccessful: ${response.status}`);
    }
});
exports.createUserData = createUserData;
const updateUserData = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const id = userData._id;
    const url = `${updateDataURL}${id}`;
    const response = yield axios_1.default.put(url, userData);
    if (response.status === 200) {
        return response.data;
    }
    else if (response.status === 404) {
        throw new Error(`User not found: ${response.status}`);
    }
    else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
});
exports.updateUserData = updateUserData;
const deleteUserData = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const id = userData._id;
    const url = `${deleteDataURL}${id}`;
    const response = yield axios_1.default.delete(url);
    if (response.status === 204) {
        return response.data;
    }
    else if (response.status === 404) {
        throw new Error(`User not found: ${response.status}`);
    }
    else {
        throw new Error(`Unexpected Status: ${response.status}`);
    }
});
exports.deleteUserData = deleteUserData;
