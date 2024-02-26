const { name, homepage } = require("./package.json");

throw new Error(
  `${name} is a collection of CloudFormation templates, and is not meant to be imported as JavaScript. Please see ${homepage} for usage information.`,
);
