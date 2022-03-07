const express = require('express');
//모듈 추출

const app = express();
//웹 서버 생성

app.listen(52273, function() {
    console.log('server running at http://127.0.0.1:52273');
});//server 실행

app.get('/', function(request, response) {
    fs.readFile("main.html", function(error, data) {
        response.writeHead(200, {"Content-Type" : "text/html"});
        response.end(data);
    });
}); //메인 화면
