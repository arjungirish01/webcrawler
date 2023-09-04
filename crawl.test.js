const {normaliseURL}=require("./crawl.js");
const {test,expect}=require("@jest/globals");

test('normaliseURL',()=>{
  const input="https://arjun.com/resource/";
  const actual =normaliseURL(input);
  const expected="arjun.com/resource";

  expect(actual).toEqual(expected);
})