interface ProfileInfoProps {
  nickname: string;
  followers: number;
  following: number;
  onEdit: () => void;
}

export function ProfileInfo({
  nickname,
  followers,
  following,
  onEdit,
}: ProfileInfoProps) {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold mb-2">{nickname}</h1>
      <div className="flex space-x-4 mb-4">
        <span className="text-lg">팔로워 {followers}</span>
        <span className="text-lg">팔로잉 {following}</span>
      </div>
      <button
        onClick={onEdit}
        className="px-4 py-2 bg-main text-font_btn rounded font-bold hover:bg-sub self-start"
      >
        수정하기
      </button>
    </div>
  );
}
