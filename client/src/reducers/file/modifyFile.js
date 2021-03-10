import { size } from "lodash";

export const modifyFiles = (exististingFile, file) => {
  let fileToUpload = {};
  for (let i = 0; i < file.length; i++) {
    const id = size(exististingFile) + i + 1;

    fileToUpload = {
      ...fileToUpload,
      [id]: {
        id,
        file: file[i],
        progress: 0,
      },
    };
  }
  return fileToUpload;
};
