import React from "react";
import { render } from "react-dom";
import CodeInfoPanel from "./CodeInfoPanel";

const createAndAttachInfo = {
  title: "Create and attach a Volume",
  summary:
    "Leverage the Linode API to dynamically create Volumes and attach them to Linode instances. You can use cURL to access the API from your command line, or take advantage of our API's Python bindings.\n\
If you use Terraform to provision your infrastructure, you can use the `linode_volume` resource to entirely manage your Volumes from within your Terraform plan.",
  links: [
    {
      href: "https://developers.linode.com/api/v4/",
      title: "Linode API Reference"
    }
  ],
  codeExamples: [
    {
      name: "cURL",
      extraLinks: [],
      snippet:
        'curl -H "Content-Type: application/jsonType" \\\n\
  -H "Authorization: Bearer $token" \\\n\
  -X POST -d \'{ \\\n\
    "label": "my-volume", \\\n\
    "size": 100, \\\n\
    "region": "us-east", \\\n\
    "linode_id": 1234567 \\\n\
  }\' \\\n\
  https://api.linode.com/v4/volumes'
    },
    {
      name: "CLI",
      extraLinks: [],
      snippet:
        'linode-cli volumes create \\\n\
  --label "my-volume" \\\n\
  --size "100" \\\n\
  --region "us-east" \\\n\
  --linode_id "1234567"'
    },
    {
      name: "Python",
      extraLinks: [],
      snippet: "Python\n\
my-volume\n\
    world"
    },
    {
      name: "Terraform",
      extraLinks: [
        {
          href:
            "https://linode.com/docs/applications/configuration-management/beginners-guide-to-terraform/",
          title: "A Beginner's Guide to Terraform"
        }
      ],
      snippet:
        'resource "linode_volume" "my-volume" {\n\
  label = "my-volume"\n\
  size = "100"\n\
  region = "${linode_instance.my-linode.region}"\n\
  linode_id = "${linode_instance.my-linode.id}"\n\
}'
    }
  ]
};

render(
  <div>
    {[createAndAttachInfo, createAndAttachInfo].map((exampleInfo, index) => (
      <div key={index} style={{ marginBottom: "40px" }}>
        <CodeInfoPanel key={exampleInfo.title} codeInfo={exampleInfo} />
      </div>
    ))}
  </div>,
  document.getElementById("root")
);
