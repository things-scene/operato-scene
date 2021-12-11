[comment]: # "NOTE: This file is generated and should not be modify directly. Update `templates/ROOT_README.hbs.md` instead"

# Operato Scene Components

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE.md)
[![Build Status](https://travis-ci.org/hatiolab/operato.svg?branch=master)](https://travis-ci.org/hatiolab/operato)
[![codecov](https://codecov.io/gh/hatiolab/operato/branch/master/graph/badge.svg)](https://codecov.io/gh/hatiolab/operato)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

Scene Components for Operato.

## Usage

The operato repo is managed as a monorepo that is composed of {{packages.length}} packages.
Each service has its own `README.md` and documentation describing usage.

## Development Guide

Service developers that will be a component of Operato Platform should refer to the following development guide.
{{#each guides}}

- [{{title}}](docs/development/{{name}})
  {{/each}}

### Package Index

| Package | Version | Description |
| ------- | ------- | ----------- |
{{#each packages}}
| [{{name}}](packages/{{name}}) | <a href="https://badge.fury.io/js/%40operato%2F{{name}}"><img src="https://badge.fury.io/js/%40operato%2F{{name}}.svg" width="200px" /></a> | {{{description}}} |
{{/each}}

## Want to contribute?

Check out our [Contributing Guide](./.github/CONTRIBUTING.md)

## License

MIT &copy; [Hatiolab](https://www.hatiolab.com/), see [LICENSE](LICENSE.md) for details.

<a href="http://www.hatiolab.com/"><img src="https://www.hatiolab.com/assets/img/logo.png" alt="Hatiolab" width="200" /></a>
