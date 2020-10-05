import { FileUpload } from 'graphql-upload';
import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import path from 'path';
import { checksumFile } from '../../utils/checksumFile';
import dirExists from "../../utils/mkdir";
import config, { isProductionEnvironment } from "../../config";

@Injectable()
export class UploadService {
  async fileUpload({
    filename,
    createReadStream,
  }: FileUpload): Promise<any> {
    const ext = filename.match(/\.[a-z]+$/);
    const md5Filename = await checksumFile('md5', createReadStream);
    const dir = path.join(__dirname, "/../../../assets/upload");
    const filePath = `${dir}/${md5Filename}${ext}`;
    await dirExists(dir);
    const address = isProductionEnvironment ? `http://${config.host}` : `http://${config.host}:${config.port}`;
    return new Promise((resolve, reject) => {
      createReadStream()
        .pipe(createWriteStream(filePath))
        .on('finish', () => resolve(`${address}/assets/upload/${md5Filename}${ext}`))
        .on('error', () => reject(false));
    });
  }
}