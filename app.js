const http = require("http");
const fs = require("fs");
const chalk = require("chalk");
const port = process.env.PORT || 1234;

const server = http.createServer();
var lineArray = [];

function showTenLastLine() {
  fs.readFile("./test.txt", "utf8", (err, data) => {
    if (err) console.log("error", err);
    else {
      let tempArray = [...lineArray, data][0].split("\n");
      if (tempArray.length > 10) tempArray = tempArray.slice(-10).join("\n");
      console.log(
        chalk.bold.rgb(11, 255, 52)(tempArray),
        chalk.rgb(255, 11, 165)("getting last 10 lines")
      );
    }
  });
}

showTenLastLine();

fs.watchFile("./test.txt", stats => {
  showTenLastLine();
});

server.listen(port, () => console.log(`server is running on ${port}`));
