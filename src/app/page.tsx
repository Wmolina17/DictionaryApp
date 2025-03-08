"use client";
import { useState } from "react";
import { Phonetic, Definition, Meaning, DictionaryEntry } from "../types/types"
import { useDispatch } from "react-redux";
import { addSearch } from "../redux/historySlice";

export default function Home() {
  const [word, setWord] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState<DictionaryEntry | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useDispatch();

  const fetchWord = async (word: string) => {
    setError("");

    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const result = await res.json();
      if (res.ok) setData(result[0]);
      else setError(result.message || "Palabra no encontrada");
    } catch (err) {
      setError("Error al buscar la palabra");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim()) {
      setError("Please enter the word you wish to search for, can't be empty");
      return
    }
    fetchWord(word);
    dispatch(addSearch(word));
    setWord("");
  };

  const handlePlayAudio = () => {
    const phoneticWithAudio = data?.phonetics.find((p: Phonetic) => p.audio);
    if (!phoneticWithAudio) return;

    setIsPlaying(true);
    const audio = new Audio(phoneticWithAudio.audio);

    audio.onended = () => setIsPlaying(false);
    audio.play();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full flex gap-2 bg-gray-100 rounded-2xl p-3 px-4">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="border-none w-full outline-none bg-transparent"
          placeholder="Buscar palabra..."
        />
        <button type="submit">
          <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/C850F2/search--v1.png" alt="search" />
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {data?.word && (
        <div className="mt-5 pt-5">
          <div className="w-full flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">{data.word}</h1>
              <p className="text-xl text-purple-500 mt-2">{data.phonetic}</p>
            </div>
            {data.phonetics?.find((p: Phonetic) => p.audio) && (
              <button className="p-4 border-none rounded-full bg-purple-200" onClick={handlePlayAudio}>
                {
                  isPlaying ? (
                    <img width="25" height="25" src="https://img.icons8.com/ios-glyphs/30/C850F2/audio-wave--v1.png" alt="audio-wave--v1" />
                  ) : (
                    <img width="25" height="25" src="https://img.icons8.com/ios-glyphs/30/C850F2/play--v1.png" alt="play--v1" />
                  )
                }
              </button>
            )}
          </div>

          {data.meanings.map((meaning: Meaning, index: number) => (
            <div key={index} className="mt-6">
              <h2 className="font-semibold text-lg title-bef">{meaning.partOfSpeech}</h2>
              <h2 className="text-gray-400 text-lg mt-5 mb-3">Meaning</h2>

              <ul className="space-y-2 text-gray-700">
                {meaning.definitions.map((def: Definition, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-purple-500">•</span>
                    <p className="flex flex-col">
                      {def.definition}
                      <span>{def.example && <span className="text-gray-400 italic">"{def.example}"</span>}</span>
                    </p>
                  </li>
                ))}
              </ul>

              {meaning.synonyms.length > 0 && (
                <p className="mt-5 mb-5 pt-3 pb-3">
                  <span className="text-gray-500 mr-3">Synonyms </span>
                  {meaning.synonyms.map((syn: string, i: number) => (
                    <span key={i} className="text-purple-500 font-semibold">{syn}</span>
                  ))}
                </p>
              )}
            </div>
          ))}

          <hr className="w-full border-t border-gray-200 mt-5 pt-5" />

          <p className="text-sm">
            Source
            <a href={data.sourceUrls[0]} target="_blank" rel="noopener noreferrer" className="text-gray-500 underline ml-3">
              {data.sourceUrls[0]}
            </a>
          </p>
        </div>
      )}

    </div>
  );
}
