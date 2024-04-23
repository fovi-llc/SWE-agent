import React from "react";

import workspaceLogo from '../../assets/panel_icons/workspace.png';

import IssuePanel from './IssuePanel';
import Message from '../Message';

const WorkspacePanel = ({
  isIssueExpanded,
  selectedTraj,
  setIsIssueExpanded,
  setIsTypingIssue,
  setIsTypingWorkspace,
  stepIdx,
  thoughts,
  workspaceRef,
}) => {
  return (
    <>
      <div className="workspace">
        <div id="label">
          <img src={workspaceLogo} alt="workspace" />
          <span>Workspace</span>
        </div>
        <IssuePanel
          isIssueExpanded={isIssueExpanded}
          selectedTraj={selectedTraj}
          setIsIssueExpanded={setIsIssueExpanded}
          setIsTypingIssue={setIsTypingIssue}
          stepIdx={stepIdx}
        />
        <div className="scrollableDiv">
          <div className="innerDiv">
            {thoughts.map((thought, index) => {
              // Immediately return null if there's no thought to render
              if (thought.length === 0) return null;
              return (
                <>
                  <Message
                    animationType="type"
                    customStyle={{
                      backgroundColor: 'transparent',
                    }}
                    interval={5}
                    isCode
                    key={index}
                    language="markdown"
                    onTypingEnd={() => setIsTypingWorkspace(false)}
                    onTypingStart={() => setIsTypingWorkspace(true)}
                    style={{
                      backgroundColor: 'transparent',
                      boxShadow: "none",
                      margin: "0",
                      overflowY: "hidden",
                      padding: "0em 0.5em",
                    }}
                    text={thought}
                    textStyle={{
                      fontFamily: 'basic-sans',
                      textShadow: 'none',
                    }}
                    windowRef={workspaceRef}
                  />
                  {index !== thoughts.length - 1 && (
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0.25em 0'}}>
                      <hr style={{borderTop: "0.15em dotted #8aa1a6", width: "95%"}} />
                    </div>
                  )}
                </>
              );
            })}
            <div style={{ clear: "both", marginTop: '1em' }} ref={workspaceRef} />
          </div>
        </div>
      </div>
    </>
  )
}

export default WorkspacePanel;