import SignupForm from "@/app/signup/components/SignupForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">회원가입</h1>
      <SignupForm />
    </div>
  );
}
