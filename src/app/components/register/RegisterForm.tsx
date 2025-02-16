import { useRegister } from "@/app/hooks/register/useRegister";
import { RegisterContainer, RegisterBox } from "./RegisterForm.styles";
import {
  Form,
  FormContent,
  InputGroup,
  Input,
  ErrorMessage,
  ButtonGroup,
  Button,
  ErrorAlert,
  SuccessAlert, // SuccessAlert 추가
  Title,
} from "@/app/components/common/CommonStyles";

export const RegisterForm = () => {
  const { form, handleSignup, goToLoginPage, error, isLoading, isSuccess } =
    useRegister();

  return (
    <RegisterContainer>
      <RegisterBox>
        <Title>회원가입</Title>
        {error && <ErrorAlert>{error}</ErrorAlert>}
        {isSuccess && (
          <SuccessAlert>
            회원가입이 완료되었습니다! 로그인 페이지로 이동합니다...
          </SuccessAlert>
        )}
        <Form onSubmit={form.handleSubmit(handleSignup)}>
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
                {...form.register("name")}
                type="text"
                placeholder="이름"
              />
              {form.formState.errors.name && (
                <ErrorMessage>
                  {form.formState.errors.name.message}
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

            <InputGroup>
              <Input
                {...form.register("confirmPassword")}
                type="password"
                placeholder="비밀번호 확인"
              />
              {form.formState.errors.confirmPassword && (
                <ErrorMessage>
                  {form.formState.errors.confirmPassword.message}
                </ErrorMessage>
              )}
            </InputGroup>

            <ButtonGroup>
              <Button type="submit" disabled={isLoading} variant="primary">
                {isLoading ? "가입 중..." : "회원가입"}
              </Button>
              <Button
                type="button"
                onClick={goToLoginPage}
                disabled={isLoading}
                variant="secondary"
              >
                로그인
              </Button>
            </ButtonGroup>
          </FormContent>
        </Form>
      </RegisterBox>
    </RegisterContainer>
  );
};
