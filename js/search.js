$(document).ready(function () {
  var API_KEY = "";
  var search = "";
  var maxResults = 1

  $("#myForm").submit(function (e) {
    e.preventDefault();

    search = $("#search").val();

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
        displayVideos(data);
      },
    });
  });

  $("#search").change(function () {
    search = $("#search").val();
  });

  function displayVideos(data) {
    $("#search").val("");

    $("#table").show();

    data.items.forEach((item) => {
      $("#link").append(`<a target="_blank" href="https://www.youtube.com/watch?v=${item.id.videoId}">` + '<strong>자세히 보기(Click)</strong>'+ '</a>')

    });
  }
});