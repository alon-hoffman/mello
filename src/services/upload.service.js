export const uploadService = {
  uploadImg
}
function uploadImg(ev) {
  const CLOUD_NAME = "mello123"
  const UPLOAD_PRESET = "mello1234"
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`

  const formData = new FormData();
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('file', ev.target.files[0])
console.log(`foo = `, ev.target.files[0])
  return fetch(UPLOAD_URL, {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(res => {
      console.log("🚀 ~ file: upload.service.js:23 ~ uploadImg ~ res", res)
      return res
    })
    .catch(err => console.error(err))
}
