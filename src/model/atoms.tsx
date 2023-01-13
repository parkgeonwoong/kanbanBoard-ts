/**
 * @desc: 전역객체 관리
 * FIXME:
 * atom -> toDoState [string]: string[] -> [string]: [{id: number, text: string}]
 * ex) { "To Do": [{ id: 1, text: "hello" }]}
 */
import { atom, selector } from "recoil";

interface IToDoState {
  [key: string]: IToDo[];
}

export interface IToDo {
  id: number;
  text: string;
}

//  NOTE: 보드가 1개라면 default가 배열이어도 상관없지만, 보드가 여러개라면 객체로 관리하는게 좋다.
export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": [], // 이렇게 한 이유는 타이틀로 가지고 올때, 띄어쓰기 할려고
    Acitive: [],
    Done: [],
  },
});
