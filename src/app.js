import React from "react";
import { render } from "react-dom";
import CodeInfoPanel from "./CodeInfoPanel";

const createAndAttachInfo = {
  title: "Create and attach a Volume",
  summary:
    "Leverage the Linode API to dynamically create Volumes and attach them to Linode instances. You can use cURL to access the API from your command line, or take advantage of our API's Python bindings.\n\
  If you use Terraform to provision your infrastructure, you can use the `linode_volume` resource to entirely manage your Volumes from within your Terraform plan.",
  links: [
    { href: "https://developers.linode.com/api/v4/", title: "API Reference" }
  ],
  codeExamples: [
    {
      name: "Bash",
      extraLinks: [],
      snippet: "Bash\n\
{volumeName}\n\
    world",
      replacements: [
        {
          label: "Volume Name",
          placeholderText: "volumeName",
          example: "my-volume",
          regex: { string: "^[a-z0-9]+$", flags: "i" }
        }
      ]
    },
    {
      name: "CLI",
      extraLinks: [],
      snippet: "CLI\n\
{volumeName}\n\
    world",
      replacements: [
        {
          label: "Volume Name",
          placeholderText: "volumeName",
          example: "my-volume",
          regex: { string: "^[a-z0-9]+$", flags: "i" }
        }
      ]
    },
    {
      name: "Python",
      extraLinks: [],
      snippet: "Python\n\
{volumeName}\n\
    world",
      replacements: [
        {
          label: "Volume Name",
          placeholderText: "volumeName",
          example: "my-volume",
          regex: { string: "^[a-z0-9]+$", flags: "i" }
        }
      ]
    },
    {
      name: "Terraform",
      extraLinks: [],
      snippet: "Terraform\n\
{volumeName}\n\
world",
      replacements: [
        {
          label: "Volume Name",
          placeholderText: "volumeName",
          example: "my-volume",
          regex: { string: "^[a-z0-9]+$", flags: "i" }
        }
      ]
    }
  ]
};

render(
  // <div />,
  <div>
    {[createAndAttachInfo].map(exampleInfo => (
      <CodeInfoPanel key={exampleInfo.title} codeInfo={exampleInfo} />
    ))}
  </div>,
  document.getElementById("root")
);
