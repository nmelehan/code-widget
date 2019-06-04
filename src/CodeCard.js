import React from "react";

class CodeCard extends React.Component {
  render() {
    return (
      <div className="codeCard">
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
        <p>{this.props.codeExampleSnippet}</p>
      </div>
    );
  }
}

export default CodeCard;
