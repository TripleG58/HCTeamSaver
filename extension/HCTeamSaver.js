// download.min.js
!function(root,factory){"function"==typeof define&&define.amd?define([],factory):"object"==typeof exports?module.exports=factory():root.download=factory()}(this,(function(){return function download(data,strFileName,strMimeType){var self=window,defaultMime="application/octet-stream",mimeType=strMimeType||defaultMime,payload=data,url=!strFileName&&!strMimeType&&payload,anchor=document.createElement("a"),toString=function(a){return String(a)},myBlob=self.Blob||self.MozBlob||self.WebKitBlob||toString,fileName=strFileName||"download",blob,reader;if(myBlob=myBlob.call?myBlob.bind(self):Blob,"true"===String(this)&&(mimeType=(payload=[payload,mimeType])[0],payload=payload[1]),url&&url.length<2048&&(fileName=url.split("/").pop().split("?")[0],anchor.href=url,-1!==anchor.href.indexOf(url))){var ajax=new XMLHttpRequest;return ajax.open("GET",url,!0),ajax.responseType="blob",ajax.onload=function(e){download(e.target.response,fileName,defaultMime)},setTimeout((function(){ajax.send()}),0),ajax}if(/^data\:[\w+\-]+\/[\w+\-]+[,;]/.test(payload)){if(!(payload.length>2096103.424&&myBlob!==toString))return navigator.msSaveBlob?navigator.msSaveBlob(dataUrlToBlob(payload),fileName):saver(payload);mimeType=(payload=dataUrlToBlob(payload)).type||defaultMime}function dataUrlToBlob(strUrl){for(var parts=strUrl.split(/[:;,]/),type=parts[1],decoder,binData=("base64"==parts[2]?atob:decodeURIComponent)(parts.pop()),mx=binData.length,i=0,uiArr=new Uint8Array(mx);i<mx;++i)uiArr[i]=binData.charCodeAt(i);return new myBlob([uiArr],{type:type})}function saver(url,winMode){if("download"in anchor)return anchor.href=url,anchor.setAttribute("download",fileName),anchor.className="download-js-link",anchor.innerHTML="downloading...",anchor.style.display="none",document.body.appendChild(anchor),setTimeout((function(){anchor.click(),document.body.removeChild(anchor),!0===winMode&&setTimeout((function(){self.URL.revokeObjectURL(anchor.href)}),250)}),66),!0;if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent))return url=url.replace(/^data:([\w\/\-\+]+)/,defaultMime),window.open(url)||confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")&&(location.href=url),!0;var f=document.createElement("iframe");document.body.appendChild(f),winMode||(url="data:"+url.replace(/^data:([\w\/\-\+]+)/,defaultMime)),f.src=url,setTimeout((function(){document.body.removeChild(f)}),333)}if(blob=payload instanceof myBlob?payload:new myBlob([payload],{type:mimeType}),navigator.msSaveBlob)return navigator.msSaveBlob(blob,fileName);if(self.URL)saver(self.URL.createObjectURL(blob),!0);else{if("string"==typeof blob||blob.constructor===toString)try{return saver("data:"+mimeType+";base64,"+self.btoa(blob))}catch(y){return saver("data:"+mimeType+","+encodeURIComponent(blob))}(reader=new FileReader).onload=function(e){saver(this.result)},reader.readAsDataURL(blob)}return!0}}));

// HCTeamSaver.js
(function(){

    // utility functions
    function qs(elem, param) {return elem.querySelector(param);}
    function dqs(param) {return document.querySelector(param);}
    function dqsa(param) {return document.querySelectorAll(param);}
    function sleep(ms) {return new Promise(resolve=>setTimeout(resolve,ms));}

    if (window.location.href.includes("index.php?page=units")) {
        // inject Download button into DOM
        let hand = dqs('#inHand');
        let tmp = dqs('table.page table.page table.tborder:nth-child(2) > tbody > tr');
        tmp.insertAdjacentHTML('afterend',"<tr class='downloadBtn'><td><a>Download</a></td></tr>");
        tmp = tmp.parentNode;
        tmp = qs(tmp, 'tr.downloadBtn a');
        tmp.onclick = function(e){
            let elem = document.createElement('div');
            elem.innerHTML = hand.outerHTML;
            elem = elem.children[0];
            if (qs(elem, 'div') == null) {
                console.log('hand empty');
                return;
            }
            qs(elem, 'br + div').remove(); // remove show all button
    
            // download myTeam file
            var file = elem.outerHTML + "<style>body > #inHand {max-width: 300px;}img.inlineimg {display: none;}.units_link:hover {cursor: pointer;}</style><script>function showFigure(str) {let url = 'https://www.hcrealms.com/forum/units/units_figure.php?q=';url += str;window.open(url, '_blank');}</script>";
            download(file, "myTeam.html", "text/html");
        };
    }
    else if (window.location.href.includes("units_figure.php")) {
        { // remove unnecessary information
            // remove tcg add, comments, etc. (stuff after special powers)
            let elem = dqs('body > table:nth-child(2)');
            if (!elem) {
                elem = dqs('body > table');
            }
            while (elem.nextElementSibling instanceof HTMLElement) {
                elem.nextElementSibling.remove();
            }
            // remove inventory management
            elem = dqs('body > table > tbody > tr:nth-child(3)');
            if (qs(elem, 'a > img')) {
                elem = elem.nextElementSibling;
            }
            elem.remove();
            // remove dial link
            elem = dqs('body > table:nth-child(1) > tbody > tr:nth-child(1) > td > div');
            elem.remove();
            // remove rating
            elem = dqs('body > table:nth-child(1) > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(2)');
            elem.remove();
        }
        // set appropriate styling
        dqs('body').style.maxWidth = '519px';
        dqs('body > table:nth-child(1) > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(1)').style.height = '30px';

    }
    
})();
