import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { startNewNote } from "../../actions/notes";
import { db } from "../../firebase/firebase-config";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares); //Me permite crear un store para el testing

const store = mockStore({
  auth: {
    uid: "TESTING",
  },
});

describe("Test: Notes actions", () => {
  test("should has create a new note", async () => {
    await store.dispatch(startNewNote());
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      }
    });
    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      }
    });

    const docID = actions[1].payload.id; 
    await db.doc(`TESTING/journal/notes/${docID}`).delete();

  });
});
