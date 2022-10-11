import { useState, useEffect } from "react";
import requestQuote from "src/quoteRequester";

const LandingPage = (props: any) => {
  const { updateScene } = props;
  const [randomQuote, setQuote] = useState('');
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    requestQuote().then((response: any) => {
      if (randomQuote === '' && response?.originator) {
        setQuote(`"${response.content}" - ${response.originator.name}`);
      }
    })
    .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (randomQuote !== '') {
      setLoading(false);
    }
  }, [randomQuote]);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col italic text-xl h-[30vh] w-[75vw] md:w-[50vw] text-center justify-center items-center">
        <span>{isLoading ? "Fetching a random quote..." : randomQuote}</span>
      </div>
      <button
        className="bg-purple-500 text-xl text-white p-2 px-12"
        onClick={() => {
          updateScene();
        }}
      >
        Create CV
      </button>
    </div>
  );
};

export default LandingPage;
