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