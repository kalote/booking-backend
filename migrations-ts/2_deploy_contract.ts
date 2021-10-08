import { BookingContract } from "../types/truffle-contracts";

const Booking: BookingContract = artifacts.require("Booking");

module.exports = function (deployer) {
  deployer.deploy(Booking);
} as Truffle.Migration;

export {};
