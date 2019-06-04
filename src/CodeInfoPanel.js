import React from "react";
import CodeExampleCard from "./CodeExampleCard";

class CodeInfoPanel extends React.Component {
  state = {
    activeExample: 0
  };
  handleTitleClick = event => {};
  handleExampleChange = event => {
    this.setState({ activeExample: +event.target.value });
  };
  links = () => {
    return this.props.codeInfo.links.concat(
      this.props.codeInfo.codeExamples[this.state.activeExample].extraLinks
    );
  };
  render() {
    return (
      <div className="codeInfoPanelWrapper">
        <div className="codeInfoPanel">
          <div className="codeInfoCardWrapper">
            <div className="codeInfoCard">
              <h1>{this.props.codeInfo.title}</h1>
              {this.props.codeInfo.summary
                .split("\n")
                .map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}

              {this.links().map((link, index) => (
                <a key={link.href} className="externalLink" href={link.href}>
                  {link.title}
                </a>
              ))}
            </div>
          </div>
          <div className="codeExampleCardWrapper">
            <CodeExampleCard
              codeExampleNames={this.props.codeInfo.codeExamples.map(
                example => example.name
              )}
              codeExampleSnippet={
                this.props.codeInfo.codeExamples[this.state.activeExample]
                  .snippet
              }
              activeExample={this.state.activeExample}
              handleExampleChange={this.handleExampleChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CodeInfoPanel;
