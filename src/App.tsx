/**
 * @desc : Drag and Drop 사용
 * @TODO:
 * 1. react-beautiful-dnd 이용해보기
 * - DragDropContext : 드래그앤드랍을 사용할 컴포넌트
 * - Droppable : 드랍할 컴포넌트, Draggable에 의해 드랍(dropped)될 수 있다.
 * - Draggable : 드래그할 컴포넌트, Droppable에 드래그 및 드래그 할 수 있다.
 * 2. Recoil 이용해보기
 * - onDragEnd을 이용해 Setter값 변경
 * 3. 리펙토링
 *
 * @FIXME:
 * 1. 드라그앤드라십 원하는 위치에 정렬하기
 * 2. 드랍할 때마다 Card 재렌더링 성능저하 문제
 * 3. 상태값 Object로 바뀐경우, 배열로 바꾸기
 */

import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./components/Board";

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  /* FIXME: 원하는 위치에 정렬:
    DragDropContext onDragEnd 매개변수에서 현재위치, 이동할 위치, 이동할 아이템 받아옴 
  */
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, source, draggableId } = info;
    if (!destination) return;

    // 같은 보드에서 드랍할 때
    if (destination?.droppableId === source.droppableId) {
      // NOTE: setter에서 현재 상태를 복사한 뒤, splice로 이동할 아이템을 삭제하고, 이동할 위치에 아이템을 추가
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, draggableId);

        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }

    // 다른 보드로 드랍할 때
    if (destination?.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const dragItem = [...allBoards[source.droppableId]];
        const dropItem = [...allBoards[destination.droppableId]];
        dragItem.splice(source.index, 1);
        dropItem.splice(destination.index, 0, draggableId);

        return {
          ...allBoards,
          [source.droppableId]: dragItem,
          [destination.droppableId]: dropItem,
        };
      });
    }
  };

  // FIXME: 드랍할 때마다 Card 재렌더링 성능저하 문제

  return (
    // DragDropContext
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <h1>🆃rello</h1>
        <Boards>
          {/* Droppable */}
          {/* FIXME: Object로 상태가 바뀌어서 배열형태로 바꿔줘야 함 */}
          {Object.keys(toDos).map((boardId) => (
            <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

// 스타일
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 60vw;
  margin: 0 auto;
  width: 100%;
  height: 100vh;

  h1 {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 50px;
    color: white;
  }
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;
  width: 100%;
`;

export default App;
