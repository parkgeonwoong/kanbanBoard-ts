/**
 * @desc : 드래그할 컴포넌트
 * DragDropContext > Droppable > Draggable 순으로 감싸야함
 */

import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IDraggableCard {
  toDoId: number;
  toDoText: string;
  index: number;
}

function DraggableCard({ toDoId, toDoText, index }: IDraggableCard) {
  // NOTE: console.log(toDo, " :랜더링 이슈 확인");

  return (
    <Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) => props.theme.cardColor};
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: ${(props) =>
    props.isDragging
      ? "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;"
      : "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"};
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
`;

// FIXME: 드래그할 때마다 Card 재렌더링 성능저하 문제
export default React.memo(DraggableCard);
