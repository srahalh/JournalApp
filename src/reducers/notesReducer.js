import { types } from "../types/types";

const initialState = {
  notes: [],
  active: null,
};

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.notesActive:
      return {
        ...state,
        active: {
          ...action.payload, //Con esto se rompe la referencia
          // y creamos un nuevo objeto directamtne del original
        },
      };
    case types.notesLoad:
      return {
        ...state,
        notes: [...action.payload],
      };

    default:
      return state;
  }
};
