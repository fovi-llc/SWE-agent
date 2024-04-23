import '../..//static/citation.css'
import copyIcon from '../../assets/copy.png';

function Citation() {
    const bibtexEntry = `@misc{yang2024sweagent,
      title={SWE-agent: Agent Computer Interfaces Enable Software Engineering Language Models},
      author={John Yang and Carlos E. Jimenez and Alexander Wettig and Kilian Lieret and Shunyu Yao and Karthik Narasimhan and Ofir Press},
      year={2024},
}`;
  
    // Function to copy the citation to the clipboard
    const copyToClipboard = () => {
      navigator.clipboard.writeText(bibtexEntry).then(() => {
      }, (err) => {
        console.error('Could not copy text: ', err);
      });
    };
  
    return (
      <>
        <p>
          If you find our work helpful, please use the following citation.
        </p>
        <div id="citation">
          <pre>
            {bibtexEntry}
          </pre>
          <button onClick={copyToClipboard}>
            <img src={copyIcon} alt="copy" />
          </button>
        </div>
        <p>
          Correspondence to:
          &#123;<a href="mailto:jy1682@princeton.edu">jy1682</a>,
          <a href="mailto:carlosej@princeton.edu">carlosej</a>&#125;
          @princeton.edu
        </p>
      </>
    );
}

export default Citation;