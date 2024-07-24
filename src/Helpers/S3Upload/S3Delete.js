import { s3 } from './awsConfig';

const  S3Delete = (file) => {

    return new Promise((resolve, reject) => {
        
        // delete file from S3
        const params = {
            Bucket: 'batterseahousewebsite',
            Key: file.split('.com/')[1],
        };
        s3.deleteObject(params, (err, data) => {
            if (err) {
                resolve({
                    status: 'ERROR',
                    error: err,
                    message: 'Something went wrong while deleting image'
                });
            }
            resolve({
                status: 'SUCCESS',
                message: 'Image deleted successfully'
            });
        });
    })
}

export default S3Delete;