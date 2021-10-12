// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Booking {
    uint256 public roomCount = 0;

    struct Room {
        uint256 id;
        string company;
        bool booked;
        address bookedBy;
        uint256 bookedAt;
    }

    event roomBooked(uint256 id, string company, address by, uint256 at);
    event bookingCancelled(uint256 id, string company, address by);

    mapping(uint256 => Room) public rooms;

    constructor() public {
        for (uint256 i = 0; i < 20; i++) {
            createRoom(i < 10 ? "COKE" : "PEPSI");
        }
    }

    function createRoom(string memory _company) private {
        rooms[roomCount] = Room(roomCount, _company, false, address(0), 0);
        roomCount++;
    }

    function book(uint256 _id, uint256 _time) public {
        Room memory _room = rooms[_id];
        _room.booked = true;
        _room.bookedBy = msg.sender;
        _room.bookedAt = _time;
        rooms[_id] = _room;
        emit roomBooked(_id, _room.company, msg.sender, _time);
    }

    function cancel(uint256 _id) public {
        Room memory _room = rooms[_id];
        require(msg.sender == _room.bookedBy, "You haven't booked this room!");
        _room.booked = !_room.booked;
        _room.bookedBy = address(0);
        _room.bookedAt = 0;
        rooms[_id] = _room;
        emit bookingCancelled(_id, _room.company, msg.sender);
    }
}
