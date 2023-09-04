const {JSDOM}=require("jsdom");

async function crawlpage(baseUrl){
    console.log(`crawling active on: ${baseUrl}`);
    try{
    const response=await fetch(baseUrl); //default fetch method is GET and returns html
    
    if(response.status>399){
      console.log(`Status ${response.status} : ${baseUrl}`)
      return;
    }
    const content=response.headers.get("content-type");
    if(content.includes("html/text")){
      console.log(`Non html element: ${baseUrl}`);
      return;
    }

    console.log(await response.text());

    }catch(error){
      console.log(`${error.message}: ${baseUrl}:`);
    }


}

function getUrlFromHtml(html,baseUrl){
  let linkArray=[];
  const dom=new JSDOM(html); //converting string to DOM
  const anchorElement=dom.window.document.querySelectorAll('a');
  for(ele of anchorElement){
    if(ele.href.slice(0,1)==='/'){ //relative url

      try{
        const urlObj=new URL(`${baseUrl}${ele.href}`);
        linkArray.push(urlObj.href)
      }catch(error){
        console.log(`relative url: ${error.message}`);
      }
    }
    else{
      try{
        const urlObj=new URL(ele.href)
        linkArray.push(ele.href)
      }catch(error){
        console.log(`absolute url: ${error.message}`)
      }
    }
  }
  return linkArray;
}

function normaliseURL(url){
  const urlObj=new URL(url);
  const host= `${urlObj.hostname}${urlObj.pathname}`;
  if(host.length>0&&host.slice(-1)==="/"){
    return host.slice(0,-1);
  }
  return host;
}

module.exports={
  normaliseURL,
  getUrlFromHtml,
  crawlpage
}