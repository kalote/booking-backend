import { MigrationsContract } from "../types/truffle-contracts";

const Migrations: MigrationsContract = artifacts.require("Migrations");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
} as Truffle.Migration;

export {};
