
export const Login = () => {

  return (
    <div className="h-screen bg-blue-800 
    absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
    flex items-center justify-center flex-col h-2/5 w-2/5">
      <h1>Login</h1>
      <form action="" className="flex flex-col gap-4">
        <input type="text" placeholder="email"/>
        <input type="text" placeholder="password"/>
      </form>
    </div>
  );
};