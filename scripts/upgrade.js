
// const hre = require("hardhat");
const { ethers, upgrades } = require("hardhat");
const abi = require('./UpgradeableBeacon.json')

async function main() {
    const PROXY_ADDRESS = '0xDBAc97f6ee88170750c748C1EE0C954d8086d15E'
    const BEACON_ADDRESS = '0xbF77e327589017227AcB8676Ec0A3b8A2e3544a4'
    const NEW_IMPL = '0x254C91560856f3cFFeEbC9014C084Ac6D8ea73B9'
    
    const CounterV2 = await ethers.getContractFactory("CounterV2");
    const counterV2 = CounterV2.attach(PROXY_ADDRESS);
    console.log("CounterV1 before upgrade:- ", Number(await counterV2.count()));

    // updating implementation in beacon
    console.log("Upgrading implementation in beacon");
    const beaconContract = new ethers.Contract(BEACON_ADDRESS, abi.abi, ethers.provider);
    const tx = await beaconContract.connect(await ethers.getSigner()).upgradeTo(NEW_IMPL);
    await tx.wait();
    console.log("Upgraded implementation in beacon");

    // check upgraded Funtionality contract
    const CounterV3 = await ethers.getContractFactory("CounterV3");
    const counterV3 = CounterV3.attach(PROXY_ADDRESS);
    const tx1= await counterV3.mul();
    await tx1.wait();
    console.log("CounterV2 decrementing after upgrade:- ", Number(await counterV3.count()));

    // console.log(await Number(ethers.provider.getBlockNumber()));
    // await upgrades.upgradeBeacon(BEACON_ADDRESS, CounterV2);
    // console.log("Beacon upgraded");

    // const counterV2 = CounterV2.attach(PROXY_ADDRESS);
    // await counterV2.dec();
    // console.log("CounterV2 decrementing after upgrade:- ", Number(await counterV2.count()));

    //   const CounterV1 = await ethers.getContractFactory("CounterV1");
    //   const counterV1 = await CounterV1.attach('0xe9d5D93edf139A1C794262cA626BFB1de1Af20C0');

    //   console.log("CounterV1 before upgrade:- ", Number(await counterV1.count()));

    //   const CounterV2 = await ethers.getContractFactory("CounterV2");
    //   const box = await upgrades.upgradeBeacon('0xe9d5D93edf139A1C794262cA626BFB1de1Af20C0', CounterV2);
    //   await box.wait()
    //   console.log("swqs");


    //   const counterV2 = await CounterV2.attach('0xe9d5D93edf139A1C794262cA626BFB1de1Af20C0');

    //   console.log("Box deployed to:", counterV1.address);

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
