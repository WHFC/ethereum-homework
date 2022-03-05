// const hre = require("hardhat");

async function main() {
    // await hre.run('compile');
    
    // 单独部署Teacher
    // const accounts = await hre.ethers.getSigners();
    // const Teacher = await hre.ethers.getContractFactory("Teacher");
    // const teacher = await Teacher.deploy();
  
    // await teacher.deployed();
    // await teacher.initialize(accounts[0].address);
    // console.log("Teacher deployed to:", teacher.address);
    
    // 部署TeacherFactory，通过newTeacher接口部署teacher
    const TeacherFactory = await hre.ethers.getContractFactory("TeacherFactory");
    const teacherFactory = await TeacherFactory.deploy();
    await teacherFactory.deployed();
    console.log("TeacherFactory deployed to:", teacherFactory.address);
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  