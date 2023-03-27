import * as fs from "fs";
import * as path from "path";
import { IClassMap } from "./interfaces/IClassMap";
import { IProperties } from "./interfaces/IProperties";

export class ClassMap {
  properties: IProperties;
  classes: IClassMap;

  constructor(properties: IProperties) {
    this.properties = properties;
    this.classes = this.createClassMap();
  }

  // Creates a mapping of class names to their corresponding classes
  createClassMap(): IClassMap {
    // Initialize an empty object to store the class map
    const classMap: IClassMap = {};

    if (!fs.existsSync(this.properties.commandPath)) {
      throw new Error("command path not found");
    }
    // Read the files in the directory containing the commands
    const files = fs.readdirSync(this.properties.commandPath);
    // Iterate through each file
    files.forEach((file) => {
      // Get the file extension
      const extname = path.extname(file);
      // If the file is not a .ts or .js file, skip it
      if (extname !== ".ts" && extname !== ".js") {
        return;
      }
      // Get the class name from the file name (without the extension)
      const className = path.basename(file, extname);
      // Get the module path by joining the commands path with the file name
      const modulePath = path.join(this.properties.commandPath, file);
      // Require the module and get the exported class (if it exists)
      const importedModule = require(modulePath);
      for (const key in importedModule) {
        const exportedClass = importedModule[key];
        // If the exported item is a class with the same name as the file,
        // add it to the class map
        if (
          typeof exportedClass === "function" &&
          exportedClass.name === className
        ) {
          classMap[className] = exportedClass;
          break;
        }
      }
      // If no exported class with the same name as the file was found, log a warning
      if (!classMap[className]) {
        console.warn(
          `No exported class found in "${modulePath}" with name "${className}".`
        );
      }
    });
    // Return the completed class map
    return classMap;
  }
}
