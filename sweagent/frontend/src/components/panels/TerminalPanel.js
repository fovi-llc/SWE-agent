import React from "react";

import terminalLogo from '../../assets/panel_icons/terminal.png';

import CustomModal from "../CustomModal";
import MacBar from '../MacBar';
import Message from '../Message';

const TerminalPanel = ({
  isTerminalExpanded,
  setIsTerminalExpanded,
  setIsTypingTerminalIn,
  setIsTypingTerminalOut,
  terminalAction,
  terminalOutput,
  terminalRef,
}) => {
  return (
    <>
      <div className="terminal">
        <div id="label">
          <img src={terminalLogo} alt="terminal" />
          <span>Terminal</span>
        </div>
        <MacBar
          barStyle={{ height: "2em" }}
          expandFillColor={"black"}
          setIsExpanded={setIsTerminalExpanded}
        />
        <Message
          animationType="type"
          interval={10}
          isCode
          language="bash"
          key={0}
          onTypingEnd={() => setIsTypingTerminalIn(false)}
          onTypingStart={() => setIsTypingTerminalIn(true)}
          style={{
            backgroundColor: '#f5f2f0',
            boxShadow: "none",
            margin: "0",
            overflowY: "hidden",
            padding: "0.25em 0.5em 0.75em 0.5em",
          }}
          customStyle={{
            backgroundColor: 'inherit',
          }}
          text={`$ ${terminalAction}`}
        />
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f2f0'}}>
          <hr style={{borderTop: "1px solid gray", width: "95%"}} />
        </div>
        <div className="scrollableDiv" style={{ backgroundColor: "#f5f2f0" }}>
          <div className="innerDiv">
            {!!terminalOutput && <Message
              animationType="type-lines"
              customStyle={{ lineHeight: '1.0em', fontSize: '1.15em' }}
              interval={35}
              isCode
              language="bash"
              key={1}
              onTypingEnd={() => setIsTypingTerminalOut(false)}
              onTypingStart={() => setIsTypingTerminalOut(true)}
              style={{
                backgroundColor: "transparent",
                boxShadow: "none",
                color: "white",
                marginTop: "0.5em",
              }}
              text={terminalOutput}
              textStyle={{ fontSize: "smaller" }}
              windowRef={terminalRef}
            />}
            <div style={{ clear: "both" }} ref={terminalRef} />
          </div>
        </div>
      </div>
      <CustomModal
        isOpen={isTerminalExpanded}
        onConfirm={() => setIsTerminalExpanded(false)}
        content={
          <>
            <Message
              animationType="type"
              interval={20}
              isCode
              language="bash"
              key={0}
              onTypingEnd={() => setIsTypingTerminalIn(false)}
              onTypingStart={() => setIsTypingTerminalIn(true)}
              style={{
                backgroundColor: "transparent",
                boxShadow: "none",
                color: "white",
              }}
              text={`$ ${terminalAction}`}
            />
            <hr style={{ color: 'white', width: '100%', marginBottom: '1em' }} />
            {!!terminalOutput && <Message
              animationType="type-lines"
              customStyle={{ lineHeight: '1.25em', fontSize: '1.15em' }}
              interval={20}
              isCode
              language="bash"
              key={1}
              onTypingEnd={() => setIsTypingTerminalOut(false)}
              onTypingStart={() => setIsTypingTerminalOut(true)}
              style={{
                backgroundColor: "transparent",
                boxShadow: "none",
                color: "white",
                marginTop: "0.5em",
              }}
              text={terminalOutput}
              textStyle={{ fontSize: "smaller" }}
            />}
          </>
        }
        customStyles={{content: { backgroundColor: "#f5f2f0"}}}
      />
    </>
  )
};

export default TerminalPanel;