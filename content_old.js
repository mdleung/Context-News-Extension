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

  const url = chrome.runtime.getURL('./data/verses.json');
  //loading the Bible JSON file to be read by other functions

  const words = {
    hunger: matches_hunger,
    forgiveness: matches_forgiveness,
    love: matches_love,
  };

  let prop = "taxonomy";

  //manifest only allow for loading when on page OTHER THAN localhost (something broken with localhost)
  item = fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      return json;
    })
    .then(function (json) {

      //split verses in terms of taxonomy
      var groupedVerses = {};
      for (var i = 0; i < json.length; i++) {
        var p = json[i][prop];
        if (!groupedVerses[p]) {
          groupedVerses[p] = [];
        }
        groupedVerses[p].push(json[i]);
      }

      return groupedVerses;
    })
    .then(function (groupedVerses) {

      //Find out which word matched (appears most times) in the document 
      var word = Object.keys(words).reduce((a, b) =>
        words[a] > words[b] ? a : b
      );

      switch (word) {
        case "hunger":
          return groupedVerses.Hunger;

        case "love":
          return groupedVerses.Love;

        case "forgiveness":
          return groupedVerses.Forgiveness;

        default:
          console.log("error: not matched by switch");
      }
    })
    .then(function (verses) {
      sendResponse({
        verse: verses[Math.floor(Math.random() * verses.length)],
      });

      return verses[Math.floor(Math.random() * verses.length)];
    })
    .catch(rejected => {
      console.log(rejected);
  });

  chrome.runtime.sendMessage({
    url: window.location.href,
    count: matches_love.length,
  });

  //important for async
  return true;
});
