var page = 1;

function listup() {
    document.getElementById("result").innerHTML = page + "쪽";
    var url = "https://api.odcloud.kr/api/15071046/v1/uddi:abe42915-3cb5-477d-8d53-b7430e5567f0";
    var key = '?' + 'page=' + page + '&perPage=15&' + encodeURIComponent('serviceKey') + '=BpVkp8tRMvruN%2B9MjZ3x5M%2F%2BHLfC1sBr1cwsdHz002xQg9r04V4z4hR1TdTlTr9acG0%2B7OvJtVinbbZ3hCC1cQ%3D%3D'; /* Service Key*/

    $.ajax({
        method: "GET",
        url: url + key
    })
        .done(function (msg) {
            console.log(msg);
            console.log(msg.data.length);
            let table_data = "";
            for (var i = 0; i < msg.data.length; i++) {
                table_data += "<tr>";
                table_data += "<td>" + msg.data[i].저작물명 + "</td>";
                table_data += "<td>" + msg.data[i].아티스트명 + "</td>";
                table_data += "</tr>";
            }
            $('#table').html(table_data)
        });

}
$(document).ready(function () {
    listup();

    $('#increase').click(function () {
        page = parseInt(page) + 1;
        if (page > 114) {
            page = 114;
            alert("데이터 없음");
        }
        console.log(page);
        listup();
    });
    $('#decrease').click(function () {
        page = parseInt(page) - 1;
        if (page < 1) {
            page = parseInt(page) + 1;
            alert("데이터 없음");
        }
        console.log(page);
        listup();
    });

    $("#search").click(function () {
        page = document.getElementById('pagenum').value;
        if (page < 1 || page > 114) {
            alert("데이터 없음");
            location.reload();
        }
        console.log(page);
        listup();
    });
});