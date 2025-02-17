"use client";
import React from "react";
import { PostCreateContainer, ButtonContainer } from "./PostCreate.styles";
import {
  Form,
  FormContent,
  InputGroup,
  Input,
  TextArea,
  Select,
  Button,
  ErrorMessage,
  Title,
} from "@/app/components/common/CommonStyles";
import { CATEGORIES, CATEGORY_MAP } from "@/app/types/post/postTypes";
import { PostType } from "@/app/utils/validations/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { authClient } from "@/app/utils/auth/authClient ";

const PostCreate = () => {
  const queryClient = useQueryClient();
  const form = useForm<PostType>();

  const createPostMutation = useMutation({
    mutationFn: async (data: PostType) => {
      const formData = new FormData();
      const requestData = {
        title: data.title,
        content: data.content,
        category: data.category,
      };

      formData.append(
        "request",
        new Blob([JSON.stringify(requestData)], { type: "application/json" })
      );
      const response = await authClient(
        "https://front-mission.bigs.or.kr/boards",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      return response.json();
    },
    onSuccess: () => {
      // 게시글 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert("게시글이 등록되었습니다."); // 성공 알림 추가
      form.reset(); // 폼 초기화
    },
    onError: (error) => {
      alert(
        error instanceof Error
          ? error.message
          : "게시글 등록 중 오류가 발생했습니다."
      );
    },
  });

  const handlePost = async (data: PostType) => {
    try {
      await createPostMutation.mutateAsync(data);
    } catch (error) {
      console.error("게시글 작성 실패:", error);
    }
  };

  return (
    <PostCreateContainer>
      <Title>게시물 작성</Title>
      <Form onSubmit={form.handleSubmit(handlePost)}>
        <FormContent>
          <InputGroup>
            <Input
              {...form.register("title")}
              placeholder="제목을 입력하세요"
            />
            {form.formState.errors.title && (
              <ErrorMessage>{form.formState.errors.title.message}</ErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <TextArea
              {...form.register("content")}
              placeholder="내용을 입력하세요"
            />
            {form.formState.errors.content && (
              <ErrorMessage>
                {form.formState.errors.content.message}
              </ErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <Select {...form.register("category")} defaultValue="">
              <option value="" disabled>
                카테고리 선택
              </option>
              {CATEGORIES.map((categoryKey) => (
                <option key={categoryKey} value={categoryKey}>
                  {CATEGORY_MAP[categoryKey]}
                </option>
              ))}
            </Select>
            {form.formState.errors.category && (
              <ErrorMessage>
                {form.formState.errors.category.message}
              </ErrorMessage>
            )}
          </InputGroup>

          <ButtonContainer>
            <Button type="submit" variant="primary">
              게시하기
            </Button>
          </ButtonContainer>
        </FormContent>
      </Form>
    </PostCreateContainer>
  );
};

export default PostCreate;
