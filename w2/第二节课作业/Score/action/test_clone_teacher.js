const { assert } = require('chai');
const { abi } = require('../artifacts/contracts/Teacher.sol/TeacherFactory.json');
async function main() {
    const accounts = await hre.ethers.getSigners();
    let contractAddress = "0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f";
    let teacher = "0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1";
    // 设置为非部署账号
    const teacherFactory = await new hre.ethers.Contract(contractAddress, abi, accounts[1]);

    let salt = hre.ethers.utils.formatBytes32String("123");
    let tx = await teacherFactory.cloneTeacher(teacher, hre.ethers.utils.keccak256(salt));
    let txResult = await tx.wait();
    console.log("txResult: ", txResult);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });