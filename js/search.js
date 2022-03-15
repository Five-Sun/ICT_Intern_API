$(document).ready(function() {
  var API_KEY="AIzaSyDQSVysWES54RDYnjZtfbmftS1K6WlBpVQ";
  var video = ""

  $("form").submit(function(event) {
    event.preventDefault()

    var search = $("#search").val()

    videoSearch(API_KEY,search,1)
  })

  function videoSearch(key, search, maxResults) {
      $.ajax({
        method: "GET",
        url: "https://www.googleapis.com/youtube/v3/search?key=" + key
        + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search
    })
        .done(function (msg) {
            console.log(msg);
            $("#videos").html("<a href='http://www.youtube.com/embed/"+ msg.items[0].id.videoId + "' target='_blank' >" + "<strong>자세히 보기(Click)</strong>" + "</a>");
        });
  
    };
});