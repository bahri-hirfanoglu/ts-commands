export default class Test  {
  /**
   * signature of the command
   * @param {string}
   */
  signature: string = "test-command";

  /**
   * description of the task of the command
   * @param {string}
   */
  description: string = "Test description";

  /**
   * @return {void}
   */
  process(): void {}
}
