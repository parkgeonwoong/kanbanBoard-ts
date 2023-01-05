/**
 * @desc : 드래그할 컴포넌트
 * DragDropContext > Droppable > Draggable 순으로 감싸야함
 */

import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IDraggableCard {
  toDo: string;
  index: number;
}

function DraggableCard({ toDo, index }: IDraggableCard) {
  // NOTE: console.log(toDo, " :랜더링 이슈 확인");

  return (
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
  );
}

const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

// FIXME: 드래그할 때마다 Card 재렌더링 성능저하 문제
export default React.memo(DraggableCard);
