import {clearMessage,newMessage} from "./type";




export const serverMessage = (status, message) => (dispatch) => {
  //clearing timeout every 10secs

  setTimeout(() => {
    dispatch({ type: clearMessage });
  }, 10000);

  dispatch({
    type: newMessage,
    payload: { status, message },
  });
};

/* export const clearServerMessage = () => {
  return {
    type: CLEAR__MESSAGE,
  };
}; */
