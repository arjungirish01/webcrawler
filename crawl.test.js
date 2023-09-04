const {normaliseURL,getUrlFromHtml}=require("./crawl.js");
const {test,expect}=require("@jest/globals");

test('normaliseURL',()=>{
  const input="https://ARJUN.com/resource/";
  const actual =normaliseURL(input);
  const expected="arjun.com/resource";

  expect(actual).toEqual(expected);
})

test('getUrlFromHtml',()=>{
  const input=`
  <html>
    <body>
      <a href="https://arjun.com/resource"
          resource link
      </a>
      <a href="invalid">
      Link
      </a>
    </body>
  </html>  `;
  const baseUrl="https://arjun.com"
  const actual =getUrlFromHtml(input,baseUrl);
  const expected=["https://arjun.com/resource"];

  expect(actual).toEqual(expected);
})