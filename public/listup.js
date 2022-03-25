var page = 1;

function listup() {
    document.getElementById("result").innerHTML = page + "쪽";
    var url = "https://api.odcloud.kr/api/15071046/v1/uddi:abe42915-3cb5-477d-8d53-b7430e5567f0";
    var key = '?' + 'page=' + page + '&perPage=15&' + encodeURIComponent('serviceKey') + '=공공데이터_개인키'; /* Service Key*/

    $.ajax({
        method: "GET",
        url: url + key
    })
        .done(function (msg) {
            console.log(msg);
            console.log(msg.data.length);
            let table_data = "";
            for (var i = 0; i < msg.data.length; i++) {
                var arr1 = [];
                var arr2 = [];
                arr1[i] = JSON.stringify(msg.data[i].저작물명);
                arr2[i] = JSON.stringify(msg.data[i].아티스트명);
                table_data += "<tr>";
                table_data += "<td id='" + msg.data[i].저작물명 + "' title='Youtube 이동하기' onClick='js:getYoutube(" + arr1[i] + "," + arr2[i] + ")'>" + msg.data[i].저작물명 + "</td>";
                table_data += "<td>" + msg.data[i].아티스트명 + "</td>";
                table_data += "</tr>";
            }
            $('#table').html(table_data)
        });

} //저작물 테이블을 생성해주는 함수
$(document).ready(function () {
    listup();

    $('#increase').click(function () {
        page = parseInt(page) + 1;
        if (page > 114) {
            page = parseInt(page) - 1;
            alert("데이터 없음");
        }
        console.log(page);
        listup();
    }); //다음 페이지의 테이블을 가져오는 기능
    $('#decrease').click(function () {
        page = parseInt(page) - 1;
        if (page < 1) {
            page = parseInt(page) + 1;
            alert("데이터 없음"); 
        }
        console.log(page);
        listup();
    }); //이전 페이지의 테이블을 가져오는 기능

    $("#search").click(function () {
        page = document.getElementById('pagenum').value;
        if (page < 1 || page > 114) {
            alert("데이터 없음");
            location.reload();
        }
        console.log(page);
        listup();
    }); //검색한 페이지의 테이블을 가져오는 기능
});
