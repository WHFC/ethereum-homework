const { expect } = require("chai");
task("action", "test Counter's add and sub function", async (taskArgs, hre) => {
    const Counter = await ethers.getContractFactory("Counter");
    let initValue = 5;
    const counter = await Counter.deploy(initValue);
    await counter.deployed();

    expect(await counter.counter()).to.equal(initValue);
    console.log("counter current value:", await counter.counter());

    let testValue = 3;
    const setCounterTx1 = await counter.add(testValue);
    await setCounterTx1.wait();
    console.log("test counter.add(", testValue, "), result value:", await counter.counter());
    expect(await counter.counter()).to.equal(initValue+testValue);
    const setCounterTx2 = await counter.sub(testValue);
    await setCounterTx2.wait();
    console.log("test counter.sub(", testValue, "), result value:", await counter.counter());
    expect(await counter.counter()).to.equal(initValue+testValue-testValue);
  });