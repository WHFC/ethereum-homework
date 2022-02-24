var Counter = artifacts.require("Counter");
module.exports = async function(callback) {
    var counter = await Counter.deployed();
    let value = await counter.counter();
    console.log("current value: " + value);
    await counter.add(3);
    value = await counter.counter();
    console.log("current value: " + value);
    await counter.sub(2);
    value = await counter.counter();
    console.log("current value: " + value);
}