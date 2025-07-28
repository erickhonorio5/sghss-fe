import api from "@/lib/axios";
import {SignUpSchema} from "@/lib/schema/signUpSchema";
import {LoginSchemaType} from "@/lib/schema/SignInSchema";

export const signUp = async (data: SignUpSchema) => {
  await api.post('/users/signup', data);
};

export const signIn = async (data: LoginSchemaType) => {
  const response = await api.post('/auth/login', {
    username: data.emailOrUsername,
    password: data.password
  }, {
    withCredentials: true
  });
  return response.data;
};