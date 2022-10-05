export function NewSquigButton() {
    return (
        <a
          className="flex items-center justify-center rounded-xl border-4 font-helveticaRoman
          border-black bg-red-500 px-8 py-4 font-bold w-3/4 h-24 text-white
          shadow-[6px_6px_0_0_#000] transition hover:shadow-none focus:outline-none 
          focus:ring active:bg-red-100"
          href="/"
        >
          Make Another{" "}
          <span aria-hidden="true" className="ml-1.5" role="img">
            😋
          </span>
        </a>
    )
}