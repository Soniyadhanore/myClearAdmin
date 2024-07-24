import transcode from 'aws-transcode';
// 
const s3Transcoder = (key) => {
  return new Promise(async (resolve, reject) => {

    const keyOnly = key.split('.').filter((item, index) => index !== key.split('.').length - 1).join('.');
    const outputs = [
      {
        key: keyOnly + '-transcoded.mp4',
        presetId: '',
        ACL: 'public-read'
      }
    ];
    const config = {
      onProgress: status => console.log(status),
      pipelineId: '',
      pollInterval: 2000,
      region: 'eu-west-1'
    };
    const res = await transcode(key, outputs, config);
    if (res === false) {
      resolve({
				status: 'ERROR',
				error: 'Error',
				message: 'Something went wrong while uploading image'
			});
    } else {
      resolve({
        status: 'SUCCESS',
        message: 'Image uploaded successfully',
        url: '' + outputs[0].key
      });
    }
  });
}

export default s3Transcoder;