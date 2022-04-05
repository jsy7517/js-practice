const arr = [1, 2, 3, 4];
while (arr.length > 0) {
	console.log(arr.pop());
}

/**
 * while(계속 반복할 지 판단) {
 *  반복 시마다 처리할 행동
 * }
 */

/**
 * Iterator Interface
 */

// {
//   arr: [1, 2, 3, 4],
//   next() {
//     return {
//       done: this.arr.length === 0,
//       value: console.log(this.arr.pop())
//     };
//   }
// }
