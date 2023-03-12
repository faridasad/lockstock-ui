const copy = (txt: any) => {
  const p = new Promise((resolve, reject) => {
    navigator.clipboard
      .writeText(txt)
      .then(() => {
        resolve(true);
      })
      .catch((err: any) => {
        reject(err);
      });
  });

  return p;
};

export default copy;
