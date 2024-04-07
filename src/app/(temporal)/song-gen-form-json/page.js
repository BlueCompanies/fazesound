"use client";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Page() {
  const [inputText, setInputText] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const [id, setId] = useState("");
  const [jsonObj, setJsonObj] = useState({
    audioFile: "",
    cover: "",
    name: "",
    youtubeLink: "",
    audioId: "",
    audioWave: "",
    genre: [],
    mood: [],
    date: { day: 1, month: 1, year: 2023 },
    artist: "FazeSound",
    composer: "FazeSound",
    tags: [],
    instruments: [], // should be put as empty array
    audioData: {
      bpm: 120,
      key: "",
      altkey: "",
      duration: { minutes: "", seconds: "" },
    },
    license: "white", // should be put as default
    isPublic: "true", // should be put as default
  });

  const pw = process.env.NEXT_PUBLIC_JSONCOPYPW;

  const updateTextValue = (e) => {
    setInputText(e.target.value);
  };

  const sendPw = () => {
    if (inputText === pw) {
      setIsValidated(true);
    } else {
      setIsValidated(false);
    }
  };

  const handleChange = (e, field) => {
    setJsonObj((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  const handleDateChange = (e, field) => {
    setJsonObj((prevState) => ({
      ...prevState,
      date: {
        ...prevState.date,
        [field]: Number(e.target.value),
      },
    }));
  };

  const handleAudioDataChange = (e, field) => {
    setJsonObj((prevState) => ({
      ...prevState,
      audioData: {
        ...prevState.audioData,
        [field]: e.target.value,
      },
    }));
  };

  const handleDurationChange = (e, field) => {
    setJsonObj((prevState) => ({
      ...prevState,
      audioData: {
        ...prevState.audioData,
        duration: {
          ...prevState.audioData.duration,
          [field]: e.target.value,
        },
      },
    }));
  };

  useEffect(() => {
    const newId = uuidv4();
    setId(newId);
    setJsonObj((prevState) => ({
      ...prevState,
      audioFile: `https://fazestore.online/music/${newId}/audio.mp3`,
      cover: `https://fazestore.online/music/${newId}/thumbnail.webp`,
      audioId: newId,
      audioWave: `https://fazestore.online/audiowaves/${newId}-output.json`,
    }));
  }, []);

  return (
    <div style={{ marginTop: "70px", height: "100vh" }}>
      <input type="text" onChange={updateTextValue} value={inputText} />
      <button type="button" onClick={sendPw}>
        Validate
      </button>
      {isValidated && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {id}
          <input
            type="text"
            value={jsonObj.audioFile}
            onChange={(e) => handleChange(e, "audioFile")}
          />
          <input
            type="text"
            value={jsonObj.cover}
            onChange={(e) => handleChange(e, "cover")}
          />
          <input
            type="text"
            value={jsonObj.name}
            onChange={(e) => handleChange(e, "name")}
          />
          <input
            type="text"
            value={jsonObj.youtubeLink}
            onChange={(e) => handleChange(e, "youtubeLink")}
          />
          <input
            type="text"
            value={jsonObj.audioId}
            onChange={(e) => handleChange(e, "audioId")}
          />
          <input
            type="text"
            value={jsonObj.audioWave}
            onChange={(e) => handleChange(e, "audioWave")}
          />
          <input
            type="text"
            value={jsonObj.genre}
            onChange={(e) => handleChange(e, "genre")}
          />
          <input
            type="text"
            value={jsonObj.mood}
            onChange={(e) => handleChange(e, "mood")}
          />
          <input
            type="number"
            value={jsonObj.date.day}
            onChange={(e) => handleDateChange(e, "day")}
          />
          <input
            type="number"
            value={jsonObj.date.month}
            onChange={(e) => handleDateChange(e, "month")}
          />
          <input
            type="number"
            value={jsonObj.date.year}
            onChange={(e) => handleDateChange(e, "year")}
          />
          <input
            type="text"
            value={jsonObj.artist}
            onChange={(e) => handleChange(e, "artist")}
          />
          <input
            type="text"
            value={jsonObj.composer}
            onChange={(e) => handleChange(e, "composer")}
          />
          <input
            type="text"
            value={jsonObj.tags}
            onChange={(e) => handleChange(e, "tags")}
          />
          <input
            type="text"
            value={jsonObj.instruments}
            onChange={(e) => handleChange(e, "instruments")}
          />
          <input
            type="number"
            value={jsonObj.audioData.bpm}
            onChange={(e) => handleAudioDataChange(e, "bpm")}
          />
          <input
            type="text"
            value={jsonObj.audioData.key}
            onChange={(e) => handleAudioDataChange(e, "key")}
          />
          <input
            type="text"
            value={jsonObj.audioData.altkey}
            onChange={(e) => handleAudioDataChange(e, "altkey")}
          />
          <input
            type="text"
            value={jsonObj.audioData.duration.minutes}
            onChange={(e) => handleDurationChange(e, "minutes")}
          />
          <input
            type="text"
            value={jsonObj.audioData.duration.seconds}
            onChange={(e) => handleDurationChange(e, "seconds")}
          />
          <input
            type="text"
            value={jsonObj.license}
            onChange={(e) => handleChange(e, "license")}
          />
          <input
            type="text"
            value={jsonObj.isPublic}
            onChange={(e) => handleChange(e, "isPublic")}
          />
          <pre>{JSON.stringify(jsonObj, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
