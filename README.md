# 🔵 TSC

TSC is a TypeScript project that allows you to create and run command files, similar to Laravel command structure.

## Installation

To use TSC, you should have Node.js and npm installed on your machine. Then, run the following command to install the dependencies:

```
npm install
```

## Usage

First, build the project by running:

```
npx tsc
```
To create a new command file, run:

```
npm run make <CommandClassName>
```

Replace `<CommandClassName>` with the name of your command class.

To run a command, use the following command:

```
npm run start <command-class-name>
```

Replace `<command-class-name>` with the signature of your command class.

## Esample
Here is an example of how to create and run a command:

 ```
 npm run make HelloCommand
```

This will create a new command file named HelloCommand in the src/commands directory. You can then add your command logic to this file.

```js
"use strict";

class HelloCommand  {
  /**
   * signature of the command
   * @param {string}
   */
  signature = "hello-command";

  /**
   * description of the task of the command
   * @param {string}
   */
  description = "HelloCommand description";

  /**
   * @return {Number}
   */
  process() {
    return 0;
  }
}

exports.default = HelloCommand;
```
Then run the command:
 ```
 npm run start hello-command
```
**Result:**
```js
❯ npm run start hello-command

> ts-commands@1.0.0 start
> node dist/app.js run-command -s hello-command

[hello-command] command run success!
Result: 0
```

## Contributing
We welcome contributions to improve the functionality and usability of our project. To get started, please follow these steps:

* Fork this repository and clone it to your local machine.
* Create a new branch for your changes: **git checkout -b feature/your-feature-name**
* Make your changes and test thoroughly.
* Commit your changes: **git commit -am 'Add some feature'**
* Push your changes to your fork: git push origin **feature/your-feature-name**
* Open a pull request and describe your changes in detail.
* Before submitting a pull request, please make sure that your changes adhere to our coding standards and that all tests pass. We also ask that you follow our code of conduct and be respectful to other contributors.

Thank you for your interest in contributing to our project!
