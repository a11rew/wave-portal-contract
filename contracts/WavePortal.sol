//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 private totalWaves;
    uint256 private seed;

    // Event published on new wave tx
    event NewWave(address indexed from, uint256 timestamp, string message);

    // Cooldown error object
    error CooldownError(address addr, uint256 lastTime);

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    Wave[] private waves;

    // Mapping for cooldown
    mapping(address => uint256) public lastWavedAt;

    constructor() payable {
        console.log("Constructed");
        seed = (block.timestamp * block.difficulty) % 100;
    }

    function wave(string memory _message) public {
        console.log("Last waved: %s", lastWavedAt[msg.sender]);
        // Cooldown

        if (lastWavedAt[msg.sender] + 15 seconds > block.timestamp) {
            revert CooldownError(msg.sender, block.timestamp);
        }

        // Update lastwaved for user
        lastWavedAt[msg.sender] = block.timestamp;

        totalWaves += 1;

        waves.push(Wave(msg.sender, _message, block.timestamp));

        // Generate new seed for next user
        seed = (block.timestamp * block.difficulty + seed) % 100;

        console.log("Random # generated %s", seed);

        emit NewWave(msg.sender, block.timestamp, _message);

        if (seed <= 7) {
            console.log("%s won!", msg.sender);

            uint256 prizeAmount = 0.0001 ether;

            require(
                prizeAmount <= address(this).balance,
                "Contract has less funds than withdrawal amount"
            );

            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from account");
        }
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %s total waves", totalWaves);
        return totalWaves;
    }
}
