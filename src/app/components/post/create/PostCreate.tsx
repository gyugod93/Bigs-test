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

const PostCreate = ({ onAddPost }: PostCreateProps) => {
  const { form, createPost } = useCreatePost(onAddPost);

  const handlePost = async (data: PostType) => {
    await createPost(data);
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
