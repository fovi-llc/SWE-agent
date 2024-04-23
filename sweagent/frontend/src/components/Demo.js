import React, { useEffect, useRef, useState } from "react";

import data from '../assets/web_trajs.json';
import "../static/demo.css";
import "../static/button.css";

import EditorPanel from "./panels/EditorPanel";
import TerminalPanel from "./panels/TerminalPanel";
import WorkspacePanel from "./panels/WorkspacePanel";

import {
  instanceToLogo,
  instanceToSelectOption
} from './utils/instanceToUI';
import Submission from "./Submission";

const Demo = () => {
  // State variables for managing selected trajectory
  const [stepIdx, setStepIdx] = useState(0);
  const [selectedTrajID, setSelectedTrajID] = useState(data[0].instance_id);
  const [selectedTraj, setSelectedTraj] = useState(data[0]);

  // State variable for managing workspace messages, terminal/editor actions/outputs
  const [editorOutput, setEditorOutput] = useState('');
  const [fileName, setFileName] = useState('📄 [No Open File]');
  const [fileStartLine, setFileStartLine] = useState(0);
  const [terminalAction, setTerminalAction] = useState('');
  const [terminalOutput, setTerminalOutput] = useState('');
  const [thoughts, setThoughts] = useState([]);

  // State variables for managing typing status
  const [isTyping, setIsTyping] = useState(false);
  const [isTypingEditorOut, setIsTypingEditorOut] = useState(false);
  const [isTypingFileName, setIsTypingFileName] = useState(false);
  const [isTypingIssue, setIsTypingIssue] = useState(false);
  const [isTypingTerminalIn, setIsTypingTerminalIn] = useState(false);
  const [isTypingTerminalOut, setIsTypingTerminalOut] = useState(false);
  const [isTypingWorkspace, setIsTypingWorkspace] = useState(false);

  // State variables for controlling if terminal, editor are expanded
  const [isEditorExpanded, setIsEditorExpanded] = useState(false);
  const [isIssueExpanded, setIsIssueExpanded] = useState(false);
  const [isSubmissionExpanded, setIsSubmissionExpanded] = useState(false);
  const [isTerminalExpanded, setIsTerminalExpanded] = useState(false);

  // References for controlling scrolling messages into view
  const terminalRef = useRef(null);
  const workspaceRef = useRef(null);

  // Handler function to update selected trajectory
  const handleSelectChange = (event, resetSameID = false) => {
    if (!resetSameID && (event.target.value === selectedTrajID)) return;

    var selectedInstanceId = selectedTrajID;
    if (!resetSameID) selectedInstanceId = event.target.value;

    const selectedDataItem = data.find(item => item.instance_id === selectedInstanceId);
    setEditorOutput('');
    setFileName('📄 [No Open File]')
    setFileStartLine(0);
    setSelectedTraj(selectedDataItem);
    setSelectedTrajID(selectedInstanceId);
    setTerminalAction('');
    setTerminalOutput('');
    setThoughts([]);
    setStepIdx(0);
  };

  // Handler function for clicks
  useEffect(() => {
    const step = selectedTraj.history[stepIdx];
    if (step.type === "thought") {
      setThoughts([...thoughts, step.thought]);
      setTerminalAction('');
      setTerminalOutput('');
    } else if (step.type === "action") {
      setTerminalAction(step.action);
      setFileStartLine(step.open_file_start_line);
    } else if (step.type === "output") {
      setEditorOutput(step.output_editor);
      setTerminalOutput(step.output_terminal);
      if (step.open_file.length > 0 && `📄 ${step.open_file}` !== fileName) {
        setFileName(`📄 ${step.open_file}`);
      }
    }
  }, [stepIdx])

  // Handler function to move to next step
  const handleNextClick = async () => {
    if (stepIdx >= selectedTraj.history.length - 1) return;
    setStepIdx(stepIdx + 1);
  }

  // Keyboard event handler function
  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight" && !isTyping && !isSubmissionExpanded) {
      handleNextClick();
    }
  };

  // Set isTyping to true only if all typing statuses are true
  useEffect(() => {
    setIsTyping(isTypingEditorOut || isTypingFileName || isTypingIssue ||
      isTypingTerminalIn || isTypingTerminalOut || isTypingWorkspace);
  }, [isTypingEditorOut, isTypingFileName, isTypingTerminalIn,
    isTypingTerminalOut, isTypingWorkspace, isTypingIssue]);
  
  // Add event listener for keyboard events
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNextClick]);

  return (
    <div className="container-demo">
      <hr />
      <div id="demo">
        <div id="selectTraj">
          <label htmlFor="selectTraj">
            {instanceToLogo(selectedTraj)}
          </label>
          <select value={selectedTrajID} onChange={handleSelectChange}>
            {data.map((item, index) => (
              <option key={index} value={item.instance_id}>
                {instanceToSelectOption(item)}
              </option>
            ))}
          </select>
        </div>
        <hr />
        <div className="panels">
          <WorkspacePanel
            isIssueExpanded={isIssueExpanded}
            selectedTraj={selectedTraj}
            setIsIssueExpanded={setIsIssueExpanded}
            setIsTypingIssue={setIsTypingIssue}
            setIsTypingWorkspace={setIsTypingWorkspace}
            stepIdx={stepIdx}
            thoughts={thoughts}
            workspaceRef={workspaceRef}
          />
          <TerminalPanel
            isTerminalExpanded={isTerminalExpanded}
            setIsTerminalExpanded={setIsTerminalExpanded}
            setIsTypingTerminalIn={setIsTypingTerminalIn}
            setIsTypingTerminalOut={setIsTypingTerminalOut}
            terminalAction={terminalAction}
            terminalOutput={terminalOutput}
            terminalRef={terminalRef}
          />
          <EditorPanel
            editorOutput={editorOutput}
            fileName={fileName}
            fileStartLine={fileStartLine}
            isEditorExpanded={isEditorExpanded}
            setIsEditorExpanded={setIsEditorExpanded}
            setIsTypingFileName={setIsTypingFileName}
            setIsTypingEditorOut={setIsTypingEditorOut}
          />
        </div>
        <div className="controls">
          <button
            className="float-button"
            disabled={isTyping || isSubmissionExpanded}
            onClick={() => handleSelectChange(null, true)}
          >
            ↺ Reset
          </button>
          <button
            className={`float-button ${stepIdx === selectedTraj.history.length - 1 ? 'hidden' : ''}`}
            disabled={isTyping || isSubmissionExpanded || stepIdx === selectedTraj.history.length}
            onClick={handleNextClick}
          >
            Next Step →
          </button>
          <button
            className={`float-button ${stepIdx !== selectedTraj.history.length - 1 ? 'hidden' : ''}`}
            disabled={isTyping || isSubmissionExpanded}
            onClick={() => setIsSubmissionExpanded(true)}
          >
            % Results
          </button>
          <span style={{ margin: "0 1em" }}>
            # Turn {stepIdx} / {selectedTraj.history.length - 1}
          </span>
        </div>
      </div>
      <Submission
        isOpen={isSubmissionExpanded}
        setIsOpen={setIsSubmissionExpanded}
        selectedTraj={selectedTraj}
      />
      <hr />
    </div>
  );
};

export default Demo;