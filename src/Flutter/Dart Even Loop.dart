import 'dart:async';
void main() {
  /*
  一、同步代码
  二、 异步代码：Event Loop
  1、microtask queue：
  ①、scheduleMicrotask(() => print('xxx'));
  ②、new Future.microtask((){
      print(xxx);
    });
  2、event queue：new Future
  3、Future.then（Future.then 里的 task 是不会加入到 event queue 里的，而是当前面的 Future 执行完后立即掉起）
  4、Future.delayed（需要延迟执行的，在延迟时间到了之后才将此 task 加到 event queue 的队尾）
  */
  print('main #1 of 2'); // 1
  scheduleMicrotask(() => print('microtask #1 of 3')); // 3

  new Future.delayed(new Duration(seconds:1),
      () => print('future #1 (delayed)')); // 17

  new Future(() => print('future #2 of 4')) // 6
      .then((_) => print('future #2a')) // 7
      .then((_) {
        print('future #2b'); // 8
        scheduleMicrotask(() => print('microtask #0 (from future #2b)')); // 10
      })
      .then((_) => print('future #2c')); // 9

  scheduleMicrotask(() => print('microtask #2 of 3')); // 4

  new Future(() => print('future #3 of 4')) // 11
      .then((_) => new Future(
                   () => print('future #3a (a new future)'))) // 14
      .then((_) => print('future #3b')); // 15

  new Future(() => print('future #4 of 4')) // 12
  .then((_){
    new Future(() => print('future #4a')); // 16
  })
  .then((_) => print('future #4b')); // 13
  scheduleMicrotask(() => print('microtask #3 of 3')); // 5
  print('main #2 of 2'); // 2
}
