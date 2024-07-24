/**
 * @description This file contains the configuration for the AWS S3 bucket.
 * @param {string} region: region of the bucket
 * @param {object} credentials: credentials of the bucket
 * @return {object} s3: s3 object
 */

import AWS from 'aws-sdk';

AWS.config.update({
  region: 'eu-west-2',
  credentials: new AWS.Credentials({
    accessKeyId: '',
    secretAccessKey: '',
  }),
});

export const s3 = new AWS.S3();
