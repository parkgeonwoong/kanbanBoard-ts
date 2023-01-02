/**
 * @desc : Drag and Drop 사용
 */

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

function App() {
  const onDragEnd = () => {};

  const toDos = ["a", "b", "c", "d", "e", "f"];

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
