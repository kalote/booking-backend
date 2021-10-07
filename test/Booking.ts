import { BookingContract, BookingInstance } from "../types/truffle-contracts";

const Booking: BookingContract = artifacts.require("Booking");

contract("Booking", (accounts: Truffle.Accounts) => {
  let bookingDeployed: BookingInstance;

  before(async () => {
    bookingDeployed = await Booking.deployed();
  });

  it("deploys successfully Booking", async () => {
    const address = await bookingDeployed.address;
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  });

  it("Rooms has been created", async () => {
    const roomCount = await bookingDeployed.roomCount();
    assert.equal(roomCount.toNumber(), 10);
  });

  it("Can book a room", async () => {
    const when = new Date().getTime();
    const result = await bookingDeployed.book(1, web3.utils.toBN(when), {
      from: accounts[0],
    });
    const event = result.logs[0].args;

    assert.equal(event.id.toNumber(), 1);
    assert.equal(event.company, "COKE");
    assert.equal(event.by, accounts[0]);
    assert.equal(web3.utils.toNumber(event.at), when);
  });
});
