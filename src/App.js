import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  // Function to fetch a new quote from an API
  const fetchQuote = () => {
    fetch('https://api.quotable.io/random')
      .then(response => response.json())
      .then(data => {
        setQuote(data.content);
        setAuthor(data.author);
      })
      .catch(error => console.log(error));
  };

  // Function to handle tweet quote
  const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`;
    window.open(twitterUrl, '_blank');
  };

  // Function to add spin animation to quote-box
  const addSpinAnimation = () => {
    const quoteBox = document.getElementById('quote-box');
    quoteBox.classList.add('spin-animation');
    // Remove spin animation after 0.5s
    setTimeout(() => {
      quoteBox.classList.remove('spin-animation');
    }, 500);
  };

  // Fetch a new quote on component mount
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className='POZADINA'>
      <div id="quote-box" className="text-center">
        <h2 id="text">{quote}</h2>
        <p id="author">- {author}</p>
        <button id="new-quote" className="btn btn-primary" onClick={() => { fetchQuote(); addSpinAnimation(); }}>New Quote</button>
        <a id="tweet-quote" className="btn btn-info" onClick={tweetQuote} href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`} target="_blank" rel="noopener noreferrer">
          Quote Link
        </a>
      </div>
      <p className='meLol'>Made by A.M</p>
    </div>
  );
}

export default App;
