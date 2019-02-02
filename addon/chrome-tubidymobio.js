// ==UserScript==
// @name            Easy YouTube mp3
// @description     The Easy YouTube mp3 Add-on includes a Button on any YouTube Page and allows you to convert the YouTube Video to a mp3 with just one click.
// @icon            https://www.easy-youtube-mp3.com/addon/icon.png
//
// @author          Theveloper
// @namespace       https://tubidymp3download.com
// @downloadURL     https://raw.githubusercontent.com/aabell3/easyYT/master/addon/chrome-tubidymobio.js
//
// @license         GPLv3 - http://www.gnu.org/licenses/gpl-3.0.txt
// @copyright       Copyright (C) 2018, by Theveloper
//
// @include         http://www.youtube.com/*
// @include         https://www.youtube.com/*
//
// @version         2.1
// @updateURL       https://raw.githubusercontent.com/aabell3/easyYT/master/addon/chrome-tubidymobio.js
//
// @run-at          document-end
// @unwrap
// ==/UserScript==

easy_btn_onclick = function (){
  var path ='https://https://dl.tubidymusicdownload.com/convert.php?search='+encodeURIComponent(window.location);
  window.open(path,'_blank');
};

getSpan = function(text, className) {
    var _tn = document.createTextNode(text);
    var span = document.createElement("span");
    span.className = className;
    span.appendChild(_tn);
    return span;
};

var myAppInterface = {
  init:function(){
    this.insertGlobalCSS()
  },
  addGlobalStyle: function(doc, css) {
    if(document.querySelector('.easy-youtube-mp3-css'))return;
    var head = doc.getElementsByTagName('head')[0];
    if (!head) {return; }
    var style = doc.createElement('style');
    style.id = 'easy-youtube-mp3-css';
    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
  },
  insertGlobalCSS: function(){
    var css = function (){
      /*start
      #easyyoutubemp3.ytd-watch{padding-top:10px;overflow: auto;border-bottom: 1px solid #eee;padding-bottom: 10px;}
      #easyyoutubemp3 .easy_btn{background-color: #FF0000;border: #FF0000;border-radius: 2px;color: #FFF;padding: 10px 16px; font-size: 1.4em;cursor:pointer;display:inline-block}
      #easyyoutubemp3 .easy_btn:hover{background-color: #a22a2a}
      @media (min-width: 657px){ytd-watch[theater] #easyyoutubemp3.ytd-watch{margin-right:24px}}
      end*/
    }.toString().replace("/*start",'').replace("end*/",'').slice(14,-1);
    this.addGlobalStyle(document, css);
  },
}

createButton = function() {
    var obj = document.querySelector('#primary-inner>#info');
    if(obj != null){
        // check if the button has already been created
        var btnRow = document.getElementById('easyyoutubemp3');
        if(btnRow == null){
            myAppInterface.init()
            var easyyoutubemp3 = document.createElement("div");
            easyyoutubemp3.id = "easyyoutubemp3";
            easyyoutubemp3.className = "style-scope ytd-watch";

            var easy_btn = document.createElement("div");
            easy_btn.className = "style-scope easy_btn";

            easy_btn.appendChild(getSpan("Tubidy - DOWNLOAD"))

            easy_btn.onclick = easy_btn_onclick;

            obj.parentNode.insertBefore(easyyoutubemp3, obj);
            easyyoutubemp3.appendChild(easy_btn);
        }
    }
};

// yt does make use of some bogus AJAX functionality which breaks pagemod
// we have to check in intervals if the document has been replaced by yt to
// recreate the button if needed.
var intervalCheck = setInterval(function(){ createButton() }, 250);
