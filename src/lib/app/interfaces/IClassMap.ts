export interface IClassMap {
  [className: string]: { new (...args: any[]): any };
}
