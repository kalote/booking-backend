// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Booking {
    uint roomCount = 0;
    
    struct Room {
        uint id;
        string company;
        bool booked;
        address bookedBy;
        uint256 bookedAt;
    }
    
    event roomBooked(
        uint id,
        string company,
        address by,
        uint256 at
    );
    
    mapping (uint => Room) public rooms;
    
    constructor() {
        for (uint i=0; i < 10; i++) {
            createRoom("COKE");
        }
    }
    
    function createRoom(string memory _company) private {
        rooms[roomCount] = Room(roomCount, _company, false, address(0), 0);
        roomCount ++;
    }
    
    function book(uint _id, uint256 _time) public {
        Room memory _room = rooms[_id];
        _room.booked = !_room.booked;
        _room.bookedBy = msg.sender;
        _room.bookedAt = _time;
        rooms[_id] = _room;
        emit roomBooked(_id, _room.company, msg.sender, _time);
    }
}
