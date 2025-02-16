"use client";
import React, { useState } from "react";
import { CATEGORIES, CATEGORY_MAP } from "@/app/types/post/postTypes";
import { EditForm, Label, ButtonContainer } from "./PostEdit.styles";
import {
  Input,
  TextArea,
  Select,
  Button,
  InputGroup,
} from "@/app/components/common/CommonStyles";
import { authClient } from "@/app/utils/auth/authClient ";

export type PostEditProps = {
  post: {
    id: number;
    title: string;
    content: string;
    category: string;
  };
  onCancel: () => void;
  onSuccess: () => void;
};

const PostEdit = ({ post, onCancel, onSuccess }: PostEditProps) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [category, setCategory] = useState(post.category);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      const requestData = { title, content, category };

      formData.append(
        "request",
        new Blob([JSON.stringify(requestData)], { type: "application/json" })
      );

      const response = await authClient(
        `https://front-mission.bigs.or.kr/boards/${post.id}`,
        {
          method: "PATCH",
          body: formData,
          redirect: "follow",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`게시글 수정 실패: ${errorText}`);
      }

      onSuccess();
    } catch (error) {
      console.error("게시글 수정 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <EditForm onSubmit={handleSubmit}>
      <InputGroup>
        <Label htmlFor="title">제목</Label>
        <Input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="content">내용</Label>
        <TextArea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          required
          disabled={isSubmitting}
        />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="category">카테고리</Label>
        <Select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          disabled={isSubmitting}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {CATEGORY_MAP[cat]}
            </option>
          ))}
        </Select>
      </InputGroup>

      <ButtonContainer>
        <Button type="submit" disabled={isSubmitting} variant="primary">
          {isSubmitting ? "저장 중..." : "저장"}
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          variant="secondary"
        >
          취소
        </Button>
      </ButtonContainer>
    </EditForm>
  );
};

export default PostEdit;
