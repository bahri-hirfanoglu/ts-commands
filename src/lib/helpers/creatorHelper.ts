import slugify from "slugify";

/**
 *
 * @param className
 * @returns
 */
export function generateCommandName(className: string): string {
  return slugify(className);
}

/**
 * 
 * @param className 
 * @returns 
 */
export function generateCommandDescription(className: string): string {
    return `${className} | Enter a description for this command.`
}