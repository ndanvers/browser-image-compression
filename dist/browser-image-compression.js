!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e=e||self).imageCompression=n()}(this,function(){"use strict";function getDataUrlFromFile(e){return new Promise(function(n,t){var r=new FileReader;r.onload=function(){return n(r.result)},r.onerror=function(e){return t(e)},r.readAsDataURL(e)})}function getFilefromDataUrl(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Date.now();return new Promise(function(r){for(var i,a=e.split(","),o=a[0].match(/:(.*?);/)[1],s=atob(a[1]),c=s.length,f=new Uint8Array(c);c--;)f[c]=s.charCodeAt(c);try{i=new File([f],n,{type:o})}catch(e){(i=new Blob([f],{type:o})).name=n,i.lastModified=t}r(i)})}function loadImage(e){return new Promise(function(n,t){var r=new Image;r.onload=function(){return n(r)},r.onerror=function(e){return t(e)},r.src=e})}function drawImageInCanvas(e){var n;return(n="function"==typeof OffscreenCanvas?new OffscreenCanvas(e.width,e.height):document.createElement("canvas")).getContext("2d").drawImage(e,0,0,n.width,n.height),n}function drawFileInCanvas(e){return new Promise(function(n,t){var r,i,a=function $Try_2_Post(){try{return i=drawImageInCanvas(r),n([r,i])}catch(e){return t(e)}},o=function $Try_2_Catch(n){try{return getDataUrlFromFile(e).then(function(e){try{return loadImage(e).then(function(e){try{return r=e,a()}catch(e){return t(e)}},t)}catch(e){return t(e)}},t)}catch(e){return t(e)}};try{return createImageBitmap(e).then(function(e){try{return r=e,a()}catch(e){return o()}},o)}catch(e){o()}})}function canvasToFile(e,n,t,r){var i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1;return new Promise(function(a,o){var s;return"function"==typeof OffscreenCanvas&&e instanceof OffscreenCanvas?e.convertToBlob({type:n,quality:i}).then(function(e){try{return(s=e).name=t,s.lastModified=r,$If_4.call(this)}catch(e){return o(e)}}.bind(this),o):getFilefromDataUrl(e.toDataURL(n,i),t,r).then(function(e){try{return s=e,$If_4.call(this)}catch(e){return o(e)}}.bind(this),o);function $If_4(){return a(s)}})}function getExifOrientation(e){return new Promise(function(n,t){var r=new FileReader;r.onload=function(e){var t=new DataView(e.target.result);if(65496!=t.getUint16(0,!1))return n(-2);for(var r=t.byteLength,i=2;i<r;){if(t.getUint16(i+2,!1)<=8)return n(-1);var a=t.getUint16(i,!1);if(i+=2,65505==a){if(1165519206!=t.getUint32(i+=2,!1))return n(-1);var o=18761==t.getUint16(i+=6,!1);i+=t.getUint32(i+4,o);var s=t.getUint16(i,o);i+=2;for(var c=0;c<s;c++)if(274==t.getUint16(i+12*c,o))return n(t.getUint16(i+12*c+8,o))}else{if(65280!=(65280&a))break;i+=t.getUint16(i,!1)}}return n(-1)},r.onerror=function(e){return t(e)},r.readAsArrayBuffer(e)})}function handleMaxWidthOrHeight(e,n,t){var r=n.getContext("2d"),i=t.maxWidthOrHeight,a=Number.isInteger(i)&&(e.width>i||e.height>i);return a?e.width>e.height?(n.width=i,n.height=e.height/e.width*i):(n.width=e.width/e.height*i,n.height=i):(n.width=e.width,n.height=e.height),r.drawImage(e,0,0,n.width,n.height),[n,a]}function followExifOrientation(e,n,t){var r=n.getContext("2d"),i=e.width,a=e.height;switch(4<t&&t<9?(n.width=a,n.height=i):(n.width=i,n.height=a),t){case 2:r.transform(-1,0,0,1,i,0);break;case 3:r.transform(-1,0,0,-1,i,a);break;case 4:r.transform(1,0,0,-1,0,a);break;case 5:r.transform(0,1,1,0,0,0);break;case 6:r.transform(0,1,-1,0,a,0);break;case 7:r.transform(0,-1,-1,0,a,i);break;case 8:r.transform(0,-1,1,0,0,i)}return r.drawImage(e,0,0),n}function compress(e,n){return new Promise(function(t,r){var i,a,o,s,c,f,u,m,l;return i=n.maxIteration||10,a=1024*n.maxSizeMB*1024,e.size<=a&&void 0===n.maxWidthOrHeight?t(e):drawFileInCanvas(e).then(function(h){try{return o=(f=h)[0],s=f[1],u=handleMaxWidthOrHeight(o,s,n),s=u[0],c=u[1],e.size<=a&&!c?t(e):new Promise(function(t,r){var i;if(!(i=n.exifOrientation))return getExifOrientation(e).then(function(e){try{return i=e,$If_2.call(this)}catch(e){return r(e)}}.bind(this),r);function $If_2(){return t(i)}return $If_2.call(this)}).then(function(c){try{return n.exifOrientation=c,s=followExifOrientation(o,s,n.exifOrientation),m=1,canvasToFile(s,e.type,e.name,e.lastModified,m).then(function(n){try{var c=function $If_3(){return t(l)};if(l=n,"image/png"===e.type){var f,u=function $Loop_4(){return i--&&l.size>a?(s.width*=.9,s.height*=.9,s.getContext("2d").drawImage(o,0,0,s.width,s.height),canvasToFile(s,e.type,e.name,e.lastModified,m).then(function(e){try{return l=e,$Loop_4}catch(e){return r(e)}},r)):[1]},h=function $Loop_4_exit(){return c.call(this)};return(f=function(e){for(;e;){if(e.then)return void e.then(f,r);try{if(e.pop){if(e.length)return e.pop()?h.call(this):e;e=u}else e=e.call(this)}catch(e){return r(e)}}}.bind(this))(u)}var g,d=function $Loop_6(){return i--&&l.size>a?(s.width*=.9,s.height*=.9,s.getContext("2d").drawImage(o,0,0,s.width,s.height),m*=.9,canvasToFile(s,e.type,e.name,e.lastModified,m).then(function(e){try{return l=e,$Loop_6}catch(e){return r(e)}},r)):[1]},p=function $Loop_6_exit(){return c.call(this)};return(g=function(e){for(;e;){if(e.then)return void e.then(g,r);try{if(e.pop){if(e.length)return e.pop()?p.call(this):e;e=d}else e=e.call(this)}catch(e){return r(e)}}}.bind(this))(d)}catch(e){return r(e)}}.bind(this),r)}catch(e){return r(e)}}.bind(this),r)}catch(e){return r(e)}}.bind(this),r)})}var e,n=0;var t=function createWorker(e){return new Worker(URL.createObjectURL(new Blob(["(".concat(e,")()")])))}(function(){self.addEventListener("message",function(e){return new Promise(function(n,t){var r,i,a,o,s=e.data;r=s.file,i=s.id,a=s.imageCompressionLibUrl,o=s.options;var c=function $Try_1_Post(){try{return n()}catch(e){return t(e)}},f=function $Try_1_Catch(e){try{return self.postMessage({error:e.message,id:i}),c()}catch(e){return t(e)}};try{var u;return importScripts(a),imageCompression(r,o).then(function(e){try{return u=e,self.postMessage({file:u,id:i}),c()}catch(e){return f(e)}},f)}catch(e){f(e)}})})});function compressOnWebWorker(r,i){return new Promise(function(a,o){return new Promise(function(s,c){e||(e=function createSourceObject(e){return URL.createObjectURL(new Blob([e],{type:"application/javascript"}))}("\n    function imageCompression (){return (".concat(imageCompression,").apply(null, arguments)}\n    \n    imageCompression.getDataUrlFromFile = ").concat(imageCompression.getDataUrlFromFile,"\n    imageCompression.getFilefromDataUrl = ").concat(imageCompression.getFilefromDataUrl,"\n    imageCompression.loadImage = ").concat(imageCompression.loadImage,"\n    imageCompression.drawImageInCanvas = ").concat(imageCompression.drawImageInCanvas,"\n    imageCompression.drawFileInCanvas = ").concat(imageCompression.drawFileInCanvas,"\n    imageCompression.canvasToFile = ").concat(imageCompression.canvasToFile,"\n    imageCompression.getExifOrientation = ").concat(imageCompression.getExifOrientation,"\n    imageCompression.handleMaxWidthOrHeight = ").concat(imageCompression.handleMaxWidthOrHeight,"\n    imageCompression.followExifOrientation = ").concat(imageCompression.followExifOrientation,"\n    \n    getDataUrlFromFile = imageCompression.getDataUrlFromFile\n    getFilefromDataUrl = imageCompression.getFilefromDataUrl\n    loadImage = imageCompression.loadImage\n    drawImageInCanvas = imageCompression.drawImageInCanvas\n    drawFileInCanvas = imageCompression.drawFileInCanvas\n    canvasToFile = imageCompression.canvasToFile\n    getExifOrientation = imageCompression.getExifOrientation\n    handleMaxWidthOrHeight = imageCompression.handleMaxWidthOrHeight\n    followExifOrientation = imageCompression.followExifOrientation\n\n    function compress (){return (").concat(compress,").apply(null, arguments)}\n    ")));var f=n++;return t.addEventListener("message",function handler(e){e.data.id===f&&(t.removeEventListener("message",handler),e.data.error&&o(e.data.error),a(e.data.file))}),t.postMessage({file:r,id:f,imageCompressionLibUrl:e,options:i}),s()})})}function imageCompression(e,n){return new Promise(function(t,r){var i,a;if(n.maxSizeMB=n.maxSizeMB||Number.POSITIVE_INFINITY,n.useWebWorker="boolean"!=typeof n.useWebWorker||n.useWebWorker,!(e instanceof Blob||e instanceof File))return r(new Error("The file given is not an instance of Blob or File"));if(!/^image/.test(e.type))return r(new Error("The file given is not an image"));if(a="undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope,!n.useWebWorker||"function"!=typeof Worker||a)return compress(e,n).then(function(e){try{return i=e,$If_3.call(this)}catch(e){return r(e)}}.bind(this),r);var o=function(){try{return $If_3.call(this)}catch(e){return r(e)}}.bind(this),s=function $Try_1_Catch(t){try{return compress(e,n).then(function(e){try{return i=e,o()}catch(e){return r(e)}},r)}catch(e){return r(e)}};try{return compressOnWebWorker(e,n).then(function(e){try{return i=e,o()}catch(e){return s()}},s)}catch(e){s()}function $If_3(){try{i.name=e.name,i.lastModified=e.lastModified}catch(e){}return t(i)}})}return imageCompression.getDataUrlFromFile=getDataUrlFromFile,imageCompression.getFilefromDataUrl=getFilefromDataUrl,imageCompression.loadImage=loadImage,imageCompression.drawImageInCanvas=drawImageInCanvas,imageCompression.drawFileInCanvas=drawFileInCanvas,imageCompression.canvasToFile=canvasToFile,imageCompression.getExifOrientation=getExifOrientation,imageCompression.handleMaxWidthOrHeight=handleMaxWidthOrHeight,imageCompression.followExifOrientation=followExifOrientation,imageCompression});
//# sourceMappingURL=browser-image-compression.js.map
