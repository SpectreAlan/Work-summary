// 获取浏览器信息
export function platform () {
    let browser = {name: 'unknown', version: 0}
    let userAgent = window.navigator.userAgent.toLowerCase()
    if (/(msie|firefox|opera|chrome|netscape)\D+(\d[\d.]*)/.test(userAgent)) {
        browser.name = RegExp.$1
        browser.version = RegExp.$2
    } else if (/version\D+(\d[\d.]*).*safari/.test(userAgent)) {
        browser.name = 'safari'
        browser.version = RegExp.$2
    }
    return browser
}
// 获取浏览器信息
export function getBroswer(){
    var sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/edge\/([\d.]+)/)) ? sys.edge = s[1] :
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1] :
    (s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] :
    (s = ua.match(/opera.([\d.]+)/)) ? sys.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;

    if (sys.edge) return { broswer : "Edge", version : sys.edge };
    if (sys.ie) return { broswer : "IE", version : sys.ie };
    if (sys.firefox) return { broswer : "Firefox", version : sys.firefox };
    if (sys.chrome) return { broswer : "Chrome", version : sys.chrome };
    if (sys.opera) return { broswer : "Opera", version : sys.opera };
    if (sys.safari) return { broswer : "Safari", version : sys.safari };

    return { broswer : "", version : "0" };
}
// 判断设备信息
if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    // 当前设备移动端
  }
