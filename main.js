const {crawlpage}=require("./crawl.js");
const {printReport}=require("./report.js")

async function main(){
  if(process.argv.length<3){
    console.log("Invalid input from command line")
  }

  if(process.argv.length>3){
    console.log("Invalid input from command line")
  }

 const baseUrl=process.argv[2]; // process.argv contains 3 elements, last one is the commandline input
 const result=await crawlpage(baseUrl,baseUrl,{});
//  for(const ele of Object.entries(result)){ //as it is object non iterateable instead of for in we can use Object.entries
//     console.log(ele);
//  }
printReport(result);
}

main();