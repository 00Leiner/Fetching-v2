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
exports.deleteRoom = exports.updateRoom = exports.createRoom = exports.readRoom = exports.readAllRooms = void 0;
const Rooms_1 = require("../api/Rooms");
const readAllRooms = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, Rooms_1.readAllRoomsData)();
        if (Array.isArray(response.rooms)) {
            const allRooms = response.rooms.map((room) => ({
                _id: room._id,
                name: room.name,
                type: room.type
            }));
            return { allRooms };
        }
        else {
            console.error('Invalid response format. Expected an array.');
            return null;
        }
    }
    catch (error) {
        console.error(`Failed to read all rooms: ${error.message}`);
    }
});
exports.readAllRooms = readAllRooms;
const readRoom = (getID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const room = { _id: getID };
        const response = yield (0, Rooms_1.readRoomData)(room);
        const _id = response.room._id;
        const name = response.room.name;
        const type = response.room.type;
        return { _id, name, type };
    }
    catch (error) {
        console.error(`Failed to read room: ${error.message}`);
    }
});
exports.readRoom = readRoom;
const createRoom = (getName, getType) => __awaiter(void 0, void 0, void 0, function* () {
    const newRoom = {
        name: getName,
        type: getType,
    };
    try {
        const response = yield (0, Rooms_1.createRoomData)(newRoom);
        console.log(`Room created successfully:`, response);
        return response.room;
    }
    catch (error) {
        console.error(`Failed to delete room: ${error.message}`);
    }
});
exports.createRoom = createRoom;
const updateRoom = (getID, getName, getType) => __awaiter(void 0, void 0, void 0, function* () {
    const newRoom = {
        _id: getID,
        name: getName,
        type: getType
    };
    try {
        const response = yield (0, Rooms_1.updateRoomData)(newRoom);
        console.log(`Room update successfully:`, response);
        return response.rooms;
    }
    catch (error) {
        console.error(`Failed to update room: ${error.message}`);
    }
});
exports.updateRoom = updateRoom;
const deleteRoom = (getID) => __awaiter(void 0, void 0, void 0, function* () {
    const newRoom = {
        _id: getID
    };
    try {
        const response = yield (0, Rooms_1.deleteRoomData)(newRoom);
        console.log('Room Deleted!', response);
    }
    catch (error) {
        console.error(`Failed to delete room: ${error.message}`);
    }
});
exports.deleteRoom = deleteRoom;
