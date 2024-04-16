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
exports.deleteUser = exports.updateUser = exports.createUser = exports.readUser = exports.readAllUsers = void 0;
const Users_1 = require("../api/Users");
const readAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, Users_1.readAllUsersData)();
        if (Array.isArray(response.users)) {
            const allUsers = response.users.map((user) => ({
                _id: user._id,
                username: user.username,
                password: user.password
            }));
            return { allUsers };
        }
        else {
            console.error('Invalid response format. Expected an array.');
            return null;
        }
    }
    catch (error) {
        console.error(`Failed to read all users: ${error.message}`);
    }
});
exports.readAllUsers = readAllUsers;
const readUser = (getID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = { _id: getID };
        const response = yield (0, Users_1.readUserData)(user);
        const _id = response.user._id;
        const username = response.user.username;
        const password = response.user.password;
        return { _id, username, password };
    }
    catch (error) {
        console.error(`Failed to read user: ${error.message}`);
    }
});
exports.readUser = readUser;
const createUser = (getUsername, getPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = {
        username: getUsername,
        password: getPassword,
    };
    try {
        const response = yield (0, Users_1.createUserData)(newUser);
        console.log(`User created successfully:`, response);
        return response.user;
    }
    catch (error) {
        console.error(`Failed to delete user: ${error.message}`);
    }
});
exports.createUser = createUser;
const updateUser = (getID, getUsername, getPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = {
        _id: getID,
        username: getUsername,
        password: getPassword
    };
    try {
        const response = yield (0, Users_1.updateUserData)(newUser);
        console.log(`User update successfully:`, response);
        return response.users;
    }
    catch (error) {
        console.error(`Failed to update user: ${error.message}`);
    }
});
exports.updateUser = updateUser;
const deleteUser = (getID) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = {
        _id: getID
    };
    try {
        const response = yield (0, Users_1.deleteUserData)(newUser);
        console.log('User Deleted!', response);
    }
    catch (error) {
        console.error(`Failed to delete user: ${error.message}`);
    }
});
exports.deleteUser = deleteUser;
