const {test,expect}=require('@jest/globals');
const {sortPages}=require("./report.js");

test('report test',()=>{
  const input={
    "https://github.com":2,
    "https://github.com/list":9
  }
  const actual=sortPages(input);
  const expected=[["https://github.com/list",9],["https://github.com",2]];
  expect(actual).toEqual(expected);
})