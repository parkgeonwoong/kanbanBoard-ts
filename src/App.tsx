/**
 * @desc : Drag and Drop 사용
 * @TODO:
 *
 * @FIXME:
 * 1. 드라그앤드라십 원하는 위치에 정렬하기
 */

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  /* NOTE: 원하는 위치에 정렬:
    DragDropContext onDragEnd 매개변수에서 현재위치, 이동할 위치, 이동할 아이템 받아옴 
  */
  const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
    if (!destination) return; // 이동할 위치가 없으면 return (type error 방지)
    // NOTE: setter에서 현재 상태를 복사한 뒤, splice로 이동할 아이템을 삭제하고, 이동할 위치에 아이템을 추가
    setToDos((curr) => {
      const copyToDos = [...curr];
      copyToDos.splice(source.index, 1);
      copyToDos.splice(destination?.index, 0, draggableId);
      return copyToDos;
    });
  };

  // FIXME: 드랍할 때마다 Card 재렌더링 성능저하 문제

  return (
    // DragDropContext
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <h1>🆃rello</h1>
        <Boards>
          {/* Droppable */}
          <Droppable droppableId="one">
            {(provided) => (
              <Board ref={provided.innerRef} {...provided.droppableProps}>
                {/* Draggable */}
                {toDos.map((toDo, index) => (
                  <Draggable key={toDo} draggableId={toDo} index={index}>
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        {toDo}
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Board>
            )}
          </Droppable>
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
  max-width: 480px;
  margin: 0 auto;
  width: 100%;
  height: 100vh;

  h1 {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 30px;
    color: white;
  }
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 10px;
  width: 100%;
`;

const Board = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 20px;
  border-radius: 10px;
  min-height: 200px;
`;

const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export default App;
