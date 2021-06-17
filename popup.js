

document.addEventListener(
  "DOMContentLoaded",
  function () {
    window.addEventListener("load", onload, false);

    function setCount(res) {



      var taxonomy = res.verse.taxonomy;
      var book = res.verse.book
      var chapter = res.verse.chapter
      var verse = res.verse.verse

      var sermon_url = res.video.sermon_url
      var sermon_title = res.verse.sermon_title
      var sermon_speaker = res.verse.sermon_speaker
      var sermon_church = res.video.sermon_url
      var sermon_location = res.verse.sermon_location


      //alert(taxonomy)

      linebreak = document.createElement("br");
      paragraph = document.createElement("br");

      const div = document.createElement("div");


      document.body.appendChild(div);

      div.textContent = "What does the bible say about " + taxonomy;


     
      document.body.append(book + " " + chapter + " : " + verse, paragraph);

      document.body.append(linebreak);


      document.body.append(res.verse.quote);
      document.body.append(linebreak);




      document.body.append(res.video.sermon_url);


    }

    function onload() {
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, "", setCount);


      });
    }
  },
  false
);
