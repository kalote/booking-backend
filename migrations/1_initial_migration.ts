import { MigrationsContract } from "../types/truffle-contracts";

const Migrations:MigrationsContract = artifacts.require("Migrations");

module.exports = async (deployer: Truffle.Deployer) => {
  deployer.deploy(Migrations);
};
