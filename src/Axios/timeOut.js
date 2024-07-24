const timeOut = (callback, stateCallback) => {
    let i = 29;
    let fn = () => {
      setTimeout(() => {
        stateCallback(i);
        i -= 1;
        if (i < 0) {
          callback(true);
          i = 30;
        } else {
          fn();
        }
      }, 1000);
    };
    fn();
  };
  
  export default timeOut;