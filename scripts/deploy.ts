// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import hre from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // Get deployer info; Signer address and account balance
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log(`Deploying contracts signed by account: ${deployer}`);
  console.log(`Account balance: ${accountBalance}`);

  const Token = await hre.ethers.getContractFactory("WavePortal");
  const portal = await Token.deploy();

  console.log(`WavePortal address: ${portal.address}`);
}

(async () => {
  try {
    await main();
  } catch (error) {
    console.log(error);
    process.exitCode = 1;
  }
})();
