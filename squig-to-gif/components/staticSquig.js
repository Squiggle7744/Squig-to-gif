

const squigFrame = (tokenID) => {
  return (
    <iframe
      title="Live Squiggle View"
      class="absolute w-full h-screen "
      src={`https://generator.artblocks.io/${tokenID}`}
    />
  );
};

export default squigFrame;

//src={squig.token.token.metadata.generator_url}
//src="https://generator.artblocks.io/0x059edd72cd353df5106d2b9cc5ab83a52287ac3a/1401"
