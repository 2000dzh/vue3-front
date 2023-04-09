import { dataURLtoBlob, urlToBase64 } from './base64Conver'

/**
 * @description 根据地址下载图片
 * @param url
 * @param filename
 * @param mime
 * @param bom
 */
export function downloadByOnlineUrl(url: string, filename: string, mime?: string, bom?: BlobPart) {
  urlToBase64(url).then((base64) => {
    downloadByBase64(base64, filename, mime, bom)
  })
}

/**
 * @description 下载基于base64的图片
 * @param buf
 * @param filename
 * @param mime
 * @param bom
 */
export function downloadByBase64(buf: string, filename: string, mime?: string, bom?: BlobPart) {
  const base64Buf = dataURLtoBlob(buf)
  downloadByData(base64Buf, filename, mime, bom)
}

/**
 * @description 下载文件
 * @param data
 * @param filename
 * @param mime
 * @param bom
 */
export function downloadByData(data: Blob, filename: string, mime?: string, bom?: BlobPart) {
  if (!data || !data.size) {
    throw new Error('Download data is empty')
  }
  const blobData = typeof bom !== 'undefined' ? [bom, data] : [data]
  const blob = new Blob(blobData, { type: mime || 'application/octet-stream' })

  const blobURL = window.URL.createObjectURL(blob)
  const tempLink = document.createElement('a')

  if ('download' in tempLink) {
    tempLink.style.display = 'none'
    tempLink.href = blobURL
    tempLink.setAttribute('download', filename)
    document.body.appendChild(tempLink)
    tempLink.click()
    document.body.removeChild(tempLink)
  } else {
    window.location.href = blobURL
  }

  window.URL.revokeObjectURL(blobURL)
}
