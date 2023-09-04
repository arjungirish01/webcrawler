function normaliseURL(url){
  const urlObj=new URL(url);
  const host= `${urlObj.hostname}${urlObj.pathname}`;
  if(host.length>0&&host.slice(-1)==="/"){
    return host.slice(0,-1);
  }
  return host;
}

module.exports={
  normaliseURL
}