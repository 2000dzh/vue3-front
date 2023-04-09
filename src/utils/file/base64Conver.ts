/**
 * @description: base64格式的字符串转换为Blob对象
 * eg:
 * Blob是一种二进制数据类型，通常用于存储媒体类型的数据，如图像或视频。
 * 函数首先将base64字符串分割成两个部分，以逗号为分隔符。
 * 第一部分是表示数据类型的字符串，第二部分是实际的base64数据。
 * 然后，函数使用正则表达式从第一部分中提取MIME类型。
 * 接下来，它将base64字符串解码为二进制字符串，并将其转换为一个Uint8Array数组。
 * 最后，它使用Blob构造函数将数组转换为Blob对象，并将MIME类型作为选项传递。
 */
export function dataURLtoBlob(base64Buf: string): Blob {
  const arr = base64Buf.split(',')
  const typeItem = arr[0]
  // 未优化
  // const mime = typeItem.match(/:(.*?);/)![1];
  // 优化后
  // 获取MIME类型时，使用正则表达式的match方法可能会返回null，这会导致代码运行错误。可以使用可选链操作符（?.）和空值合并操作符（??）来避免这种情况
  const mime = typeItem.match(/:(.*?);/)?.[1] ?? ''
  const bstr = window.atob(arr[1])
  // 未优化
  // const n = bstr.length;
  // const u8arr = new Uint8Array(n);
  // while (n--) {
  //   u8arr[n] = bstr.charCodeAt(n);
  // }
  // 优化后
  // 这个方法将字符串分割成单个字符，并将每个字符的Unicode编码转换为一个数组。然后，它使用set方法将这个数组复制到Uint8Array中。
  const u8arr = new Uint8Array(bstr.length)
  u8arr.set(bstr.split('').map((c) => c.charCodeAt(0)))

  return new Blob([u8arr], { type: mime })
}

// 未优化版本
// export function urlToBase64(url: string, mineType?: string): Promise<string> {
//   return new Promise((resolve, reject) => {
//     let canvas = document.createElement('CANVAS') as HTMLCanvasElement;
//     const ctx = canvas!.getContext('2d');

//     const img = new Image();
//     img.crossOrigin = '';
//     img.onload = function () {
//       if (!canvas || !ctx) {
//         return reject();
//       }
//       canvas.height = img.height;
//       canvas.width = img.width;
//       ctx.drawImage(img, 0, 0);
//       const dataURL = canvas.toDataURL(mineType || 'image/png');
//       canvas.remove();
//       resolve(dataURL);
//     };
//     img.src = url;
//   });
// }

// 优化版本

/**
 * @description: 指定URL中的图像数据转换为base64格式的字符串
 * eg:
 * 它首先创建一个新的Canvas元素，并使用2D上下文从指定的URL中加载图像。
 * 然后，它将图像绘制到Canvas上，并使用toDataURL方法将Canvas中的图像数据转换为base64格式的字符串。
 * 最后，它返回一个Promise对象，该对象在成功时解析为base64字符串，或在失败时拒绝。
 */
export async function urlToBase64(url: string, mimeType = 'image/png'): Promise<string> {
  const canvas = document.createElement('canvas') as HTMLCanvasElement
  const ctx = canvas.getContext('2d')
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.src = url

  await new Promise((resolve, reject) => {
    img.onload = function () {
      canvas.height = img.height
      canvas.width = img.width
      ctx!.drawImage(img, 0, 0)
      resolve('')
    }
    img.onerror = function () {
      canvas.remove()
      reject(new Error('Failed to load image'))
    }
  })
  const dataUrl = canvas.toDataURL(mimeType)
  canvas.remove()
  return dataUrl
}
