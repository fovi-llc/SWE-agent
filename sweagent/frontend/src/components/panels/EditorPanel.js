import React from "react";

import editorLogo from '../../assets/panel_icons/editor.png';

import CustomModal from "../CustomModal";
import MacBar from '../MacBar';
import Message from '../Message';

const EditorPanel = ({
  editorOutput,
  editorRef,
  fileName,
  fileStartLine,
  isEditorExpanded,
  setIsEditorExpanded,
  setIsTypingEditorOut,
  setIsTypingFileName,
}) => {
  return (
    <>
    <div className="editor">
      <div id="label">
        <img src={editorLogo} alt="editor" />
        <span>Editor</span>
      </div>
      <MacBar
        setIsTyping={setIsTypingFileName}
        barStyle={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.9))",
          height: "2em",
        }}
        messageStyle={{
          color: "white",
          fontSize: "smaller",
          marginBottom: "0.1em",
        }}
        text={fileName}
        setIsExpanded={setIsEditorExpanded}
      />
      <div className="scrollableDiv" style={{ backgroundColor: "#1e1e1e" }}>
        <div className="innerDiv">
          {!!editorOutput && <Message
            animationType="type-lines"
            interval={35}
            isCode
            key={1}
            onTypingEnd={() => setIsTypingEditorOut(false)}
            onTypingStart={() => setIsTypingEditorOut(true)}
            showLineNumbers
            startLine={fileStartLine}
            style={{ boxShadow: "none" }}
            textStyle={{ fontSize: "smaller" }}
            text={editorOutput}
            windowRef={editorRef}
          />}
          <div style={{ clear: "both" }} ref={editorRef} />
        </div>
      </div>
    </div>
    <CustomModal
      isOpen={isEditorExpanded}
      onConfirm={() => setIsEditorExpanded(false)}
      content={
        <>
          <p style={{ color: 'white', margin: '0', padding: '0', marginBottom: '1em' }}>{fileName}</p>
          <hr style={{ color: 'white', width: '100%', marginBottom: '1em' }} />
          <Message
            animationType="type-lines"
            isCode
            customStyle={{ lineHeight: '1.25em', fontSize: '1.15em' }}
            onTypingEnd={() => setIsTypingEditorOut(false)}
            onTypingStart={() => setIsTypingEditorOut(true)}
            style={{ boxShadow: "none", height: "100%" }}
            showLineNumbers
            startLine={fileStartLine}
            text={editorOutput}
          />
        </>
      }
      customStyles={{content: {backgroundColor: '#1e1e1e', width: '80%', height: '60%'}}}
    />
    </>
  )
}

export default EditorPanel;