import React from "react";
import CodeCard from "./CodeCard";

class CodeInfoPanel extends React.Component {
  state = {
    activeExample: 0,
    replacements: [
      {
        label: "Volume Name",
        placeholderText: "volumeName",
        example: "hello",
        regex: { string: "^[a-z0-9]+$", flags: "i" }
      }
    ]
  };
  handleExampleChange = event => {
    this.setState({ activeExample: +event.target.value });
    console.log(event.target.value);
  };
  currentSnippet = () => {
    let snippet = this.props.codeInfo.codeExamples[this.state.activeExample]
      .snippet;

    console.log(this.state.replacements);
    console.log(this.props.codeInfo.codeExamples[this.state.activeExample]);

    let replacements = this.state.replacements;
    replacements.forEach(replacement => {
      snippet = snippet.replace(
        `{${replacement.placeholderText}}`,
        replacement.example
      );
    });

    replacements = this.props.codeInfo.codeExamples[this.state.activeExample]
      .replacements;
    replacements.forEach(replacement => {
      snippet = snippet.replace(
        `{${replacement.placeholderText}}`,
        replacement.example
      );
    });

    return snippet;
  };
  render() {
    return (
      <div>
        <p>{this.props.codeInfo.title}</p>
        {this.props.codeInfo.summary.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        {this.props.codeInfo.links.map((link, index) => (
          <p key={index}>
            <a href={link.href}>{link.title}</a>
          </p>
        ))}
        <CodeCard
          codeExampleNames={this.props.codeInfo.codeExamples.map(
            example => example.name
          )}
          codeExampleSnippet={this.currentSnippet()}
          activeExample={this.state.activeExample}
          handleExampleChange={this.handleExampleChange}
        />
        {this.props.codeInfo.codeExamples[
          this.state.activeExample
        ].replacements.map(replacement => (
          <label htmlFor="replacementText">
            Location
            <input
              id="location"
              // onChange={context.handleLocationChange}
              // value={context.location}
              placeholder={replacement.example}
            />
          </label>
        ))}
      </div>
    );
  }
}

export default CodeInfoPanel;
