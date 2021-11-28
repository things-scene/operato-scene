const { readdirSync, existsSync } = require("fs");
const path = require("path");
const { camelCase, startCase } = require("lodash");
const { plural } = require("pluralize");
const { version } = require("./lerna.json");

const packages = getPackages("packages");
const guides = readdirSync(path.join(__dirname, "docs")).map((filename) => {
  return {
    title: startCase(filename.replace(".md", "")),
    name: filename,
  };
});

module.exports = function (plop) {
  plop.setGenerator("module", {
    description: "Create a new common module from scratch",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What should this module's name be? Ex. menu",
        validate: validatePackageName,
        filter: plop.getHelper("kebabCase"),
      },
      {
        type: "input",
        name: "description",
        message: "What should this module's description be?",
        filter: stripDescription,
      },
    ],
    actions: [
      {
        type: "addMany",
        destination: "packages/{{name}}",
        base: "templates/module",
        templateFiles: "templates/module/**/*",
        force: false,
        data: {
          version,
        },
      },
    ],
  });

  plop.setGenerator("scene-module", {
    description: "Create a new scene-module from the scratch",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What should this module's name be? Ex. scene-random",
        validate: validatePackageName,
        filter: plop.getHelper("kebabCase"),
      },
      {
        type: "input",
        name: "description",
        message: "What should this module's description be?",
        filter: stripDescription,
      },
    ],
    actions: [
      {
        type: "addMany",
        destination: "packages/{{name}}",
        base: "templates/scene-module",
        templateFiles: "templates/scene-module/**/*",
        force: false,
        data: {
          version,
        },
      },
    ],
  });

  plop.setGenerator("scene-component", {
    description: "Generate scene-component from the scratch",
    prompts: [
      {
        type: "input",
        name: "packageName",
        message: "What is target package's name? Ex. switch",
        validate: validatePackageName,
        filter: plop.getHelper("kebabCase"),
      },
      {
        type: "input",
        name: "name",
        message: "What should this component's name be? Ex. button",
        validate: validatePackageName,
        filter: plop.getHelper("kebabCase"),
      },
    ],
    actions: [
      {
        type: "add",
        path: "packages/{{packageName}}/src/{{name}}.js",
        templateFile: "templates/scene-component/component.js.hbs",
        force: false,
      },
      {
        type: "modify",
        path: "packages/{{packageName}}/src/index.js",
        transform: (file, { name }) => {
          const pascalCaseName = startCase(camelCase(name)).replace(/ /g, "");
          return file.replace(
            /$/,
            `\nexport { default as ${pascalCaseName} } from './${name}'`
          );
        },
      },
    ],
  });

  plop.setGenerator("scene-html-component", {
    description: "Generate html base scene component from the scratch",
    prompts: [
      {
        type: "input",
        name: "packageName",
        message: "What is target package's name? Ex. switch",
        validate: validatePackageName,
        filter: plop.getHelper("kebabCase"),
      },
      {
        type: "input",
        name: "name",
        message: "What should this component's name be? Ex. button",
        validate: validatePackageName,
        filter: plop.getHelper("kebabCase"),
      },
    ],
    actions: [
      {
        type: "add",
        path: "packages/{{packageName}}/src/{{name}}.js",
        templateFile: "templates/scene-html-component/component.js.hbs",
        force: false,
      },
      {
        type: "modify",
        path: "packages/{{packageName}}/src/index.js",
        transform: (file, { name }) => {
          const pascalCaseName = startCase(camelCase(name)).replace(/ /g, "");
          return file.replace(
            /$/,
            `\nexport { default as ${pascalCaseName} } from './${name}'`
          );
        },
      },
    ],
  });

  plop.setGenerator("scene-data-source", {
    description: "Generate data source scene component from the scratch",
    prompts: [
      {
        type: "input",
        name: "packageName",
        message: "What is target package's name? Ex. switch",
        validate: validatePackageName,
        filter: plop.getHelper("kebabCase"),
      },
      {
        type: "input",
        name: "name",
        message: "What should this component's name be? Ex. button",
        validate: validatePackageName,
        filter: plop.getHelper("kebabCase"),
      },
    ],
    actions: [
      {
        type: "add",
        path: "packages/{{packageName}}/src/{{name}}.js",
        templateFile: "templates/scene-data-source/component.js.hbs",
        force: false,
      },
      {
        type: "add",
        path: "packages/{{packageName}}/src/{{name}}.png",
        templateFile: "templates/scene-data-source/component.png",
        force: false,
      },
      {
        type: "modify",
        path: "packages/{{packageName}}/src/index.js",
        transform: (file, { name }) => {
          const pascalCaseName = startCase(camelCase(name)).replace(/ /g, "");
          return file.replace(
            /$/,
            `\nexport { default as ${pascalCaseName} } from './${name}'`
          );
        },
      },
    ],
  });

  plop.setGenerator("scene-data-transform", {
    description: "Generate data transform scene component from the scratch",
    prompts: [
      {
        type: "input",
        name: "packageName",
        message: "What is target package's name? Ex. switch",
        validate: validatePackageName,
        filter: plop.getHelper("kebabCase"),
      },
      {
        type: "input",
        name: "name",
        message: "What should this component's name be? Ex. button",
        validate: validatePackageName,
        filter: plop.getHelper("kebabCase"),
      },
    ],
    actions: [
      {
        type: "add",
        path: "packages/{{packageName}}/src/{{name}}.js",
        templateFile: "templates/scene-data-transform/component.js.hbs",
        force: false,
      },
      {
        type: "add",
        path: "packages/{{packageName}}/src/{{name}}.png",
        templateFile: "templates/scene-data-transform/component.png",
        force: false,
      },
      {
        type: "modify",
        path: "packages/{{packageName}}/src/index.js",
        transform: (file, { name }) => {
          const pascalCaseName = startCase(camelCase(name)).replace(/ /g, "");
          return file.replace(
            /$/,
            `\nexport { default as ${pascalCaseName} } from './${name}'`
          );
        },
      },
    ],
  });

  plop.setGenerator("scene-container", {
    description: "Generate container scene component from the scratch",
    prompts: [
      {
        type: "input",
        name: "packageName",
        message: "What is target package's name? Ex. switch",
        validate: validatePackageName,
        filter: plop.getHelper("kebabCase"),
      },
      {
        type: "input",
        name: "name",
        message: "What should this container component's name be? Ex. button",
        validate: validatePackageName,
        filter: plop.getHelper("kebabCase"),
      },
    ],
    actions: [
      {
        type: "add",
        path: "packages/{{packageName}}/src/{{name}}.js",
        templateFile: "templates/scene-container/component.js.hbs",
        force: false,
      },
      {
        type: "modify",
        path: "packages/{{packageName}}/src/index.js",
        transform: (file, { name }) => {
          const pascalCaseName = startCase(camelCase(name)).replace(/ /g, "");
          return file.replace(
            /$/,
            `\nexport { default as ${pascalCaseName} } from './${name}'`
          );
        },
      },
    ],
  });

  plop.setGenerator("help", {
    description: "Generate inline help page",
    prompts: [
      {
        type: "input",
        name: "packageName",
        message: "What is target package's name? Ex. biz-base, operato-mms",
        validate: validatePackageName,
        filter: plop.getHelper("kebabCase"),
      },
      {
        type: "input",
        name: "topic",
        message:
          "What should this help page's topic be? Ex. integration/adapter/mqtt",
      },
    ],
    actions: [
      {
        type: "add",
        path: "packages/{{packageName}}/helps/{{topic}}.md",
        templateFile: "templates/help/template.md.hbs",
        force: false,
      },
    ],
  });

  plop.setGenerator("docs", {
    description: "Generate root repo documentation",
    prompts: [],
    actions: [
      {
        type: "add",
        path: "README.md",
        templateFile: "templates/docs/ROOT_README.hbs.md",
        force: true,
        data: { packages, guides },
      },
    ],
  });
};

function getPackages(type = "packages") {
  const packagesPath = path.join(__dirname, type);

  return readdirSync(packagesPath).reduce((acc, packageName) => {
    const packageJSONPath = path.join(
      packagesPath,
      packageName,
      "package.json"
    );

    if (existsSync(packageJSONPath)) {
      const { name, description } = require(packageJSONPath);

      acc.push({ name: name.replace("@operato/", ""), description });
    }

    return acc;
  }, []);
}

function validatePackageName(name) {
  return (
    /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/g.test(
      `@operato/${name}`
    ) || `Your package name (@operato/${name}) does not confirm to npm rules!`
  );
}

function stripDescription(desc) {
  return desc.replace(/[.\s]*$/g, "").replace(/^\s*/g, "");
}
