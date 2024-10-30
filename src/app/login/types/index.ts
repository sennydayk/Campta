export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    uid: string;
    email: string;
    nickName: string;
  };
  token: string;
}

export interface FormInputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
}

export interface RememberMeProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}
