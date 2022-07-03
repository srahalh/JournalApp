import {
  removeError,
  setError,
  uiFinishLoading,
  uiStartLoading,
} from "../../actions/ui";
import { types } from "../../types/types";

describe("Test: UI actions", () => {
  test("should has done all actions", () => {
    const action = setError("Error");

    expect(action).toEqual({
      type: types.uiSetError,
      payload: "Error",
    });

    const removeErrorAction = removeError();
    const uiStartLoadingAction = uiStartLoading();
    const uiFinishLoadingAction = uiFinishLoading();

    expect(removeErrorAction).toEqual({ type: types.uiRemoveError });

    expect(uiStartLoadingAction).toEqual({ type: types.uiStartLoading });

    expect(uiFinishLoadingAction).toEqual({ type: types.uiFinishLoading });
  });
});
