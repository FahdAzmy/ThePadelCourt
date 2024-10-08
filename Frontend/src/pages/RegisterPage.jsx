import SignUpForm from "../components/SignupForm";

export default function LoginPage() {
  return (
    <div className="relative w-full h-screen">
      <img
        src="/PadelPlayer.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        alt="Padel Court"
      />{" "}
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-"></div>
      <SignUpForm />
    </div>
  );
}
