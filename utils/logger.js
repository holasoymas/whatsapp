const Logger = {
  info: (...params) => {
    console.log(`[INFO] :`, ...params);
  },

  error: (...params) => {
    console.error(`[ERROR] :`, ...params);
  },
};

export default Logger;
