import Image from "next/image";
import Header from "./_components/Header";
import SignInForm from "./(auth)/signup";

export default function Home() {
  return (
    <div>
      <div className="shadow">
        <Header />
      </div>
        <SignInForm />
    </div>
  );
}
