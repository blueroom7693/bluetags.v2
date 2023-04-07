import React, { useContext, useRef, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import { TextInput } from "../components/auth/AuthShared";
import styled, { ThemeContext } from "styled-components/native";
import AuthLayoutScroll from "../components/auth/AuthLayoutScroll";
import useMutation from "../libs/client/useMutation";
import { User } from "../utils/type";
import Checkbox from "expo-checkbox";

const MainText = styled.Text`
  font-size: 26px;
  font-weight: 300;
  color: ${(props) => props.theme.Text0dp};
  margin-bottom: 48px;
`;

const SubText = styled.Text`
  font-size: 12px;
  font-weight: 700;
  color: ${(props) => props.theme.Text0dp};
  margin-bottom: 10px;
`;

const ErrorText = styled.Text`
  color: ${(props) => props.theme.Text0dp};
  margin-bottom: 0px;
`;

const TermBox = styled.View`
  flex-direction: row;
  width: 300px;
  margin: 5px;
  justify-content: space-between;
  align-items: center;
`;

const TermText = styled.Text`
  color: ${(props) => props.theme.Text0dp};
  font-size: 11px;
  font-weight: 400;
`;
//Typescript

interface EnterForm {
  email: string;
  name: string;
  password: string;
  confirm_password: string;
}

interface EnterResponse {
  user: User;
  error?: {
    email: string;
    password: string;
    confirm_password: string;
    name: string;
  };
}

interface ErrorResponse {
  email: string;
  name: string;
  password: string;
  confirm_password: string;
}

interface UserResponse {
  data: User;
}

export default function CreateAccount({ navigation }) {
  //Use Mutation
  const [enter, { loading, data, error, status }] = useMutation<
    EnterResponse,
    ErrorResponse
  >("https://www.bluetags.app/api/users/sign-up");

  const [auth, {}] = useMutation("/api/users/sign-up/auth");

  //isChecked
  const [checkBox1, setChecked1] = useState(false);
  const [checkBox2, setChecked2] = useState(false);
  const [checkBoxError, setCheckBoxError] = useState("");

  //useform
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm<EnterForm>();

  //error
  useEffect(() => {
    if (error) {
      if (error.confirm_password) {
        setError("confirm_password", { message: error.confirm_password });
      }
      if (error.email) {
        setError("email", { message: error.email });
      }
      if (error.password) {
        setError("password", { message: error.password });
      }
      if (error.name) {
        setError("name", { message: error.name });
      }
    }
    if (status === 200) {
      console.log(data?.user.email);
      auth({ email: data?.user.email });
    }
  }, [data, error, status, setError]);

  //reference
  const name = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  //auto next
  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  // 연습과정
  // const emailValidation = (email: string) => {
  //   let regex = new RegExp(
  //     "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  //   );
  //   if (!regex.test(email))
  //     setError("email", { message: "이메일 양식 이상함" });
  //   return regex.test(email);
  // };
  // const passwordValidation = (password: string) => {
  //   let reg = new RegExp(
  //     "/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/"
  //   );
  //   if (password.length < 8 || password.length > 20) {
  //     setError("password", { message: "8자리 ~ 20자리 이내로 입력해주세요." });
  //     return false;
  //   } else if (password.search(/\s/) != -1) {
  //     setError("password", { message: "비밀번호는 공백 없이 입력해주세요." });
  //     return false;
  //   } else if (
  //     password.search(/[0-9]/g) < 0 ||
  //     password.search(/[a-z]/gi) < 0
  //   ) {
  //     setError("password", {
  //       message: "영문,숫자,특수문자를 혼합하여 입력해주세요.",
  //     });
  //     return false;
  //   }
  //   return true;
  // };
  // const onValid = async (validForm: EnterForm) => {
  //   const validation =
  //     emailValidation(validForm.email) &&
  //     passwordValidation(validForm.password);
  //   if (!checkBox1 || !checkBox2) {
  //     setCheckBoxError("Please check");
  //     return;
  //   }
  //   if (loading) return;
  //   if (validation) enter({ ...validForm });
  // };
  // 연습 과정

  //submit
  const onValid = (validForm: EnterForm) => {
    if (loading) return;
    enter(validForm);
  };
  //register
  useEffect(() => {
    register("email", {
      required: true,
    });
    register("name", {
      required: true,
    });
    register("password", {
      required: true,
    });
    register("confirm_password", {
      required: true,
    });
  }, [register]);
  //
  const CustomTextInput = React.forwardRef(
    ({ onChangeText, ...props }, ref) => (
      <>
        <TextInput
          {...props}
          ref={ref}
          placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
          onChangeText={onChangeText}
        />
        <ErrorText>{errors[props.name]?.message}</ErrorText>
      </>
    )
  );

  //

  //return

  return (
    <AuthLayoutScroll>
      <MainText>Sign up</MainText>
      <SubText>E-mail</SubText>
      <CustomTextInput
        name="email"
        placeholder="email"
        returnKeyType="next"
        onSubmitEditing={() => onNext(name)}
        onChangeText={(text) => setValue("email", text)}
      />
      <SubText>Name</SubText>
      <CustomTextInput
        ref={name}
        name="name"
        placeholder="name"
        returnKeyType="next"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("name", text)}
      />
      <SubText>Password</SubText>
      <CustomTextInput
        ref={passwordRef}
        name="password"
        placeholder="password"
        autoCapitalize="none"
        returnKeyType="next"
        onSubmitEditing={() => onNext(confirmPasswordRef)}
        onChangeText={(text) => setValue("password", text)}
      />
      <SubText>Confirm Password</SubText>
      <CustomTextInput
        ref={confirmPasswordRef}
        name="confirm_password"
        placeholder="Confirm password"
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        onChangeText={(text) => setValue("confirm_password", text)}
        onSubmitEditing={handleSubmit(onValid)}
      />
      <TermBox>
        <Checkbox
          style={styles.checkbox}
          value={checkBox1}
          onValueChange={setChecked1}
          color={checkBox1 ? "#0075ff" : undefined}
        />
        <TermText>
          This site is protected by reCAPTCHA and the Google Privacy Policy and
          Terms of Service apply.
        </TermText>
      </TermBox>
      <TermBox>
        <Checkbox
          style={styles.checkbox}
          value={checkBox2}
          onValueChange={setChecked2}
          color={checkBox2 ? "#0075ff" : undefined}
        />
        <TermText>
          Creating an account means you are okay with our Terms of Service,
          Privacy Policy, and our default Notification Settings.
        </TermText>
      </TermBox>
      <ErrorText>{checkBoxError ? checkBoxError : null}</ErrorText>

      <AuthButton
        text="Create Account"
        disabled={false}
        onPress={handleSubmit(onValid)}
        disabled={
          !watch("email") ||
          !watch("password") ||
          !watch("confirm_password") ||
          !watch("name")
        }
      />
    </AuthLayoutScroll>
  );
}
const styles = StyleSheet.create({
  checkbox: {
    marginRight: 10,
  },
});
