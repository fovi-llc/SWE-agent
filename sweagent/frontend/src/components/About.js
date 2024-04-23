import React, { useEffect } from 'react';
import ReactPlayer from 'react-player'

import "../static/about.css";
import "../static/button.css";

import logo from '../assets/logo.png';
import codeIcon from '../assets/link_icons/code.png';
import dataIcon from '../assets/link_icons/data.png';
import paperIcon from '../assets/link_icons/paper.png';
import pliIcon from '../assets/pli.png';
import princeton_seal from '../assets/princeton_seal.svg';

import Citation from './utils/citation';
import ResultsChart from './utils/results';

function About() {
  const resources = [
    {
      href: "https://github.com/princeton-nlp/SWE-agent",
      icon: codeIcon,
      alt: "code",
      text: "Code",
    },
    {
      href: "", // Put the correct link here
      icon: dataIcon,
      alt: "data",
      text: "Data",
    },
    {
      href: "",
      icon: paperIcon,
      alt: "paper",
      text: "Paper (Coming Soon)",
    },
  ];

  const renderResources = resources.map((button, index) => (

    <a href={button.href} target="_blank" rel="noopener noreferrer" key={index}>
      <button className="float-button">
        <div style={{fontSize: "1.2em", display: "flex", alignItems: "center"}}>
        <img src={button.icon} alt={button.alt} /> {button.text}
        </div>
      </button>
    </a>
  ));

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(`/api/get_demo_trajs`);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    // Check if trajs exists in assets
    loadData()
  }, [])

  return (
    <div className="container-about about">
      <hr />
      <div id="title">
        <img src={logo} alt="logo" id="title-image"/>
        <h3 style={{ marginBottom: 0 }}>
          Agent Computer Interfaces Enable Software Engineering Language Models
        </h3>
        <p style={{ marginBottom: 0, textAlign: "center" }}>
          John Yang*, Carlos E. Jimenez*, Alexander Wettig,<br />
          Kilian Lieret, Shunyu Yao, Karthik Narasimhan, Ofir Press
        </p>
        <p style={{ marginBottom: 0 }}>
          <span style={{ color: "#ff8f00" }}>Princeton University</span>&nbsp;
          <img src={princeton_seal} alt="Princeton University Seal" style={{ height: '1em', width: 'auto', verticalAlign: 'middle', marginBottom: '0.25em' }} />
          &nbsp;&bull;&nbsp;
          <span style={{ color: "#0000ff" }}>Princeton Language & Intelligence</span>&nbsp;
          <img src={pliIcon} alt="PLI" style={{ height: '1em', width: 'auto', verticalAlign: 'middle', marginBottom: '0.25em' }} />
        </p>
      </div>
      <div id="resources" style={{ margin: '1.5em 0' }}>
        {renderResources}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ReactPlayer url='https://www.youtube.com/watch?v=CeMtJ4XObAM' controls />
      </div>
      <p>
        <b>SWE-agent</b> turns LMs (e.g. GPT-4) into software engineering agents that can fix bugs and issues in real GitHub repositories.
      </p>
      <div style={{
        backgroundColor: '#ebe6ea',
        display: 'flex',
        justifyContent: 'center',
        padding: '0 1.5em',
      }}>
        <p>
        🎉 On the full <a href="https://github.com/princeton-nlp/SWE-bench">SWE-bench</a> test set, SWE-agent fixes <u><b>12.47%</b></u> of issues, the new state-of-the-art result on the full test set.
        </p>
      </div>
      <p>
        We accomplish these results by designing simple LM-centric commands and specially-built input and output formats to make it easier for the LM to browse the repository, view, edit and execute code files. We call this <u><b>Agent-Computer Interface (ACI)</b></u> and build the SWE-agent repository to make it easy to iterate on ACI design for repository-level coding agents.
      </p>
      <div style={{ margin: '1.5em 0 2em 0' }}>
        <ResultsChart />
      </div>
      <Citation />
      <hr />
    </div>
  );
}

export default About;
