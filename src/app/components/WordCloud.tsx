import React, { useEffect, useState } from 'react';
import WordCloud from 'react-wordcloud';

const WordCloudComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/wordcloud');
      const wordData = await res.json();
      setData(wordData);
    };
    fetchData();
  }, []);

  const wordCloudOptions = {
    fontFamily: 'Arial',
    fontSize: [10, 60],
    fontStyle: 'normal',
    rotate: [0, 45],
    padding: 5,
  };

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <WordCloud
        words={data.map(({ word, count }) => ({ text: word, value: count }))}
        options={wordCloudOptions}
      />
    </div>
  );
};

export default WordCloudComponent;
