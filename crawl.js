const {JSDOM}=require("jsdom");

async function crawlpage(baseUrl,currentUrl,pages){

    const baseUrlObj=new URL(baseUrl);
    const currentUrlObj=new URL(currentUrl);

    if(baseUrlObj.hostname!==currentUrlObj.hostname){
      return pages;
    }

    const currentNormalised=normaliseURL(currentUrl);

    if(pages[currentNormalised]>0){
      pages[currentNormalised]++
      return pages
    }
    
    pages[currentNormalised]=1;

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

    const htmlBody=await response.text()

    const nextUrls=getUrlFromHtml(htmlBody,baseUrl);
    for(const ele of nextUrls){
      pages=await crawlpage(baseUrl,ele,pages);
    }

    }catch(error){
      console.log(`${error.message}: ${baseUrl}:`);
    }

    console.log(`crawling active on: ${baseUrl}`);
    return pages;
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
        console.log(`relative url: ${error.message} for page: ${urlObj.href}`);
      }
    }
    else{
      try{
        const urlObj=new URL(ele.href)
        linkArray.push(ele.href)
      }catch(error){
        console.log(`absolute url: ${error.message} for page: ${ele.href}`)
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