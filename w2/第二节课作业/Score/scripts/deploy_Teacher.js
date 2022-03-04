// const hre = require("hardhat");

async function main() {
    // await hre.run('compile');
    
    const Teacher = await hre.ethers.getContractFactory("Teacher");
    const teacher = await Teacher.deploy();
  
    await teacher.deployed();
    await teacher.initialize();
    console.log("Counter deployed to:", teacher.address);
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  