// const hre = require("hardhat");

async function main() {
  // await hre.run('compile');
  
  const Counter = await hre.ethers.getContractFactory("Counter");
  let initValue = 5;
  const counter = await Counter.deploy(initValue);

  await counter.deployed();

  console.log("Counter deployed to:", counter.address);
  console.log("counter current value:", await counter.counter());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
