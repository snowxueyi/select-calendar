;(function() {
    var designWidth = 750,//设计稿宽度(px)
        rem2px = 100,//转换倍数 比如100倍则：750px == 7.5rem
        defaultFontSize = 14,//默认字体大小(px)
        ua = navigator.userAgent,
        ResetEvent = "onorientationchange" in window ? "orientationchange" : "resize";

    function resetRemSt() {
        var getWidthFn = setInterval(function(){
            if(window.innerWidth!=measureWidth){
                measureWidth = window.innerWidth;
                remSt.innerHTML = "@media screen and (max-width: " + measureWidth + "px) {html{font-size:" + (measureWidth / (designWidth / rem2px) / defaultFontSize * 100) + "%;}}";
                clearInterval(getWidthFn);
            }
        },50)

    }
    function bugRemSt() {
        if(window.innerWidth!=measureWidth){
            measureWidth = window.innerWidth;
            remSt.innerHTML = "@media screen and (max-width: " + measureWidth + "px) {html{font-size:" + (measureWidth / (designWidth / rem2px) / defaultFontSize * 100) + "%;}}";
        }
    }

    var d = window.document.createElement('div');
    var measureWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    d.style.width = '1rem';
    d.style.display = 'none';
    var head = window.document.getElementsByTagName('head')[0];
    head.appendChild(d);

    try{
        defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));
    }
    catch(e){
    }

    var remSt = document.createElement('style');
    remSt.innerHTML = "@media screen and (min-width: " + measureWidth + "px) {html{font-size:" + (measureWidth / (designWidth / rem2px) / defaultFontSize * 100) + "%;}}";
    head.appendChild(remSt);
    window.addEventListener(ResetEvent, resetRemSt, false);

    window.addEventListener( 'load' , bugRemSt , false );
    //防止不明原因的bug。load之后再调用一次。

    setTimeout(function(){
        bugRemSt();
        //防止某些机型怪异现象，异步再调用一次
    }, 333);
})()