import {
  modifyFile,
  progressUpload,
  successUpload,
  failureUpload,
  saveKeyToState,
  cancelFileUpload,
} from "../type";

import axios from "axios";

const fileUploadProgress = (id, progress) => {
  return {
    type: progressUpload,
    payload: {
      id,
      progress,
    },
  };
};

const successFileUpload = (id) => {
  return {
    type: successUpload,
    payload: id,
  };
};

const failureFileUpload = (id) => {
  return {
    type: failureUpload,
    payload: id,
  };
};

const saveUploadKeyToState = (key) => {
  return {
    type: saveKeyToState,
    payload: key,
  };
};

export const CancelFileUpload = () => {
  return {
    type: cancelFileUpload,
  };
};

export const setUploadFiles = (file) => {
  return {
    type: modifyFile,
    payload: file,
  };
};

export const StartUpload = (files) => async (dispatch) => {
  files.forEach(async (attachment) => {
    try {
      const {
        data: { key, url },
      } = await axios.get("/api/upload");

      /* performing upload to AWS */
      await axios.put(url, attachment.file, {
        onUploadProgress: (progress) => {
          const { loaded, total } = progress;
          const percentagProgress = Math.floor((loaded / total) * 100);

          /* dispatching peercentage */
          dispatch(fileUploadProgress(attachment.id, percentagProgress));
        },
      });
      /* dispatch success upload */
      dispatch(successFileUpload(attachment.id));
      dispatch(saveUploadKeyToState(key));
    } catch (error) {
      dispatch(failureFileUpload(attachment.id));
    }
  });
};
