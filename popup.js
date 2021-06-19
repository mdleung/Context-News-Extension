

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

      const div1 = document.createElement("div");
      document.body.appendChild(div1);
      div1.textContent = "What does the Bible say about " + taxonomy.toLowerCase() + "?";
      div1.style.fontWeight = "bold";
      div1.style.marginBottom = "10px";
      //document.body.append(book + " " + chapter + ":" + verse, paragraph);
      document.body.append(book + " " + chapter + ":" + verse);
      document.body.append(" says in Scripture:");
      document.body.append(linebreak);
      
      const div2 = document.createElement("div");
      document.body.appendChild(div2);
      //document.body.append('"' + res.verse.quote + '"');
      div2.textContent = '"' + res.verse.quote + '"';
      div2.style.marginBottom = "10px";
     
      // Show "Watch a sermon" header
      const div3 = document.createElement('div')		
      div3.textContent = "Watch a sermon with Biblical teaching on " + taxonomy.toLowerCase() + ":";
      div3.style.marginTop = "10px"
      document.body.appendChild(div3)

      // Show video recommendations
      const div4 = document.createElement('div');
      div4.style.marginTop = "10px";
			
      // Video recommendation
	  const video1 = document.createElement('a');
	  video1.href = res.video.sermon_url;
	  video1.title = res.video.sermon_speaker + " - " + res.video.sermon_title + " - " + res.video.sermon_location;
	  video1.target = "_blank";
	  const video_img1 = document.createElement('img');
	  video_img1.src = "https://img.youtube.com/vi/" + res.video.sermon_url.slice(32) + "/0.jpg";
	  video_img1.width = 120;
	  video_img1.height = 90;
	  video1.appendChild(video_img1);      
	  div4.appendChild(video1);
	  document.body.appendChild(div4);

      // Show a dividing line
      const hr = document.createElement('hr');
      hr.style.marginTop = "10px";
      document.body.appendChild(hr); 
      
      // Display the action icons
	  const icon_like = document.createElement('img');
	  icon_like.src = "like.png";
	  icon_like.width = 24;
	  icon_like.height = 24;
	  
	  const icon_share = document.createElement('img');
	  icon_share.src = "share.png";
	  icon_share.width = 24;
	  icon_share.height = 24;
	  
	  const icon_settings = document.createElement('img');
	  icon_settings.src = "settings.png";
	  icon_settings.width = 24;
	  icon_settings.height = 24;
	  
	  document.body.appendChild(icon_like);
      document.body.append('            ');
      document.body.appendChild(icon_share);
      document.body.append('            ');
      document.body.appendChild(icon_settings); 
      

    }

    function onload() {
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, "", setCount);


      });
    }
  },
  false
);
