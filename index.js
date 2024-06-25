const fs = require("fs");
let input = fs.readFileSync("contacts.vcf").toString().split("\r\n");
let output = [["Name", "Mobile", "Home"]];
let currentContact;
input.forEach((line) => {
  if (line.startsWith("BEGIN")) {
    currentContact = { name: "", mobile: "", home: "" };
  }

  if (line.startsWith("FN")) {
    currentContact.name = line.substring(3);
  }

  if (line.startsWith("TEL;CELL:")) {
    currentContact.mobile = line.substring(9);
  }

  if (line.startsWith("TEL;HOME:") || line.startsWith("TEL;VOICE")) {
    currentContact.home = line.substring(9);
  }

  if (line.startsWith("END")) {
    output.push([
      currentContact.name,
      currentContact.mobile,
      currentContact.home,
    ]);
  }
});

console.debug(output);

fs.writeFileSync("contacts.csv", output.join("\r\n"));
