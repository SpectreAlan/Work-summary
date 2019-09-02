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
function debounce(fun, interval = 3000) {
    let timer = null
    return function () {
    clearTimeout(timer)
    timer = setTimeout(function () {
        fun.call(this, arguments)
    }, interval)
    }
}
function go() {
    console.log(111)
}
document.getElementById('btn').onclick = debounce(go, 500)
```