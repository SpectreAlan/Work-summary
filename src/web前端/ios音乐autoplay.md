前端页面audio无法自动播放这个在 IOS/Android 上面目前已经是个惯例，如果调用audio.play必须在事件里面响应，换句话说，用户还没有交互，不让调play。网上也有一种解决方案是引导用户触发事件，能解决autoplay的问题，但是局限性很大，如果要播放多个音乐也就凉凉，同时也有AudioContext解决方案，经过尝试还是没达到预期，个人在公司项目中有个需求是进页面播放背景音乐，同时，基于不同阶段，会播放各种音效，因为ios策略限制，找到如下解决方案，ps：项目是基于vue的

### soundjs的引入
soundjs是专门处理音频的一个js库，这里不做过多介绍，[传送门](https://www.createjs.com/soundjs) 因为项目是基于vue的，但遗憾的是soundjs没有npm包，所以可以通过官网提供的cdn在项目入口index.html通过script引入
```javascript
<script type="text/javascript" src="https://code.createjs.com/1.0.0/createjs.min.js"></script>
```
打开soundjs源码
```javascript
this.createjs=this.createjs||{}
......
```
可以看到里面创建了一个叫createjs的对象，绑定在this上面，当然了，根据上下文来讲此时的this指代的是window而不是vue实例,因为我们是在入口index.html引入的，算是全局引用，因此我们要使用createjs只需要window.createjs即可。

### 绑定音乐列表

首先我这里有一个音乐列表
```javascript
list:
  [
    {
      name: 'a', // 音频名字
      src: '../../static/a.mp3' // 音频路径
    },
    {
      name: 'b',
      src: '../../static/b.mp3'
    },
    {
      name: 'c',
      src: '../../static/c.mp3'
    }
  ]
```

接下来需要将音乐列表绑定到createjs对象上

```javascript
for (let i = 0; i < this.list.length; i++) {
  window.createjs.source || (window.createjs.source = {}) // 添加source属性存储音乐信息
  window.createjs.Sound.registerSound(this.list[i].src, this.list[i].name) // 绑定音乐信息到createjs实例
  window.createjs.source[this.list[i].name] = window.createjs.Sound.createInstance(this.list[i].name) // 创建播实例，添加映射
}
```

### 音乐操作
接下来创建三个操作音乐的方法
#### 播放音乐
```javascript
playSound (e, t, f) {
  let i = window.createjs.source[e]
  i.playState && i.stop()
  i.play(t)
  f && f())
}
// e: 需要播放的音乐名字，这里和音乐list里面的nane字段对应
// t: 播放模式，传入一个对象{loop: -1} ,-1代表无限循环，1代表仅播放一次
// f: callback
```

#### 暂停音乐
```javascript
pausedSound (e, f) {
    window.createjs.source[e].paused = !window.createjs.source[e].paused, f && f()
},
```
#### 停止播放
```javascript
stopSound (e, f) {
   return e ? window.createjs.source[e].stop() : window.createjs.Sound.stop(), f && f()
}
```
#### 静音
```javascript
mutedSound () {
    window.createjs.Sound.muted = !window.createjs.Sound.muted
}
```
