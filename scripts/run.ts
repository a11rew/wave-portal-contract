import hre from "hardhat";

const main = async () => {
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy();

  console.log("Contract deployed to", waveContract.address);

  let waveCount;
  waveCount = await waveContract.getTotalWaves();
  console.log("Total number of waves: ", waveCount.toNumber());

  const waveTxn = await waveContract.wave("A message!");
  await waveTxn.wait();

  const [_, randomPerson] = await hre.ethers.getSigners();
  const waveTxnTwo = await waveContract.connect(randomPerson).wave("Message");
  await waveTxnTwo.wait();

  const allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
};

(async () => {
  try {
    await main();
  } catch (error) {
    console.log(error);
    process.exitCode = 1;
  }
})();
