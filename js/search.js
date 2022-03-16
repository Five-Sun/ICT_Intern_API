function getYoutube(title, artist) {
    var API_KEY = "";
    var search = title + artist;
    var maxResults = 1


    API_KEY = "AIzaSyDQSVysWES54RDYnjZtfbmftS1K6WlBpVQ";

    var url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}
          &part=snippet&q=${search}&maxResults=${maxResults}&type=video`;

    $.ajax({
        method: "GET",
        url: url,
        beforeSend: function () {
            $("#btn").attr("disabled", true);
            $("#results").empty();
        },
        success: function (data) {
            console.log(data);
            $("#btn").attr("disabled", false);
            goYoutube(data);
        },
    });

    function goYoutube(data) {
        data.items.forEach((item) => {
            window.location.href =`https://www.youtube.com/watch?v=${item.id.videoId}>`;
        });
    }
}