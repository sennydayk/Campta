export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
  nickname: string;
  birthdate: string;
  profileImage: string | null;
}

export interface RegisterResponse {
  user: {
    uid: string;
    email: string;
    nickname: string;
    profileImg: string;
  };
  accessToken: string;
}

export interface ProfileImageUploaderProps {
  profileImage: string | null;
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
