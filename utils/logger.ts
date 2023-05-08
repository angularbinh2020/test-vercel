const logger = {
  info: (...message: any[]) => {
    console.log(JSON.stringify(message));
  },
  error: (...message: any[]) => {
    console.log(JSON.stringify(message));
  },
};

export default logger;
