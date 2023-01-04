/**
 * @desc : Drag and Drop 사용
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

  const onDragEnd = ({ destination, source }: DropResult) => {
    let atomArr = [...toDos];
    let dragArr = atomArr.splice(source.index, 1);
    atomArr.splice(Number(destination?.index), 0, dragArr[0]);
    setToDos(atomArr);
    console.log(atomArr);
  };

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
                  <Draggable draggableId={toDo} index={index} key={index}>
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
