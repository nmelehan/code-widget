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
      href:
        "https://linode.com/docs/platform/api/create-block-storage-volumes-with-the-linode-api/",
      title: "Manage Block Storage Volumes with the Linode API"
    },
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
      extraLinks: [
        {
          href: "https://linode.com/docs/platform/api/using-the-linode-cli/",
          title: "Using the Linode CLI"
        }
      ],
      snippet:
        'linode-cli volumes create \\\n\
  --label "my-volume" \\\n\
  --size "100" \\\n\
  --region "us-east" \\\n\
  --linode_id "1234567"'
    },
    {
      name: "Python",
      extraLinks: [
        {
          href:
            "https://www.linode.com/docs/platform/api/how-to-create-an-oauth-app-with-the-linode-python-api-library/",
          title: "linode_api4-python on GitHub"
        }
      ],
      snippet:
        "from linode_api4 import LinodeClient\n\
client = LinodeClient(token)\n\
client.volume_create('my-volume',\n\
  linode=1234567,\n\
  size=100)"
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

const mountAttachedVolumeInfo = {
  title: "Mount an attached Volume",
  summary:
    "After you attach a Volume to a Linode instance, format it and mount it from inside the instance. This makes the Volume's filesystem available to you.\n\
You can issue a few commands from your SSH connection to mount your Volume. If you use a configuration management tool like Salt, Ansible, or Puppet for your instances, you can also manage this mount from your formulas, playbooks, and modules.",
  links: [
    {
      href:
        "https://linode.com/docs/platform/block-storage/how-to-use-block-storage-with-your-linode/",
      title: "How to Use Block Storage"
    }
  ],
  codeExamples: [
    {
      name: "Bash",
      extraLinks: [],
      snippet:
        'mkfs.ext4 "/dev/disk/by-id/scsi-0Linode_Volume_my-volume"\n\
​​​​​​​mkdir "/mnt/my-volume"\n\
echo "/dev/disk/by-id/scsi-0Linode_Volume_my-volume /mnt/my-volume ext4 defaults,noatime,nofail 0 2" \\\n\
  | tee -a /etc/fstab\n\
mount /mnt/my-volume'
    },
    {
      name: "Salt",
      extraLinks: [
        {
          href:
            "https://linode.com/docs/applications/configuration-management/beginners-guide-to-salt/",
          title: "A Beginner's Guide to Salt"
        }
      ],
      snippet:
        "bsvolume:\n\
  blockdev.formatted:\n\
    - name: /dev/disk/by-id/scsi-0Linode_Volume_my-volume\n\
    - fs_type: ext4\n\
\n\
  mount.mounted:\n\
    - name: /mnt/my-volume\n\
    - device: /dev/disk/by-id/scsi-0Linode_Volume_my-volume\n\
    - fstype: ext4\n\
    - opts: defaults,noatime,nofail\n\
    - pass_num: 2\n\
    - mkmnt: True\n\
    - require:\n\
      - blockdev: bsvolume"
    },
    {
      name: "Ansible",
      extraLinks: [
        {
          href:
            "https://linode.com/docs/applications/configuration-management/automatically-configure-servers-with-ansible-and-playbooks/",
          title: "Automatically Configure Servers with Ansible"
        }
      ],
      snippet:
        "- name: format the volume\n\
  filesystem:\n\
    fstype: ext4\n\
    dev: /dev/disk/by-id/scsi-0Linode_Volume_my-volume\n\
\n\
- name: mount the volume\n\
  mount:\n\
    path: /mnt/my-volume\n\
    src: /dev/disk/by-id/scsi-0Linode_Volume_my-volume\n\
    fstype: ext4\n\
    opts: defaults,noatime,nofail\n\
    passno: 2\n\
    state: mounted"
    },
    {
      name: "Puppet",
      extraLinks: [
        {
          href:
            "https://linode.com/docs/applications/configuration-management/getting-started-with-puppet-6-1-basic-installation-and-setup/",
          title: "Getting Started with Puppet"
        }
      ],
      snippet:
        'include lvm\n\
\n\
filesystem { "/dev/disk/by-id/scsi-0Linode_Volume_my-volume":\n\
  ensure  => present,\n\
  fs_type => "ext4",\n\
}\n\
\n\
file { "/mnt/my-volume":\n\
  ensure  => "directory",\n\
}\n\
\n\
mount { "/mnt/my-volume":\n\
  ensure  => mounted,\n\
  device  => "/dev/disk/by-id/scsi-0Linode_Volume_my-volume",\n\
  fstype  => "ext4",\n\
  options => "defaults,noatime,nofail",\n\
  pass    => 2,\n\
  require => [\n\
    Filesystem["/dev/disk/by-id/scsi-0Linode_Volume_my-volume"],\n\
    File["/mnt/my-volume"],\n\
  ],\n\
}'
    }
  ]
};

render(
  <div>
    {/* Use the CodeInfoPanel component and pass it a codeInfo object.

        The divs that wrap around the component here are just used to add
        some spacing/margin between the components in this example. */}
    <div key={createAndAttachInfo.title} style={{ marginBottom: "40px" }}>
      <CodeInfoPanel codeInfo={createAndAttachInfo} />
    </div>

    <div key={mountAttachedVolumeInfo.title} style={{ marginBottom: "40px" }}>
      <CodeInfoPanel codeInfo={mountAttachedVolumeInfo} />
    </div>
  </div>,
  document.getElementById("root")
);
