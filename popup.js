

document.addEventListener(
  "DOMContentLoaded",
  function () {
    window.addEventListener("load", onclick, false);

    function doThing(res) {
      
      
      

      var s = document.createElement('script');
      s.setAttribute('src','jquery-3.6.0.min.js');
      document.body.appendChild(s);

      var g = document.createElement('script');
      g.setAttribute('src','handlebars-v4.7.7.js');
      document.body.appendChild(g);


      //Retrieve the template data from the HTML .



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


      document.body.append(verse);
      document.body.append(linebreak);

      // const video = document.createElement("<iframe title='YouTube video player' type=\"text/html\" width='640' height='390' src='${sermon_url}' frameborder='0' allowFullScreen></iframe>")


      // document.body.append(video);
      



      var obj = {"video": {
        "value": `<iframe title='YouTube video player' type=\"text/html\" width='640' height='390' src=https://www.youtube.com/embed/${sermon_url} frameborder='0' allowFullScreen></iframe>`
      }}
      document.body.append(obj.video.value);

    }

    function onclick() {

      
      console.log(chrome.tabs)

      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {

        
        chrome.tabs.sendMessage(tabs[0].id, "", doThing);


      });
    }
  },
  false
);
