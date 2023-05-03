export default class TestCommand  {
  /**
   * signature of the command
   * @param {string}
   */
  signature: string = "test-command";

  /**
   * description of the task of the command
   * @param {string}
   */
  description: string = "TestCommand description";

  /**
   * @return {Number}
   */
  process(): Number {
    return 0;
  }
}
