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
    <Droppable droppableId={boardId}>
      {(provided) => (
        <BoardWrapper ref={provided.innerRef} {...provided.droppableProps}>
          {/* Draggable */}
          {toDos.map((toDo, index) => (
            <DraggableCard key={toDo} toDo={toDo} index={index} />
          ))}
          {provided.placeholder}
        </BoardWrapper>
      )}
    </Droppable>
  );
}

const BoardWrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 20px;
  border-radius: 10px;
  min-height: 200px;
`;

export default Board;
