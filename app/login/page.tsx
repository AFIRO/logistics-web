import { LoginForm } from "./components/LoginForm";

export default function LoginPage() {
  return (
    <div className="h-[calc(100vh-4rem)] w-screen overflow-y-auto flex justify-center items items-center  bg-login-bg ">
      <LoginForm />
    </div>
  );
}
