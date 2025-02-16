import { useLogin } from "@/app/hooks/login/useLogin";
import { LoginContainer, LoginBox } from "./LoginForm.styles";
import {
  Form,
  FormContent,
  InputGroup,
  Input,
  ErrorMessage,
  ButtonGroup,
  Button,
  ErrorAlert,
  Title,
} from "@/app/components/common/CommonStyles";

export const LoginForm = () => {
  const { form, handleLogin, goToRegisterPage, isLoading, loginError } =
    useLogin();

  return (
    <LoginContainer>
      <LoginBox>
        <Title>로그인</Title>
        <Form onSubmit={form.handleSubmit(handleLogin)}>
          {loginError && <ErrorAlert role="alert">{loginError}</ErrorAlert>}
          <FormContent>
            <InputGroup>
              <Input
                {...form.register("username")}
                type="email"
                placeholder="이메일"
              />
              {form.formState.errors.username && (
                <ErrorMessage>
                  {form.formState.errors.username.message}
                </ErrorMessage>
              )}
            </InputGroup>
            <InputGroup>
              <Input
                {...form.register("password")}
                type="password"
                placeholder="비밀번호"
              />
              {form.formState.errors.password && (
                <ErrorMessage>
                  {form.formState.errors.password.message}
                </ErrorMessage>
              )}
            </InputGroup>
            <ButtonGroup>
              <Button type="submit" disabled={isLoading} variant="primary">
                {isLoading ? "로그인 중..." : "로그인"}
              </Button>
              <Button
                type="button"
                onClick={goToRegisterPage}
                disabled={isLoading}
                variant="secondary"
              >
                회원가입
              </Button>
            </ButtonGroup>
          </FormContent>
        </Form>
      </LoginBox>
    </LoginContainer>
  );
};
