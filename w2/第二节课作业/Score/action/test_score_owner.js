const { assert } = require('chai');
const { abi } = require('../artifacts/contracts/Teacher.sol/Teacher.json');
async function main() {
    const accounts = await hre.ethers.getSigners();
    let contractAddress = "0x4826533B4897376654Bb4d4AD88B7faFD0C98528";
    // 设置为非部署账号
    const teacher = await new hre.ethers.Contract(contractAddress, abi, accounts[1]);

    let currentCount = await teacher.getExamCount();
    console.log("exam current count: ", currentCount);

    let index = currentCount - 1;
    let haveExam = await teacher.haveExam(index);
    console.log("have index: ", index, " of exam: ", haveExam);
    assert(haveExam);

    // 测试能否设置大于100的分数
    const student1 = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8";
    let score = 100;
    let tx1 = await teacher.setScore(index, student1, score);
    await tx1.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });