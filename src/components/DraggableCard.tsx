/**
 * @desc : 드래그할 컴포넌트
 * DragDropContext > Droppable > Draggable 순으로 감싸야함
 * TODO:
 * - 삭제 기능
 * - 수정 기능, 수정시 포커싱
 */

import React, { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../model/atoms";
import { BiMessageSquareEdit } from "react-icons/bi";

interface IDraggableCard {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string;
}

function DraggableCard({ toDoId, toDoText, index, boardId }: IDraggableCard) {
  // NOTE: console.log(toDo, " :랜더링 이슈 확인");
  const setToDos = useSetRecoilState(toDoState);
  const [isEdit, setIsEdit] = useState(false);
  const editInputRef = useRef<HTMLInputElement>(null);

  // TODO: 수정시 포커싱
  useEffect(() => {
    if (editInputRef.current !== null) {
      editInputRef.current.focus();
    }
  }, [isEdit]);

  const modalToggle = () => {
    setIsEdit((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEdit((prev) => !prev);
  };

  // TODO: 수정기능
  const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setNewText(e.currentTarget.value);
    setToDos((prev) => {
      let changeText = { ...prev };

      changeText[boardId] = changeText[boardId].map((toDo) => {
        if (toDo.id === toDoId) return { ...toDo, text: e.currentTarget.value };
        return toDo;
      });

      return { ...changeText };
    });
  };

  // FIXME: 삭제 버튼 클릭 시, 해당 아이템 삭제
  const handleDelete = () => {
    setToDos((prev) => {
      let newTodos = { ...prev };

      newTodos[boardId] = newTodos[boardId].filter(
        (toDo) => toDo.id !== toDoId
      );

      return { ...newTodos };
    });
  };

  return (
    <Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <CardBox>👉 {toDoText}</CardBox>
          <CardBox>
            <CardButton onClick={modalToggle}>
              <EditBtn size="20" />
            </CardButton>
            <CardButton onClick={handleDelete}>❌</CardButton>
          </CardBox>

          {isEdit ? (
            <Modal onSubmit={handleSubmit}>
              <input
                onChange={handleEdit}
                type="text"
                defaultValue={toDoText}
                ref={editInputRef}
              />
            </Modal>
          ) : null}
        </Card>
      )}
    </Draggable>
  );
}

const EditBtn = styled(BiMessageSquareEdit)`
  color: ${(props) => props.theme.textColor};
`;

const Modal = styled.form`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;

  input {
    width: 300px;
    height: 50px;
    border: none;
    border-radius: 10px;
    padding: 10px;
    font-size: 15px;
  }
`;

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) => props.theme.cardColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: ${(props) =>
    props.isDragging
      ? "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;"
      : "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"};
  transition: opacity 0.2s ease-in-out;
  @media screen and (max-width: 768px) {
    padding: 10px;
  }

  &:hover {
    opacity: 0.7;
  }
`;

const CardBox = styled.div`
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    font-size: 8px;
  }
`;

const CardButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 5px 10px;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    width: 50%;
    font-size: 8px;
  }
`;

// FIXME: 드래그할 때마다 Card 재렌더링 성능저하 문제
export default React.memo(DraggableCard);
