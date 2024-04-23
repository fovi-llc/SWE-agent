import React from "react";

import issueLogo from '../../assets/panel_icons/issue.png';

import CustomModal from "../CustomModal";
import Message from '../Message';

const IssuePanel = ({
  isIssueExpanded,
  selectedTraj,
  setIsIssueExpanded,
  setIsTypingIssue,
  stepIdx,
}) => {
  let inst_id = selectedTraj.instance_id.replace('__', '/');
  let lastHyphenIndex = inst_id.lastIndexOf('-');
  let repo = inst_id.substring(0, lastHyphenIndex);
  let id = inst_id.substring(lastHyphenIndex + 1);
  let prURL = `http://github.com/${repo}/pull/${id}`;

  let date = new Date(selectedTraj.created_at);
  let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed; add 1
  let day = date.getDate().toString().padStart(2, '0');
  let year = date.getFullYear();
  let formattedDate = `${month}/${day}/${year}`;

  let issueTitle = selectedTraj.issue_text.split("\n")[0].trim();
  let issueText = selectedTraj.issue_text.split("\n").slice(1).join("\n").trim();
  let issueNum = selectedTraj.issue_url.split("/").pop();
  let issueURL = selectedTraj.issue_url;

  return (
    <>
      <div
        style={{
          backgroundColor: '#ebe6ea',
          borderRadius: '0.5em 0.5em 0 0'
        }}
      >
        <div
          style={{
            color: "white",
            cursor: "pointer",
            backgroundColor: "black",
            borderRadius: "0.25em",
            display: 'flex',
            flexDirection: 'column',
            margin: "0.75em",
            paddingLeft: '1em',
          }}
          onClick={() => setIsIssueExpanded((prev) => !prev)}
        >
          <div style={{ margin: '0.5em 0' }}>
            <div style={{
              alignItems: 'center',
              alignSelf: 'flex-start',
              display: 'flex',
              flexDirection: 'row',
              maxWidth: 'calc(100% - 1em)',
            }}>
              <img src={issueLogo} alt="issue" style={{width: 'auto', height: '1em', marginRight: '0.35em'}}/>
              <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {issueTitle}
              </div>
            </div>
            <div style={{ fontSize: 'smaller', color: 'gray', marginTop: '0.5em' }}>
              #{issueNum} opened {formattedDate}
            </div>
          </div>
        </div>
        {stepIdx === 0 && (
          <>
          <h3 style={{ margin: "0 0.75em 0.25em 0.75em" }}>Issue Description</h3>
          <a href={issueURL} target="_blank" rel="noreferrer" style={{ marginLeft: "1em" }}>Issue Link</a>
          &nbsp;&bull;&nbsp;
          <a href={prURL} target="_blank" rel="noreferrer">Pull Request Link</a>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0.25em 0'}}>
            <hr style={{borderTop: "0.15em dotted #8aa1a6", width: "95%"}} />
          </div>
          <Message
            animationType="type-lines"
            customStyle={{ backgroundColor: 'transparent' }}
            isCode
            text={issueText}
            textStyle={{ fontFamily: 'basic-sans', textShadow: 'none' }}
            style={{ padding: "0em 0.5em" }}
            language="markdown"
            onTypingEnd={() => setIsTypingIssue(false)}
            onTypingStart={() => setIsTypingIssue(true)}
          />
          </>
        )}
      </div>
      <CustomModal
        isOpen={isIssueExpanded}
        onConfirm={() => setIsIssueExpanded(false)}
        content={
          <Message
            animationType="type-lines"
            isCode
            text={selectedTraj.issue_text}
            language="markdown"
            onTypingEnd={() => setIsTypingIssue(false)}
            onTypingStart={() => setIsTypingIssue(true)}
          />
        }
        customStyles={{content: {backgroundColor: '#f5f2f0', width: '70%'}}}
      />
    </>
  )
}

export default IssuePanel;