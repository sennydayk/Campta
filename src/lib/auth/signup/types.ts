export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
  nickname: string;
  birthdate: string;
  profileImg: string | null;
}

export interface RegisterResponse {
  user: {
    uid: string;
    email: string;
    name: string;
    nickname: string;
    birthdate: string;
    profileImg: string;
  };
  accessToken: string;
}

export interface ProfileImageUploaderProps {
  profileImg: string | null;
  onImageChange: (image: string | null) => void;
}

export interface FormInputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}
