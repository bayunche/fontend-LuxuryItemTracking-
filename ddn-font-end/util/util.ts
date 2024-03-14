
import { Buffer } from 'buffer';
//base64图片转换为图片二进制流

const base64ToBlob = (code: string): Blob => {
    const base64Data: string = code.split(',')[1];
    const binaryData: Buffer = Buffer.from(base64Data, 'base64')
    return new Blob([binaryData], { type: 'image/jpeg' })

}

export { base64ToBlob }