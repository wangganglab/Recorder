/*
录音
https://github.com/xiangyuecn/Recorder
src: recorder-core.js
*/
!function(k){"use strict";var m=function(){},F=function(e){return new t(e)};F.LM="2022-06-26 18:37";var I="Recorder";F.IsOpen=function(){var e=F.Stream;if(e){var t=e.getTracks&&e.getTracks()||e.audioTracks||[],n=t[0];if(n){var r=n.readyState;return"live"==r||r==n.LIVE}}return!1},F.BufferSize=4096,F.Destroy=function(){for(var e in b(I+" Destroy"),d(),n)n[e]()};var n={};F.BindDestroy=function(e,t){n[e]=t},F.Support=function(){var e=k.AudioContext;if(e||(e=k.webkitAudioContext),!e)return!1;var t=navigator.mediaDevices||{};return t.getUserMedia||(t=navigator).getUserMedia||(t.getUserMedia=t.webkitGetUserMedia||t.mozGetUserMedia||t.msGetUserMedia),!!t.getUserMedia&&(F.Scope=t,F.Ctx&&"closed"!=F.Ctx.state||(F.Ctx=new e,F.BindDestroy("Ctx",function(){var e=F.Ctx;e&&e.close&&(e.close(),F.Ctx=0)})),!0)};var M="ConnectEnableWorklet";F[M]=!1;var h=function(e){var r=(e=e||F).BufferSize||F.BufferSize,a=F.Ctx,o=e.Stream,s=o._m=a.createMediaStreamSource(o),i=a.destination,t="createMediaStreamDestination";a[t]&&(i=a[t]());var f=o._call,c=function(e,t){if(!t||g)for(var n in f){for(var r=e.length,a=new Int16Array(r),o=0,s=0;s<r;s++){var i=Math.max(-1,Math.min(1,e[s]));i=i<0?32768*i:32767*i,a[s]=i,o+=Math.abs(i)}for(var c in f)f[c](a,o);return}else b(u+"多余回调",3)},l="ScriptProcessor",u="audioWorklet",v=I+" "+u,p="RecProc",m=a.createScriptProcessor||a.createJavaScriptNode,h="。由于"+u+"内部1秒375次回调，在移动端可能会有性能问题导致回调丢失录音变短，PC端无影响，暂不建议开启"+u+"。",d=function(){g=o.isWorklet=!1,x(o),b("Connect采用老的"+l+"，"+(F[M]?"但已":"可")+"设置"+I+"."+M+"=true尝试启用"+u+h,3);var e=o._p=m.call(a,r,1,1);s.connect(e),e.connect(i);var t="_D220626",n=F[t];n&&b("Use "+I+"."+t,3),e.onaudioprocess=function(e){var t=e.inputBuffer.getChannelData(0);n?(t=new Float32Array(t),setTimeout(function(){c(t)})):c(t)}},g=o.isWorklet=!m||F[M],n=k.AudioWorkletNode;if(g&&a[u]&&n){var S,_=function(){return g&&o._na},C=o._na=function(){""!==S&&(clearTimeout(S),S=setTimeout(function(){S=0,_()&&(b(u+"未返回任何音频，恢复使用"+l,3),m&&d())},500))},y=function(){if(_()){var e=o._n=new n(a,p,{processorOptions:{bufferSize:r}});s.connect(e),e.connect(i),e.port.onmessage=function(e){S&&(clearTimeout(S),S=""),c(e.data.val,1)},b("Connect采用"+u+"方式，设置"+I+"."+M+"=false可恢复老式"+l+h,3)}};a.resume()[f&&"finally"](function(){if(_())if(a[p])y();else{var e,t,n=(t="class "+p+" extends AudioWorkletProcessor{",t+="constructor "+(e=function(e){return e.toString().replace(/^function|DEL_/g,"").replace(/\$RA/g,v)})(function(e){DEL_super(e);var t=this,n=e.processorOptions.bufferSize;t.bufferSize=n,t.buffer=new Float32Array(2*n),t.pos=0,t.port.onmessage=function(e){e.data.kill&&(t.kill=!0,console.log("$RA kill call"))},console.log("$RA .ctor call",e)}),t+="process "+e(function(e,t,n){var r=this,a=r.bufferSize,o=r.buffer,s=r.pos;if((e=(e[0]||[])[0]||[]).length){o.set(e,s);var i=~~((s+=e.length)/a)*a;if(i){this.port.postMessage({val:o.slice(0,i)});var c=o.subarray(i,s);(o=new Float32Array(2*a)).set(c),s=c.length,r.buffer=o}r.pos=s}return!r.kill}),t+='}try{registerProcessor("'+p+'", '+p+')}catch(e){console.error("'+v+'注册失败",e)}',"data:text/javascript;base64,"+btoa(unescape(encodeURIComponent(t))));a[u].addModule(n).then(function(e){_()&&(a[p]=1,y(),S&&C())})[f&&"catch"](function(e){b(u+".addModule失败",1,e),_()&&d()})}})}else d()},x=function(e){e._na=null,e._n&&(e._n.port.postMessage({kill:!0}),e._n.disconnect(),e._n=null)},d=function(e){var t=(e=e||F)==F,n=e.Stream;if(n&&(n._m&&(n._m.disconnect(),n._m=null),n._p&&(n._p.disconnect(),n._p.onaudioprocess=n._p=null),x(n),t)){for(var r=n.getTracks&&n.getTracks()||n.audioTracks||[],a=0;a<r.length;a++){var o=r[a];o.stop&&o.stop()}n.stop&&n.stop()}e.Stream=0};F.SampleData=function(e,t,n,r,a){r||(r={});var o=r.index||0,s=r.offset||0,i=r.frameNext||[];a||(a={});var c=a.frameSize||1;a.frameType&&(c="mp3"==a.frameType?1152:1);var f=e.length;f+1<o&&b("SampleData似乎传入了未重置chunk "+o+">"+f,3);for(var l=0,u=o;u<f;u++)l+=e[u].length;l=Math.max(0,l-Math.floor(s));var v=t/n;1<v?l=Math.floor(l/v):(v=1,n=t),l+=i.length;for(var p=new Int16Array(l),m=0,u=0;u<i.length;u++)p[m]=i[u],m++;for(;o<f;o++){for(var h=e[o],u=s,d=h.length;u<d;){var g=Math.floor(u),S=Math.ceil(u),_=u-g,C=h[g],y=S<d?h[S]:(e[o+1]||[C])[0]||0;p[m]=C+(y-C)*_,m++,u+=v}s=u-d}i=null;var k=p.length%c;if(0<k){var I=2*(p.length-k);i=new Int16Array(p.buffer.slice(I)),p=new Int16Array(p.buffer.slice(0,I))}return{index:o,offset:s,frameNext:i,sampleRate:n,data:p}},F.PowerLevel=function(e,t){var n=e/t||0;return n<1251?Math.round(n/1250*10):Math.round(Math.min(100,Math.max(0,100*(1+Math.log(n/1e4)/Math.log(10)))))};var b=function(e,t){var n=new Date,r=("0"+n.getMinutes()).substr(-2)+":"+("0"+n.getSeconds()).substr(-2)+"."+("00"+n.getMilliseconds()).substr(-3),a=this&&this.envIn&&this.envCheck&&this.id,o=["["+r+" "+I+(a?":"+a:"")+"]"+e],s=arguments,i=k.console||{},c=2,f=i.log;for("number"==typeof t?f=1==t?i.error:3==t?i.warn:f:c=1;c<s.length;c++)o.push(s[c]);l?f&&f("[IsLoser]"+o[0],1<o.length?o:""):f.apply(i,o)},l=!0;try{l=!console.log.apply}catch(e){}F.CLog=b;var r=0;function t(e){this.id=++r,o();var t={type:"mp3",bitRate:16,sampleRate:16e3,onProcess:m};for(var n in e)t[n]=e[n];this.set=t,this._S=9,this.Sync={O:9,C:9}}F.Sync={O:9,C:9},F.prototype=t.prototype={CLog:b,_streamStore:function(){return this.set.sourceStream?this:F},open:function(e,n){var r=this,t=r._streamStore();e=e||m;var a=function(e,t){t=!!t,r.CLog("录音open失败："+e+",isUserNotAllow:"+t,1),n&&n(e,t)},o=function(){r.CLog("open ok id:"+r.id),e(),r._SO=0},s=t.Sync,i=++s.O,c=s.C;r._O=r._O_=i,r._SO=r._S;var f=r.envCheck({envName:"H5",canProcess:!0});if(f)a("不能录音："+f);else if(r.set.sourceStream){if(!F.Support())return void a("不支持此浏览器从流中获取录音");d(t),r.Stream=r.set.sourceStream,r.Stream._call={};try{h(t)}catch(e){return void a("从流中打开录音失败："+e.message)}o()}else{var l=function(e,t){try{k.top.a}catch(e){return void a('无权录音(跨域，请尝试给iframe添加麦克风访问策略，如allow="camera;microphone")')}/Permission|Allow/i.test(e)?a("用户拒绝了录音权限",!0):!1===k.isSecureContext?a("浏览器禁止不安全页面录音，可开启https解决"):/Found/i.test(e)?a(t+"，无可用麦克风"):a(t)};if(F.IsOpen())o();else if(F.Support()){var u=function(t){setTimeout(function(){t._call={};var e=F.Stream;e&&(d(),t._call=e._call),F.Stream=t,function(){if(c!=s.C||!r._O){var e="open被取消";return i==s.O?r.close():e="open被中断",a(e),!0}}()||(F.IsOpen()?(e&&r.CLog("发现同时多次调用open",1),h(),o()):a("录音功能无效：无音频流"))},100)},v=function(e){var t=e.name||e.message||e.code+":"+e;r.CLog("请求录音权限错误",1,e),l(t,"无法录音："+t)},p=F.Scope.getUserMedia({audio:r.set.audioTrackSet||!0},u,v);p&&p.then&&p.then(u)[e&&"catch"](v)}else l("","此浏览器不支持录音")}},close:function(e){e=e||m;var t=this,n=t._streamStore();t._stop();var r=n.Sync;if(t._O=0,t._O_!=r.O)return t.CLog("close被忽略（因为同时open了多个rec，只有最后一个会真正close）",3),void e();r.C++,d(n),t.CLog("close"),e()},mock:function(e,t){var n=this;return n._stop(),n.isMock=1,n.mockEnvInfo=null,n.buffers=[e],n.recSize=e.length,n.srcSampleRate=t,n},envCheck:function(e){var t,n=this.set,r="CPU_BE";if(t||F[r]||new Int8Array(new Int32Array([1]).buffer)[0]||(o(r),t="不支持CPU_BE架构"),!t){var a=n.type;this[a+"_envCheck"]?t=this[a+"_envCheck"](e,n):n.takeoffEncodeChunk&&(t=a+"类型"+(this[a]?"":"(未加载编码器)")+"不支持设置takeoffEncodeChunk")}return t||""},envStart:function(e,t){var n=this,r=n.set;if(n.isMock=e?1:0,n.mockEnvInfo=e,n.buffers=[],n.recSize=0,n.envInLast=0,n.envInFirst=0,n.envInFix=0,n.envInFixTs=[],r.sampleRate=Math.min(t,r.sampleRate),n.srcSampleRate=t,n.engineCtx=0,n[r.type+"_start"]){var a=n.engineCtx=n[r.type+"_start"](r);a&&(a.pcmDatas=[],a.pcmSize=0)}},envResume:function(){this.envInFixTs=[]},envIn:function(e,t){var a=this,o=a.set,s=a.engineCtx,n=a.srcSampleRate,r=e.length,i=F.PowerLevel(t,r),c=a.buffers,f=c.length;c.push(e);var l=c,u=f,v=Date.now(),p=Math.round(r/n*1e3);a.envInLast=v,1==a.buffers.length&&(a.envInFirst=v-p);var m=a.envInFixTs;m.splice(0,0,{t:v,d:p});for(var h=v,d=0,g=0;g<m.length;g++){var S=m[g];if(3e3<v-S.t){m.length=g;break}h=S.t,d+=S.d}var _=m[1],C=v-h;if(C/3<C-d&&(_&&1e3<C||6<=m.length)){var y=v-_.t-p;if(p/5<y){var k=!o.disableEnvInFix;if(a.CLog("["+v+"]"+(k?"":"未")+"补偿"+y+"ms",3),a.envInFix+=y,k){var I=new Int16Array(y*n/1e3);r+=I.length,c.push(I)}}}var M=a.recSize,x=r,b=M+x;if(a.recSize=b,s){var w=F.SampleData(c,n,o.sampleRate,s.chunkInfo);s.chunkInfo=w,b=(M=s.pcmSize)+(x=w.data.length),s.pcmSize=b,c=s.pcmDatas,f=c.length,c.push(w.data),n=w.sampleRate}var L=Math.round(b/n*1e3),R=c.length,D=l.length,T=function(){for(var e=z?0:-x,t=null==c[0],n=f;n<R;n++){var r=c[n];null==r?t=1:(e+=r.length,s&&r.length&&a[o.type+"_encode"](s,r))}if(t&&s)for(n=u,l[0]&&(n=0);n<D;n++)l[n]=null;t&&(e=z?x:0,c[0]=null),s?s.pcmSize+=e:a.recSize+=e},z=0,A="rec.set.onProcess";try{z=o.onProcess(c,i,L,n,f,T)}catch(e){console.error(A+"回调出错是不允许的，需保证不会抛异常",e)}var O=Date.now()-v;if(10<O&&1e3<a.envInFirst-v&&a.CLog(A+"低性能，耗时"+O+"ms",3),!0===z){var U=0;for(g=f;g<R;g++)null==c[g]?U=1:c[g]=new Int16Array(0);U?a.CLog("未进入异步前不能清除buffers",3):s?s.pcmSize-=x:a.recSize-=x}else T()},start:function(){var e=this,t=F.Ctx,n=1;if(e.set.sourceStream?e.Stream||(n=0):F.IsOpen()||(n=0),n)if(e.CLog("开始录音"),e._stop(),e.state=0,e.envStart(null,t.sampleRate),e._SO&&e._SO+1!=e._S)e.CLog("start被中断",3);else{e._SO=0;var r=function(){e.state=1,e.resume()};"suspended"==t.state?(e.CLog("wait ctx resume..."),e.state=3,t.resume().then(function(){e.CLog("ctx resume"),3==e.state&&r()})):r()}else e.CLog("未open",1)},pause:function(){var e=this;e.state&&(e.state=2,e.CLog("pause"),delete e._streamStore().Stream._call[e.id])},resume:function(){var e,n=this;if(n.state){n.state=1,n.CLog("resume"),n.envResume();var t=n._streamStore();t.Stream._call[n.id]=function(e,t){1==n.state&&n.envIn(e,t)},(e=(t||F).Stream)._na&&e._na()}},_stop:function(e){var t=this,n=t.set;t.isMock||t._S++,t.state&&(t.pause(),t.state=0),!e&&t[n.type+"_stop"]&&(t[n.type+"_stop"](t.engineCtx),t.engineCtx=0)},stop:function(n,t,e){var r,a=this,o=a.set;a.CLog("stop 和start时差"+(a.envInLast?a.envInLast-a.envInFirst+"ms 补偿"+a.envInFix+"ms":"-"));var s=function(){a._stop(),e&&a.close()},i=function(e){a.CLog("结束录音失败："+e,1),t&&t(e),s()},c=function(e,t){if(a.CLog("结束录音 编码花"+(Date.now()-r)+"ms 音频时长"+t+"ms 文件大小"+e.size+"b"),o.takeoffEncodeChunk)a.CLog("启用takeoffEncodeChunk后stop返回的blob长度为0不提供音频数据",3);else if(e.size<Math.max(100,t/2))return void i("生成的"+o.type+"无效");n&&n(e,t),s()};if(!a.isMock){var f=3==a.state;if(!a.state||f)return void i("未开始录音"+(f?"，开始录音前无用户交互导致AudioContext未运行":""));a._stop(!0)}var l=a.recSize;if(l)if(a.buffers[0])if(a[o.type]){if(a.isMock){var u=a.envCheck(a.mockEnvInfo||{envName:"mock",canProcess:!1});if(u)return void i("录音错误："+u)}var v=a.engineCtx;if(a[o.type+"_complete"]&&v){var p=Math.round(v.pcmSize/o.sampleRate*1e3);return r=Date.now(),void a[o.type+"_complete"](v,function(e){c(e,p)},i)}r=Date.now();var m=F.SampleData(a.buffers,a.srcSampleRate,o.sampleRate);o.sampleRate=m.sampleRate;var h=m.data;p=Math.round(h.length/o.sampleRate*1e3),a.CLog("采样"+l+"->"+h.length+" 花:"+(Date.now()-r)+"ms"),setTimeout(function(){r=Date.now(),a[o.type](h,function(e){c(e,p)},function(e){i(e)})})}else i("未加载"+o.type+"编码器");else i("音频buffers被释放");else i("未采集到录音")}},k[I]&&(b("重复引入"+I,3),k[I].Destroy()),(k[I]=F).TrafficImgUrl="//ia.51.la/go1?id=20469973&pvFlag=1";var o=F.Traffic=function(e){e=e?"/"+I+"/Report/"+e:"";var t=F.TrafficImgUrl;if(t){var n=F.Traffic,r=/^(https?:..[^\/#]*\/?)[^#]*/i.exec(location.href)||[],a=r[1]||"http://file/",o=(r[0]||a)+e;if(0==t.indexOf("//")&&(t=/^https:/i.test(o)?"https:"+t:"http:"+t),e&&(t=t+"&cu="+encodeURIComponent(a+e)),!n[o]){n[o]=1;var s=new Image;s.src=t,b("Traffic Analysis Image: "+(e||I+".TrafficImgUrl="+F.TrafficImgUrl))}}}}(window),"function"==typeof define&&define.amd&&define(function(){return Recorder}),"object"==typeof module&&module.exports&&(module.exports=Recorder);