import React, { useEffect, useState } from "react";
import {
  Prism as SyntaxHighlighter,
  PrismLight as SyntaxHighlighterBash
} from 'react-syntax-highlighter';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';

import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import "../static/message.css";

SyntaxHighlighterBash.registerLanguage('bash', bash);

const Message = ({
  animationType,
  customStyle,
  isCode,
  onTypingEnd,
  onTypingStart,
  startLine,
  style,
  text,
  textStyle,
  interval = 10,
  language = "python",
  showLineNumbers = false,
  onAnimationEnd,
  windowRef = null,
}) => {
  const [message, setMessage] = useState("");

  const customStyleMerged = {
    margin: 0,
    padding: '0 0.5em',
    overflowX: 'hidden',
    lineHeight: 'inherit',
    ...customStyle,
  }

  const codeTagProps = {
    style: {
      lineHeight: 'inherit',
      fontSize: 'inherit',
      ...textStyle,
    }
  }

  const typeMessage = (text) => {
    let index = 0;
    const intervalId = setInterval(() => {
      setMessage(text.slice(0, index));
      index++;
      if (windowRef) {
        windowRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
      }
      if (index > text.length) {
        clearInterval(intervalId);
        onTypingEnd(); // Notify Demo component that typing has ended
        if (onAnimationEnd) {
          onAnimationEnd();
        }
      }
    }, interval);
  };

  const typeMessageWordByWord = (text) => {
    const words = text.split(' '); // Break down the text into words
    let aggregatedMessage = '';
    let index = 0;
  
    const intervalId = setInterval(() => {
      if (index < words.length) {
        aggregatedMessage += words[index] + ' '; // Add the next word and a space
        setMessage(aggregatedMessage);
        index++;
        if (windowRef) {
          windowRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
        }
      } else {
        clearInterval(intervalId);
        onTypingEnd(); // Curtain call! Typing has ended
      }
    }, interval);
  };

  const typeMessageLineByLine = (text) => {
    const lines = text.split('\n'); // Split text into lines
    let aggregatedMessage = '';
    
    const intervalId = setInterval(() => {
      if (lines.length > 0) {
        const line = lines.shift(); // Get the first line and remove it from the array
        aggregatedMessage += line + '\n'; // Concatenate the line with newline character
        setMessage(aggregatedMessage);
        if (windowRef) {
          windowRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
        }
      } else {
        clearInterval(intervalId);
        onTypingEnd(); // Notify Demo component that typing has ended
      }
    }, interval);
  };

  const fadeInMessage = (text) => {
    setMessage(text);
  };

  // Function to handle showing new message with animation
  const showNewMessage = (text) => {
    if (animationType === "type") {
      onTypingStart();
      typeMessage(text);
    } else if (animationType === "type-lines") {
      onTypingStart();
      typeMessageLineByLine(text);
    }
    else if (animationType === "type-words") {
      typeMessageWordByWord(text);
    } else if (animationType === "fade" || animationType === "fade-in-cascade") {
      fadeInMessage(text);
    }
  };

  useEffect(() => {
    showNewMessage(text);
  // eslint-disable-next-line
  }, [text]);

  const className = animationType === "fade"
    ? "fade-in" : animationType === "fade-in-cascade"
    ? "fade-in-cascade" : "";

  return isCode ? (
    <pre className={`message-code ${className}`} style={style}>
      {language === "python" ? (
        <SyntaxHighlighter
          codeTagProps={codeTagProps}
          customStyle={customStyleMerged}
          language="python"
          lineNumberStyle={{ minWidth: '0' }}
          lineProps={{ style: {wordBreak: 'break-word', whiteSpace: 'pre-wrap', minWidth: '0'} }}
          style={{ ...vscDarkPlus }}
          wrapLines={true}
          showLineNumbers={showLineNumbers}
          startingLineNumber={startLine}
        >
          {message}
        </SyntaxHighlighter>
      ) : language === "bash" ? (
        <SyntaxHighlighterBash
          codeTagProps={codeTagProps}
          customStyle={customStyleMerged}
          language="bash"
          lineProps={{ style: {wordBreak: 'break-word', whiteSpace: 'pre-wrap'} }}
          style={prism}
          wrapLines={true}
          showLineNumbers={showLineNumbers}
        >
          {message}
        </SyntaxHighlighterBash>
      ) : language === "markdown" ? (
        <SyntaxHighlighter
          codeTagProps={codeTagProps}
          customStyle={customStyleMerged}
          language="markdown"
          lineProps={{ style: {wordBreak: 'break-word', whiteSpace: 'pre-wrap'} }}
          wrapLines={true}
        >
          {message}
        </SyntaxHighlighter>
      ) : (
        <div>
          {message}
        </div>
      )}
    </pre>
  ) : (
    <div className={`message ${className}`} style={style}>
      <span style={textStyle}>{message}</span>
    </div>
  );
};

export default Message;
