const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Counter", function () {
  it("Should return the new counter once it's changed", async function () {
    const Counter = await ethers.getContractFactory("Counter");
    let initValue = 5;
    const counter = await Counter.deploy(initValue);
    await counter.deployed();

    expect(await counter.counter()).to.equal(initValue);

    let testValue = 3;
    const setCounterTx1 = await counter.add(testValue);
    await setCounterTx1.wait();
    expect(await counter.counter()).to.equal(initValue+testValue);
    const setCounterTx2 = await counter.sub(testValue);
    await setCounterTx2.wait();
    expect(await counter.counter()).to.equal(initValue+testValue-testValue);
  });
});
