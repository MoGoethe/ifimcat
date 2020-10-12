import fs from "fs";
import path from "path";

function getStat(path: string) {
  return new Promise((resolve) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        resolve(false);
      } else {
        resolve(stats);
      }
    })
  })
}

function mkdir(dir: string) {
  return new Promise((resolve) => {
    fs.mkdir(dir, err => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    })
  })
}

async function dirExists(dir: string) {
  let isExists: any = await getStat(dir);
  if (isExists && isExists.isDirectory()) {
    return true;
  } else if (isExists) { 
    return false;
  }
  let tempDir = path.parse(dir).dir;
  let status = await dirExists(tempDir);
  let mkdirStatus;
  if (status) {
    mkdirStatus = await mkdir(dir);
  }
  return mkdirStatus;
}

export default dirExists