interface LoginInput {
  username: string;
  password: string;
}

export function validateLogin({ username, password }: LoginInput) {
  return username === "" || password === "" ? false : true;
}
