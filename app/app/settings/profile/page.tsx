export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-bold">Personal Information</p>
        <div className="flex flex-col">
          <p>form</p>
        </div>
      </div>
      <div className="flex flex-col">
        <p>form</p>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-xl font-bold">Additional sign-in methods</p>
        <p>Connect your csvgres Account with a third-party service to use it for login, or set a password to login with your email address.</p>
        <p>google</p>
      </div>
    </div>
  );
}