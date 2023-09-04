function printReport(pages){
  const arrSorted=sortPages(pages);
  console.log("\n");
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  console.log("REPORT")
  for(const ele of arrSorted){
    console.log(`${ele[0]}:${ele[1]}`);
  }
  console.log("\n");
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  console.log("END OF REPORT ")
  
}

function sortPages(pages){
  const arr=Object.entries(pages);//returns as array
  arr.sort((a,b)=>{
    const aHit=a[1];
    const bHit=b[1];
    return bHit-aHit;
  })
  return arr;
}

module.exports={
  sortPages,
  printReport
}