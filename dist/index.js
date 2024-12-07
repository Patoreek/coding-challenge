"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
// Load and parse the data file
const data = JSON.parse(fs_1.default.readFileSync('./data.json', 'utf-8'));
const main = () => {
    console.log('index.jss');
};
main();
