const {crawlpage}=require("./crawl.js");

function main(){
  if(process.argv.length<3){
    console.log("Invalid input from command line")
  }

  if(process.argv.length>3){
    console.log("Invalid input from command line")
  }

 const baseUrl=process.argv[2]; // process.argv contains 3 elements, last one is the commandline input
 crawlpage(baseUrl);
}

main();