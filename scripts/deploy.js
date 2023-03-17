// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const CounterV1 = await ethers.getContractFactory("CounterV1");
  console.log("Deploying contract.....");
  const beacon = await upgrades.deployBeacon(CounterV1);
  await beacon.deployed();
  console.log("Beacon deployed to:", beacon.address);

  const counterV1 = await upgrades.deployBeaconProxy(beacon, CounterV1, [99], {initializer: "init",});
  await counterV1.deployed();
  console.log("proxy deployed to:", counterV1.address);

  // console.log("Verifying contract.....");
  // await hre.run("verify:verify", {
  //   address: counterV1.address,
  // });
  // console.log("contract Verifyed!");

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
