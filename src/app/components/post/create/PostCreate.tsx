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
import {
  CATEGORIES,
  CATEGORY_MAP,
  PostCreateProps,
} from "@/app/types/post/postTypes";
import { useCreatePost } from "@/app/hooks/posts/useCreatePost";
import { PostType } from "@/app/utils/validations/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { authClient } from "@/app/utils/auth/authClient ";

const PostCreate = () => {
  const queryClient = useQueryClient();
  const form = useForm<PostType>();

  const createPostMutation = useMutation({
    mutationFn: async (data: PostType) => {
      const response = await authClient(
        "https://front-mission.bigs.or.kr/boards",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
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
      form.reset(); // 폼 초기화
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
