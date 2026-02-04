import { resetMessage } from "../slices/photoSlice";
import type { AppDispatch } from "../store";

export const useResetComponentMessage = (dispatch: AppDispatch) => {
  return () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };
};
