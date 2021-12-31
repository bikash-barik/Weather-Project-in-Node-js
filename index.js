const http = require("http");
const fs = require("fs");
const requests = require("requests");

const homeFile = fs.readFileSync("index.html", "utf-8");


const replaceVal = (tempVal, orgVal) => {
  let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);
  temperature = temperature.replace("{%country%}", orgVal.sys.country);
  temperature = temperature.replace("{%location%}", orgVal.name);
  temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
  temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
  temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main);
  return temperature;
};
fs.lstat
const server = http.createServer((req, res) =>{
    if(req.url == "/"){
        requests('https://api.openweathermap.org/data/2.5/weather?q=Odisha&appid=abe7901a5fe9d6c45afde192a469cf54')
        .on('data', (chunk) => {
          const objdata = JSON.parse(chunk);
          const arrData = [objdata];
          // console.log(arrdata[0].name);

          const realTimedata = arrData.map((val) => replaceVal(homeFile, val)).join("");
            res.write(realTimedata);
            // console.log(realTimedata);
         })
        .on('end', (err) => {
          if (err) return console.log('connection closed due to errors', err);
          res.end();
          console.log('end');
        }); 
    
    }

});

server.listen(8000, "127.0.0.1");