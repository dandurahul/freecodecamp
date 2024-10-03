"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./src/database-source/database-connection");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 1001;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
