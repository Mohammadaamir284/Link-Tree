export default function NotFound() {
  return (
    <div className="bg-black text-white h-screen flex flex-col space-y-6 justify-center items-center px-4 text-center">
      <h1 className="text-3xl md:text-5xl font-bold">404 - Page Not Found</h1>
      <p className="text-lg md:text-2xl">Sorry, the user you are looking for does not exist.!</p>
    </div>

  );
}