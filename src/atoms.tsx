import { atom, selector } from "recoil";

interface IToDoState {
  [key: string]: string[];
}

//  NOTE: 보드가 1개라면 default가 배열이어도 상관없지만, 보드가 여러개라면 객체로 관리하는게 좋다.
export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": ["a", "b"],
    Acitive: ["c", "d", "e"],
    Done: ["f"],
  },
});
