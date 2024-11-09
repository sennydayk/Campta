export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    birthdate: string;
    photoURL: string;
    displayName: string;
    uid: string;
    email: string;
    nickname: string;
    name: string;
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
