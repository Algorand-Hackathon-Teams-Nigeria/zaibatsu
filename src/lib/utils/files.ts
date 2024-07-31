export function dataURLtoFile(dataurl: string, filename: string): File {
  var byteString = atob(dataurl.split(",")[1]);
  var mimeString = dataurl.split(",")[0].split(":")[1].split(";")[0];
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: mimeString });
  return new File([blob], filename);
}
