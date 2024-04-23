import CustomModal from "./CustomModal"
import Message from "./Message"

const Submission = ({
    isOpen,
    setIsOpen,
    selectedTraj,
}) => {
    return (
        <CustomModal
            customStyles={{content: {backgroundColor: '#f5f2f0'}}}
            id="submission"
            isOpen={isOpen}
            onConfirm={() => setIsOpen(false)}
            content={
                <>
                    <h3 style={{ marginBottom: '0.25em' }}>Submission</h3>
                    <Message
                        animationType="fade-in-cascade"
                        isCode
                        style={{ margin: '0'}}
                        text={selectedTraj.submission}
                        language="bash"
                    />
                    <h3>Testing</h3>
                    <p style={{ marginBottom: '0.5em' }}>
                        <i>Fail to Pass (F2P)</i>
                    </p>
                    <Message
                        animationType="fade-in-cascade"
                        style={{ borderRadius: '0em' }}
                        text={
                            <>
                            {selectedTraj.pass_f2p.map((test, i) => (
                                <div key={i}>✅ {test}</div>))}
                            {selectedTraj.fail_f2p.map((test, i) => (
                                <div key={i}>❌ {test}</div>))}
                            </>
                        }
                    />
                    <p style={{ marginBottom: '0.5em' }}>
                        <i>Pass to Pass (P2P)</i>
                    </p>
                    <Message
                        animationType="fade-in-cascade"
                        style={{ borderRadius: '0em' }}
                        text={
                            <>
                            {selectedTraj.pass_p2p.map((test, i) => (
                                <div key={i}>✅ {test}</div>))}
                            {selectedTraj.fail_p2p.map((test, i) => (
                                <div key={i}>❌ {test}</div>))}
                            </>
                        }
                    />
                    <h3 style={{ marginBottom: '0.25em' }}>Overall</h3>
                    &emsp; {selectedTraj.generated ? "✅" : "❌"} Generated<br />
                    &emsp; {selectedTraj.applied ? "✅" : "❌"} Applied<br />
                    &emsp; {selectedTraj.resolved ? "✅" : "❌"} Resolved
                    <br /><br />
                </>
            }
        />
    )
}

export default Submission;