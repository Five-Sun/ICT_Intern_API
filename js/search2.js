function youtube() {
  $(document).ready(function () {
    var API_KEY = "AIzaSyDQSVysWES54RDYnjZtfbmftS1K6WlBpVQ";
    var video = ""

    $("title").click(function (event) {
      event.preventDefault()

      var search = $("#title").val()

      videoSearch(API_KEY, search, 1)
    })

    function videoSearch(key, search, maxResults) {

      $.get("https://www.googleapis.com/youtube/v3/search?key=" + key
        + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search, function (data) {
          console.log(data)

          data.items.forEach(item => {
            video = `
          <iframe width="420" height="315" src="http://www.youtube.com/embed/${item.id.videoID}" frameborder="0" allowfullscreen></iframe>
          `
            $("videos").append(video)
          });
        })
    }
  })

}
