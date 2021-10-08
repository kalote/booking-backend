import { BookingContract, BookingInstance } from "../types/truffle-contracts";

const Booking: BookingContract = artifacts.require("Booking");

contract("Booking", (accounts: Truffle.Accounts) => {
  let bookingDeployed: BookingInstance;
  const NUMBER_OF_ROOMS = 20;
  const ERROR_REASON = "You haven't booked this room!";

  before(async () => {
    bookingDeployed = await Booking.deployed();
  });

  it("deploys successfully Booking", async () => {
    const address = await bookingDeployed.address;
    assert.notEqual(address, "0x0");
    assert.notEqual(address, "");
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  });

  it("All rooms has been created", async () => {
    const roomCount = await bookingDeployed.roomCount();
    assert.equal(roomCount.toNumber(), NUMBER_OF_ROOMS);
  });

  /**
   * Mapping struct == js array with index as follow:
   * [0] uint256 id;
   * [1] string company;
   * [2] bool booked;
   * [3] address bookedBy;
   * [4] uint256 bookedAt;
   */
  it("COKE and PEPSI room exists", async () => {
    const cokeRoom = await bookingDeployed.rooms(0);
    const pepsiRoom = await bookingDeployed.rooms(10);
    assert.equal(cokeRoom[1], "COKE");
    assert.equal(pepsiRoom[1], "PEPSI");
  });

  it("Can book a room", async () => {
    const when = new Date().getTime();
    const result = await bookingDeployed.book(0, web3.utils.toBN(when), {
      from: accounts[0],
    });
    const event = result.logs[0].args;

    assert.equal(event.id.toNumber(), 0);
    assert.equal(event.company, "COKE");
    assert.equal(event.by, accounts[0]);
    if ("at" in event) assert.equal(web3.utils.toNumber(event.at), when);
  });

  it("Can cancel your own booking", async () => {
    // first we make a booking
    const when = new Date().getTime();
    const result = await bookingDeployed.book(0, web3.utils.toBN(when), {
      from: accounts[1],
    });

    // we retrieve the booking event emitted
    const bookingEvent = result.logs[0].args;

    // we cancel the booking and get the event emitted
    const cancel = await bookingDeployed.cancel(0, {
      from: accounts[1],
    });
    const cancelEvent = cancel.logs[0].args;
    assert.equal(cancelEvent.id.toNumber(), 0);
    assert.equal(cancelEvent.company, "COKE");
    assert.equal(cancelEvent.by, accounts[1]);
  });

  it("Cannot cancel others' booking", async () => {
    // first we make a booking
    const when = new Date().getTime();
    const result = await bookingDeployed.book(0, web3.utils.toBN(when), {
      from: accounts[0],
    });

    // we retrieve the booking event emitted
    const bookingEvent = result.logs[0].args;

    // we try to cancel the booking and get the event emitted
    try {
      const cancel = await bookingDeployed.cancel(0, {
        from: accounts[1],
      });
    } catch (error: any) {
      assert.equal(error.reason, ERROR_REASON);
    }
  });
});
