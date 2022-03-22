const { error: originalConsoleError } = console;

console.error = message => {
  if (/(Failed.*?type)/.test(message)) {
    throw new Error(message);
  }

  originalConsoleError(message);
};
