export default function Home() {
  return (
    <>
      <div
        data-theme="forest"
        className="font-inter h-screen flex flex-col items-center justify-center"
      >
        <h1 className="font-fredoka text-base-content text-3xl lg:text-6xl font-semibold max-w-4xl text-center tracking-tight leading-none">
          The hardest game you’ll ever play… by doing nothing.
        </h1>
        <button className="btn btn-primary rounded-full btn-lg lg:btn-xl btn-wide mt-8 lg:mt-12 font-fredoka">
          Play
        </button>
      </div>
    </>
  );
}
