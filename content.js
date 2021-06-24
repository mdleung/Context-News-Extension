chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // Declare regular expressions of content matches
  const re_forgiveness = new RegExp("forgiveness", "gi");
  const re_hunger = new RegExp("hunger", "gi");
  const re_love = new RegExp("love", "gi");

  // Store content matches in constants (statement checks for null value, if null then assign zero)
  const matches_forgiveness = document.documentElement.innerText.match(
    re_forgiveness
  )
    ? document.documentElement.innerText.match(re_forgiveness).length //innerText != innerHTML
    : 0;
  const matches_hunger = document.documentElement.innerText.match(re_hunger) //innerText != innerHTML
    ? document.documentElement.innerText.match(re_hunger).length
    : 0;
  const matches_love = document.documentElement.innerText.match(re_love) //innerText != innerHTML
    ? document.documentElement.innerText.match(re_love).length
    : 0;

  //highlighting functionality
  var context = document.querySelector("body");
  var instance = new Mark(context);
  //adding all available taxonomies to highlight
  instance.mark(["hunger", "love", "forgiveness"]);


  const bibleVerses = chrome.runtime.getURL('./data/verses.json');
  //loading the Bible JSON file to be read by other functions

  const sermonVideos = chrome.runtime.getURL('./data/sermons.json');
  //loading the Bible JSON file to be read by other functions

  const words = {
    hunger: matches_hunger,
    forgiveness: matches_forgiveness,
    love: matches_love,
  };

  let prop = "taxonomy";

  var data = [bibleVerses,sermonVideos]


 
  var videoJSON

  video = fetch(data[1]) 
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    videoJSON = json
  })

  sermon = fetch(data[0])
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      return json;
    })
    .then(function (json) {

    
   
      
     return [splitGroup(json),splitGroup(videoJSON)];
    })
    .then(function (groupedData) {

      //Find out which word matched (appears most times) in the document 
      var word = Object.keys(words).reduce((a, b) =>
        words[a] > words[b] ? a : b
      );

      var verses = groupedData[0]
      var video = groupedData[1]

      console.log(verses)

      switch (word) {
        case "hunger":
  
          return [verses.Hunger,video.Hunger];

        case "love":

          return [verses.Love,video.Love];

        case "forgiveness":
          return [verses.Forgiveness,video.Forgiveness];

        default:
          console.log("error")
      }
    })
    .then(function (data) {
      
      
   
      

      
      sendResponse({
        verse: data[0][Math.floor(Math.random() * data[0].length)],
        video: data[1][Math.floor(Math.random() * data[1].length)]
      });

      return true;
    })
    .catch(rejected => {
      console.log(rejected);
  });




function splitGroup(json) {

  var groupedData = {};
  for (var i = 0; i < json.length; i++) {
    var p = json[i][prop];
    if (!groupedData[p]) {
      groupedData[p] = [];
    }
    groupedData[p].push(json[i]);
  }

  return groupedData

}




  chrome.runtime.sendMessage({
    url: window.location.href,
    count: matches_love.length,
  });

  //important for async
  return true;
});
