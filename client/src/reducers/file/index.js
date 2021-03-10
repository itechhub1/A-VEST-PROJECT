import {
  progressUpload,
  failureUpload,
  saveKeyToState,
  successUpload,
  modifyFile,
  cancelFileUpload,
} from "../../action/type";
import { modifyFiles } from "./modifyFile";

const initialState = {
  file: {},
  // format will be like below
  // 1: {
  //   id: 1,
  //   file,
  //   progress: 0,
  //   cancelSource: source,
  //   status: 0,
  // },

  key: null,
};

export const fileProgress = (state = initialState, action) => {
  switch (action.type) {
    case modifyFile:
      return {
        ...state,
        file: {
          ...state.file,
          ...modifyFiles(state.file, action.payload),
        },
      };

    case progressUpload:
      return {
        ...state,
        file: {
          ...state.file,
          [action.payload.id]: {
            ...state.file[action.payload.id],
            progress: action.payload.progress,
          },
        },
      };
    case successUpload:
      return {
        ...state,
        file: {
          ...state.file,
          [action.payload]: {
            ...state.file[action.payload],
            status: 1,
          },
        },
      };
    case failureUpload:
      return {
        ...state,
        file: {
          ...state.file,
          [action.payload]: {
            ...state.file[action.payload],
            status: 0,
            progress: 0,
          },
        },
      };
    case cancelFileUpload:
      return {
        file: {},
        key: null,
      };
    case saveKeyToState:
      return {
        ...state,

        key: action.payload,
      };
    default:
      return state;
  }
};
