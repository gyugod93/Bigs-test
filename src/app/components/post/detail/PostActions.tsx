"use client";
import { PostActionsProps } from "@/app/types/post/postTypes";
import { Button } from "@/app/components/common/CommonStyles";
import { ActionsContainer } from "./PostActions.styles";
import React from "react";

const PostActions = ({ onEdit, onDelete, isLoggedIn }: PostActionsProps) => {
  if (!isLoggedIn) return null;

  return (
    <ActionsContainer>
      <Button variant="primary" onClick={onEdit}>
        수정
      </Button>
      <Button variant="danger" onClick={onDelete}>
        삭제
      </Button>
    </ActionsContainer>
  );
};

export default PostActions;
