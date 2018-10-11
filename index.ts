import * as AWS from 'aws-sdk';

AWS.config.update({ region: 'eu-west-1' });
AWS.config.credentials = {
  accessKeyId: '',
  secretAccessKey: '',
};
const S3 = new AWS.S3();
const aclString: string = 'public-read-write';

export const uploadMultipleFiles = async (fileList: any[], s3BucketName: string) => {
  return new Promise<any>((resolve, reject) => {
    let fileLocationArray: any[] = [];
    const fileLength = fileList.length;
    if (fileLength < 1) {
      console.error('No files to be uploaded. Please choose one or more files to upload.');
      reject(false);
    }
    Array.from(fileList).forEach((file, index) => {
      S3.upload({ Bucket: s3BucketName, Key: file.name, Body: file, ACL: aclString }, (err: any, data: any) => {
        if (err) {
          console.error('Error occurred while uploading ' + file.name, err);
          reject(false);
        } else {
          console.log('File uploaded to S3 successfully ' + file.name);
          fileLocationArray.push(data);
          if (index === fileList.length - 1) {
            resolve(fileLocationArray);
          }
        }
      });
    });
  });
}
