import React from "react";

class CodeExampleCard extends React.Component {
  render() {
    return (
      <div className="codeExampleCard">
        <div className="buttonContainer">
          {this.props.codeExampleNames.map((name, index) => (
            <button
              value={index}
              key={name}
              onClick={this.props.handleExampleChange}
              className={index === this.props.activeExample ? "active" : ""}
            >
              {name}
            </button>
          ))}
        </div>
        <pre>
          <code>{this.props.codeExampleSnippet}</code>
        </pre>
      </div>
    );
  }
}

export default CodeExampleCard;
