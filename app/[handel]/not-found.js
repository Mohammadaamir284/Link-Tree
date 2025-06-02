export default function NotFound() {
    return (
      <div className="bg-black text-white h-screen flex flex-col space-y-3.5 justify-center items-center" >
        <h1 className="text-5xl font-bold">404 - Page Not Found</h1>
        <p className="text-3xl">Sorry, the user you are looking for does not exist.</p>
      </div>
    );
  }