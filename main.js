(()=>{"use strict";!function(){var e=document.querySelector(".galaxy__zone--js"),t=document.querySelector(".galaxy__zone-ufo--js"),n=document.querySelector(".galaxy--js"),o=!1;if(t&&e&&n){var i=function(e){if(e)return t.style.position="absolute",t.style.zIndex="10",void document.body.append(t);n.append(t),t.style.zIndex="",t.style.left="",t.style.top="",t.style.bottom=""};window.addEventListener("resize",(function(){i(!1)})),t.addEventListener("dragstart",(function(){return!1})),t.addEventListener("mousedown",(function(n){var u=n.clientX-(null==t?void 0:t.getBoundingClientRect().left),c=n.clientY-t.getBoundingClientRect().top,d=function(n,i){if(o){var d=n-u,s=i-c,l=e.clientWidth,r=t.clientWidth,a=e.clientHeight,m=t.clientHeight,v=d+r>=l,p=s+m>=a;d<0&&(d=0),v&&(d=l-r),s<0&&(s=0),p&&(s=a-m),t.style.left="".concat(d,"px"),t.style.top="".concat(s,"px")}};(o=!0)&&i(!0),d(n.pageX,n.pageY);var s=function(e){d(e.pageX,e.pageY)},l=function(){o=!1,document.removeEventListener("mousemove",s),document.removeEventListener("mouseup",l)};document.addEventListener("mousemove",s),document.addEventListener("mouseup",l)}))}}()})();