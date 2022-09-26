const Header = () => {
  return (
    <header>
      <div className="fixed px-4 py-8 mx-auto max-w-screen-xl sm:py-12 sm:px-6 lg:px-8 z-20">
        <div className="justify-between items-center flex">
          <div className="text-center">
            <h1 className=" text-2xl font-bold text-stone-900 sm:text-3xl">
              Squig.gif
            </h1>

            <p className="mt-1.5 text-sm text-stone-600">
              Turn any squiggle into a gif. <br></br>By SquiggleDAO
            </p>
          </div>
          
          </div>
        </div>
    </header>
  );
};

export default Header