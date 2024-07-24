/**
 * @description: This file is used to upload image to s3 bucket
 * @param {file} file: file to be uploaded
 * @param {string} filename: name of the file
 * @return {object} response: response object
 */

import { s3 } from './awsConfig';
import { Buffer } from 'buffer';

const S3Upload = (file, filename) => {
  return new Promise((resolve, reject) => {
    const filetype = file.split(';')[0].split('/')[1];
    const contentType  = ['jpeg', 'png', 'jpg'].includes(filetype) ? `image/${filetype}` : `application/${filetype}`;
    const base64Data = (filetype ==='pdf' || filetype ==='PDF') ?
      file.replace(/^data:application\/\w+;base64,/, ''):
      file.replace(/^data:image\/\w+;base64,/, '');        
    const buffer = Buffer.from(base64Data, 'base64');
		/**
		 * @description: params object for s3 upload
		 * @param {string} Bucket: name of the bucket
		 * @param {string} Key: name of the file
		 * @param {string} Body: file to be uploaded
		 * @param {string} ContentEncoding: encoding of the file
		 * @param {string} ContentType: type of the file
		 * @param {string} ACL: access control list
		 */
    const params = {
      Bucket: 'batterseahousewebsite',
      Key: filename,
      Body: buffer,
      ContentEncoding: 'base64',
      ContentType: contentType,
      ACL: 'public-read',
    };
		/**
		 * @description: upload file to s3 bucket
		 * @param {object} params: params object for s3 upload
		 * @param {function} callback: callback function
		 * @return {object} response: response object
		 */
    s3.upload(params, (err, data) => {
      if (err) { resolve({
				status: 'ERROR',
				error: err,
				message: 'Something went wrong while uploading image'
			}); }
      resolve({
				status: 'SUCCESS',
				url: data?.Location,
				key: data?.Key
			});
    });
  })
}

export default S3Upload;