var fs = require('fs');
var ejs = require('ejs');
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var socketio = require('socket.io');
var http = require('http');
var multipart = require('connect-multiparty');
//모듈 추출


var client = mysql.createConnection({
    user: 'root',
    password: '0000',
    database: 'project'
});//db연동

var app = express();
var server = http.createServer(app);
//웹 서버 생성

app.use(multipart({ uploadDir: __dirname + '/public'}));
//multipart 설정

app.use(express.static(__dirname + '/public'));
//정적 파일 폴더 설정

app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: true
})); // session 설정

app.use(bodyParser.urlencoded({
    extended: false
})); //bodyParser 설정


server.listen(52273, function() {
    console.log('server running at http://127.0.0.1:52273');
});//server 실행

app.get('/', function(request, response) {
    fs.readFile('login.html', function(error, data) {
        response.send(data.toString());
    });
}); //첫 로그인 화면

app.post('/', function(request, response) {
    var id = request.body.id;
    var pw = request.body.pw;

    if (id && pw) {
        client.query('SELECT * FROM member WHERE id = ? AND pw = ?', [id, pw], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                request.session.host= id;
                response.redirect('/main');
                response.end();
            } else {              
                response.send('<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); document.location.href="/";</script>');    
            }            
        });
    } else {        
        response.send('<script type="text/javascript">alert("ID와 Password를 입력하세요!"); document.location.href="/";</script>');    
        response.end();
    }
}); //로그인 기능

app.get('/signup', function(request, response) {
    fs.readFile('signup.html', function(error, data) {
        response.send(data.toString());
    });
}); //회원가입 화면

app.post('/signup', function(request, response) {
    var body = request.body;

    client.query('INSERT INTO member (id, pw, region, phone) VALUES (?,?,?,?)',[body.id, body.pw, body.region, body.phone], function() {
        response.redirect('/');
    });
 });//회원 추가 기능

app.get('/main', function(request, response) {
    fs.readFile("main.html", function(error, data) {
        response.writeHead(200, {"Content-Type" : "text/html"});
        response.end(data);
    });
}); //메인 화면

app.get('/chatting', function(request, response) {
    fs.readFile("chatting.html", function(error, data) {
        response.writeHead(200, {"Content-Type" : "text/html"});
        response.end(data);
    });
}); //채팅 화면

app.get('/gallery', function(request, response) {
    fs.readFile('gallery.html','utf8', function(error, data) {
        client.query('select * from info order by num desc', function(error, results) {
            response.send(ejs.render(data, {
                data: results
            }));
        });
    });
}); //게시물 목록

app.post('/search', function(request, response) {
    var query = "%" + request.body.query + "%";
    fs.readFile('searching.html','utf8', function(error, data) {
        client.query("select * from info where title like ? order by num desc", [query], function(error, results) {
            response.send(ejs.render(data, {
                data: results
            }));
        });
    });
 }); //검색 기능

app.get('/insert', function(request, response) {
    fs.readFile('insert.html','utf8',function(error,data) {
        response.send(data);
    });
});//게시물 추가 페이지로 이동

app.post('/insert', function(request, response) {
    var title = request.body.title;
    var date = request.body.date;
    var imageFile = request.files.image;

    if(imageFile && imageFile.size > 0) {
        var name = imageFile.name;
        var path = imageFile.path;
        var type = imageFile.type;

        if(type.indexOf('image') != -1) {
            //이미지 파일의 경우: 파일 이름을 변경합니다.
            var outputPath = __dirname + '/public/' + name ;
            fs.rename(path, outputPath, function(error) {
                
            });
        } else {
            //이미지 파일이 아닌 경우: 파일을 제거합니다.
            fs.unlink(path, function(error) {
                response.sendStatus(400);
            });
        }
    }

    client.query('insert into info (title, date, image, host) values (?, ?, ?, ?)',[title, date, name, request.session.host], function() {
        response.redirect('/gallery');
    });

});// 게시물 추가 기능

app.get('/mypage', function(request, response) {
    fs.readFile('mypage.html','utf8', function(error, data) {
        client.query('select * from info where host=? order by num desc', [request.session.host], function(error, results) {
            response.send(ejs.render(data, {
                data: results
            }));
        });
    });
 }); //마이페이지 기능

 app.post('/mysearch', function(request, response) {
    var query = "%" + request.body.query + "%";
    fs.readFile('mysearching.html','utf8', function(error, data) {
        client.query("select * from info where title like ? and host=? order by num desc", [query, request.session.host], function(error, results) {
            response.send(ejs.render(data, {
                data: results
            }));
        });
    });
 }); //마이페이지 내부 검색 기능


app.get('/delete/:num', function(request, response) {
    
    client.query('delete from info where num=?',[request.params.num],function() {
        response.redirect('/mypage');
    });
 });//삭제 기능

app.get('/edit/:num', function(request, response) {
    fs.readFile('edit.html','utf8', function(error, data) {
        client.query('select * from info where num =?', [request.params.num], function(error, result) {
            response.send(ejs.render(data, {
                data: result[0]
            }));
        });
    });
 });// 수정 페이지로 이동

app.post('/edit/:num', function(request, response) {
    var title = request.body.title;
    var date = request.body.date;
    var imageFile = request.files.image;

    if(imageFile && imageFile.size > 0) {
        var name = imageFile.name;
        var path = imageFile.path;
        var type = imageFile.type;

        if(type.indexOf('image') != -1) {
            //이미지 파일의 경우: 파일 이름을 변경합니다.
            var outputPath = __dirname + '/public/' + name ;
            fs.rename(path, outputPath, function(error) {
                
            });
        } else {
            //이미지 파일이 아닌 경우: 파일을 제거합니다.
            fs.unlink(path, function(error) {
                response.sendStatus(400);
            });
        }
    }

    client.query('update info set title=?, date=?, image=? where num=?', [title, date, name, request.params.num], function() {
        response.redirect('/mypage');
    });
 }); // 수정 기능

 // 소켓 서버를 만든다.
var io = socketio.listen(server);

// 접속한 사용자의 방이름, 사용자명, socket.id값을 저장할 전역변수
const loginIds = new Array();

io.sockets.on("connection", function(socket) {

    socket.on("access", function(data) {

        socket.leave(socket.id);
        socket.join(data.room);

        loginIds.push({
              socket : socket.id  // 생성된 socket.id
            , room : data.room  // 접속한 채팅방의 이름
            , user : data.name   // 접속자의 유저의 이름
        });

        // 사용자가 페이지 새로고침시 loginIds 변수에 값이 누적되지 않게 동일한 사용자의 socket.id 값을 삭제한다.
        for(var num in loginIds) {

            // 사용자 이름이 같으면서, 기존소켓아이디와 현재 소켓아이디가 다른 값이 있는지 찾아낸다.
            if(loginIds[num]['user'] == data.name && loginIds[num]['socket'] != socket.id) {
               
                // loginIds의 해당 순서의 값을 삭제한다.
                loginIds.splice(num, 1);
            }
        }

        // 클라이언트의 Contact 이벤트를 실행하여 입장한 사용자의 정보를 출력한다.
        io.sockets.in(data.room).emit("contact", {
              count : io.sockets.adapter.rooms[data.room].length
            , name : data.name
            , message : data.name + "님이 채팅방에 들어왔습니다."
        });
    });

    // 메세지 전송 이벤트
    socket.on("message", function(data) {

        // 클라이언트의 Message 이벤트를 발생시킨다.
        io.sockets.in(data.room).emit("message", data);
    });
});