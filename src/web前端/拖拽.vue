<template>
  <div class="sidebar">
    <div class="slideContent" :style="{left: left + 'px', top: top + 'px'}">
      <div class="move" @mousedown="move($event)">
        <i class="el-icon-rank"/>
      </div>
      <div class="content">....</div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "index",
    data() {
      return {
        left: window.innerWidth - 445,
        top: window.innerHeight - 640,
      }
    },
    methods: {
      move(e) {
        const t = window.innerWidth - 375, a = window.innerHeight - 605
        const i = document.getElementsByClassName("slideContent")[0]
        const n = e.clientX - i.offsetLeft
        const s = e.clientY - i.offsetTop;
        return document.onmousemove = e => {
          let r = e.clientX - n
          let o = e.clientY - s
          return r <= 0 ? r = 0 : r >= t && (r = t), o <= 20 ? o = 20 : o >= a && (o = a), i.style.left = r + "px", i.style.top = o + "px", !1
        }, document.onmouseup = () => {
          document.onmousemove = null, document.onmouseup = null
        }, document.onmouseleave = () => {
          document.onmousemove = null, document.onmouseup = null
        }, !1
      },
    }
  }
</script>

<style lang="scss" scoped>

  .sidebar {
    .slideContent {
      position: fixed;
      background: rgb(239, 238, 244);
      width: 375px;
      height: 600px;
      right: 70px;
      top: 0px;
      z-index: 90;
      color: #fff;
      box-shadow: 0 5px 10px rgba(6, 6, 6, .3);

      .move {
        cursor: move;
        user-select: none;
        position: relative;
        border-radius: 3px 3px 0 0;
        height: 20px;
        color: #333;
        background: linear-gradient(0deg, #bbb, #eee);
        width: 100%;
        line-height: 10px;
        display: block;
        padding: 5px 10px;

        i {
          float: right;
        }
      }
    }
  }
</style>
