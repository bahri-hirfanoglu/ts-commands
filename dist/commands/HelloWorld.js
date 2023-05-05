"use strict";

class HelloWorld  {
  /**
   * signature of the command
   * @param {string}
   */
  signature = "hello-world";

  /**
   * description of the task of the command
   * @param {string}
   */
  description = "HelloWorld description";

  /**
   * @return {Number}
   */
  process() {
    return 0;
  }
}

exports.default = HelloWorld;