import { BookingContract } from "../types/truffle-contracts";

const Booking:BookingContract = artifacts.require("Booking");

module.exports = async (deployer: Truffle.Deployer) => {
  deployer.deploy(Booking);
};
