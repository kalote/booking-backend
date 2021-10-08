"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Booking = artifacts.require("Booking");
module.exports = function (deployer) {
    deployer.deploy(Booking);
};
