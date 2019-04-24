### 名称为纯英文数字等不换行问题
```
span {
    word-wrap: break-word;
    word-break: break-all;
}
```
### 内容太多需一行显示，显示不全的省略
```
span {
    display: block;
    height: 17px;
    overflow: hidden;
    white-space: nowrap;//一行显示
    text-overflow: ellipsis;//显示不全就省略
}
```
### 不让鼠标选中文字
```
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
```
