import hre from "hardhat";
import { expect } from "chai";

describe("Greeter", function () {
  it("Should return a uint256 waveCount", async function () {
    const waveContractFactory = await hre.ethers.getContractFactory(
      "WavePortal"
    );
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();

    expect(await (await waveContract.getTotalWaves())._isBigNumber);
  });
});
