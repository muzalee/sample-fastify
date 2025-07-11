export class Logger {
  static forContext(context: string) {
    return {
      log: (message: string, ...args: any[]) => {
        console.log(`[${context}] ${message}`, ...args);
      },

      error: (message: string, ...args: any[]) => {
        console.error(`[${context}] ${message}`, ...args);
      },

      warn: (message: string, ...args: any[]) => {
        console.warn(`[${context}] ${message}`, ...args);
      },

      info: (message: string, ...args: any[]) => {
        console.info(`[${context}] ${message}`, ...args);
      },

      debug: (message: string, ...args: any[]) => {
        console.debug(`[${context}] ${message}`, ...args);
      },
    };
  }
}
