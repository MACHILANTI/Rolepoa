const http = require("http"), fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..", "public");
const types = {".html":"text/html",".css":"text/css",".js":"text/javascript",".json":"application/json",".png":"image/png",".jpg":"image/jpeg",".svg":"image/svg+xml",".webmanifest":"application/manifest+json",".ico":"image/x-icon",".gif":"image/gif",".mp4":"video/mp4"};
http.createServer((req,res)=>{
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/index.html";
  const fp = path.join(root, p);
  fs.readFile(fp,(err,data)=>{
    if(err){res.writeHead(404);res.end("404");return;}
    res.writeHead(200,{"Content-Type":types[path.extname(fp).toLowerCase()]||"application/octet-stream","Cache-Control":"no-cache"});
    res.end(data);
  });
}).listen(5500,"127.0.0.1",()=>console.log("Servindo em http://127.0.0.1:5500"));
