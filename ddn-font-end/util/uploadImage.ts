
//上传图片

//base64上传

import axios from "axios";
import RNFetchBlob from 'rn-fetch-blob';
const apiKey = "chv_5bLG_a0b16a697f3597094743173545af55a721d32c44ce962915bd17129ff02b7b7e2586fa9cd6b91e168502046cb67037544f902d10a070878d929827ba120f68cd"
// 定义 MIME 类型映射
const mimeTypes: { [key: string]: string } = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'bmp': 'image/bmp',
    'webp': 'image/webp',
    'svg': 'image/svg+xml',
    'tiff': 'image/tiff',
    'ico': 'image/x-icon',
};
function getMimeTypeFromFileUrl(fileUrl: string): string {
    const extension = fileUrl.split('.').pop()?.toLowerCase() || '';
    return mimeTypes[extension] || 'application/octet-stream';
}


export async function uploadImage(fileUrl: string | null,) {

    if (fileUrl === null || fileUrl === undefined) {
        return null
    }
    const getFileNameFromUrl = (url: string): string | null => {
        const regex = /[^/]+(?=\.[^.]+$)/;
        const match = url.match(regex);
        return match ? match[0] : null;
    };
    const fileName = getFileNameFromUrl(fileUrl);
    const mimeType = getMimeTypeFromFileUrl(fileUrl);
    console.log(0, fileUrl)
    const formData = new FormData();
    console.log(fileUrl)
    //时间戳
    const timestamp = Date.now().toString();
    formData.append('source', {
        uri: fileUrl,
        type: mimeType,
        name: `${fileName}-${timestamp}`,
    } as any);
    formData.append('key', apiKey)
    console.log(formData)

    try {
        const res = await axios.post('https://www.picgo.net/api/1/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        console.log(res)
        if (res.status === 200) {
            console.log(res.data.image.url)
            let url = res.data.image.url
            return url
        }
    } catch (error) {
        console.log(error)
        return null
    }
}