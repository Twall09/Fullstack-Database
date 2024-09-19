#!/usr/bin/env node

function mockPromiseCall(
  waitTime,
  returnValue = "Hello World!",
  shouldReject = false
) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) {
        reject(returnValue);
      } else {
        resolve(returnValue);
      }
    }, waitTime);
  });
}

async function asyncTest() {
  console.log("Start");
  const asyncResult = await mockPromiseCall(0, "Some return value").then(
    (result) => {
      console.log(result);
      return "Post Chain";
    }
  );
  console.log(asyncResult);
  console.log("End");
}
asyncTest();
