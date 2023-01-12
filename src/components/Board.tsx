/**
 * @desc : 드랍할 컴포넌트
 * DragDropContext > Droppable
 */

import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoState } from "../atoms";
import DraggableCard from "./DraggableCard";

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const SetToDos = useSetRecoilState(toDoState);

  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onVaild = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    SetToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      {/* Form으로 toDo 생성  */}
      <Form onSubmit={handleSubmit(onVaild)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`${boardId} 입력하세요.`}
        />
      </Form>

      <Droppable droppableId={boardId}>
        {/* FIXME: board 떠날 때, 도착할 때 색상 바꾸기 */}
        {(provided, snapshot) => (
          <Area
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            isDraggingOver={snapshot.isDraggingOver}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {/* Draggable */}
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                toDoId={toDo.id}
                toDoText={toDo.text}
                index={index}
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

// FIXME: 이동시 droppable area 맨 아래까지 지정

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 20px 5px;
  border-radius: 10px;
  min-height: 200px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 20px;
  color: #ed4c67;
`;

const Form = styled.form`
  width: 100%;
  padding: 10px;

  input {
    width: 100%;
    padding: 10px;
    font-size: 12px;
    text-align: center;
    border-radius: 5px;
    border: none;
  }
`;

interface IAreaProp {
  draggingFromThisWith: boolean;
  isDraggingOver: boolean;
}

const Area = styled.div<IAreaProp>`
  padding: 10px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "opacity: 0.5; background-color: #f5f5f5;"
      : props.draggingFromThisWith
      ? "transparent"
      : "transparent"};
  flex-grow: 1;
  border-radius: 10px;
  transition: background-color 0.3s ease-in-out;
`;

export default Board;
