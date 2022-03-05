const { assert } = require('chai');
const jsonTeacherFactory = require('../artifacts/contracts/Teacher.sol/TeacherFactory.json');
const jsonTeacher = require('../artifacts/contracts/Teacher.sol/Teacher.json');
async function main() {
    const accounts = await hre.ethers.getSigners();
    let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    // 设置为部署账号
    const teacherFactory = await new hre.ethers.Contract(contractAddress, jsonTeacherFactory.abi, accounts[0]);

    // 将accounts[1].address作为新创建teacher的owner; 部署factory后的第一次newTeacher调用，并不是进行的clone，在内部会new一个Teacher, 之后的newTeacher是以这个Teacher地址进行的克隆
    let tx = await teacherFactory.newTeacher(accounts[1].address);
    let result = await tx.wait();
    // 可以从tx的logs[0].data中获取到
    console.log("address: ", result.events[0].data);
    console.log("address: ", result.events[0].data.substring(26));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });