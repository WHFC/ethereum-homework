const { assert } = require('chai');
const { ethers, Contract } = require('hardhat');

async function main() {
  // 获取已发布的Teacher合约
  const accounts = await hre.ethers.getSigners();
  const address = "0x7bc06c482DEAd17c0e297aFbC32f6e63d3846650";
  const Teacher = await ethers.getContractFactory("Teacher");
  const teacher = await Teacher.attach(address);

  // 获取现在已经有的考试数量
  let countOld = await teacher.getExamCount();
  console.log("exam old count: ", countOld);

  // 新建一个考试并确认创建是否成功
  let newExamTx = await teacher.newExam();
  await newExamTx.wait();
  let currentCount = await teacher.getExamCount();
  assert(currentCount - countOld == 1);
  console.log("exam current count: ", currentCount);

  // 通过现有考试数量-1得到新创建的考试index，检查是否有该考试（在创建的时候会返回考试index，且触发对应事件）
  let index = currentCount - 1;
  let haveExam = await teacher.haveExam(index);
  console.log("have index: ", index, " of exam: ", haveExam);
  assert(haveExam);

  // 设置三个学生的成绩，随后查询对应成绩
  const student1 = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8";
  const student2 = "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc";
  const student3 = "0x90f79bf6eb2c4f870365e785982e1f101e93b906";
  let tx1 = await teacher.setScore(index, student1, 99);
  await tx1.wait();
  let tx2 = await teacher.setScore(index, student2, 98);
  await tx2.wait();
  let tx3 = await teacher.setScore(index, student3, 97);
  await tx3.wait();
  console.log("student1 score: ", await teacher.getScore(index, student1));
  console.log("student2 score: ", await teacher.getScore(index, student2));
  console.log("student3 score: ", await teacher.getScore(index, student3));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
