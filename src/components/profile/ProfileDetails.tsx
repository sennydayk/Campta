interface ProfileDetailsProps {
  name: string;
  email: string;
  birthDate: string;
}

export function ProfileDetails({
  name,
  email,
  birthDate,
}: ProfileDetailsProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">이름</h2>
        <p className="mt-1 text-gray-600">{name}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold">이메일</h2>
        <p className="mt-1 text-gray-600">{email}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold">생년월일</h2>
        <p className="mt-1 text-gray-600">{birthDate}</p>
      </div>
    </div>
  );
}
