### 获取url参数
```javascript
let obj={};
location.search.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>obj[k]=v);
```
### 数组乱序
```javascript
arr.slice().sort(() => Math.random() - 0.5)
```
### 随机生成16进制
```javascript
'#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0');
```
### 防抖节流

```javascript
function debounce(fn, delay = 300) {
    let timer = null
    return () => {
      let innerArgs = [].slice.call(arguments)
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, innerArgs);
      }, delay);
    };
}
function getClientWidth(){
    console.log(document.body.clientWidth)
}
window.onresize = debounce(getClientWidth);
```
