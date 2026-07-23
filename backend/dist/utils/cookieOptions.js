"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
};
exports.default = cookieOptions;
