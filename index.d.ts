import { Compiler } from "webpack";

export declare class FilepathPlugin {
  constructor(options: Options);

  apply(compiler: Compiler): void;
}

interface Options extends Partial<FilepathPluginOptions> {}

interface FilepathPluginOptions {
  /**
   * @default 200
   */
  maxPathLength: number;

  /**
   * @default false
   */
  failOnError: boolean;
}
