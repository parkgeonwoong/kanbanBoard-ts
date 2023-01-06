/**
 * @desc : 드랍할 컴포넌트
 * DragDropContext > Droppable
 */

import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(provided) => (
          <div
            style={{ backgroundColor: "#dcdde1" }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {/* Draggable */}
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo} toDo={toDo} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  /* width: 300px; */
  background-color: ${(props) => props.theme.boardColor};
  padding: 20px 10px;
  border-radius: 10px;
  min-height: 200px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

export default Board;
