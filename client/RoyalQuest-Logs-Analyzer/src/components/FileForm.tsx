const FileForm = () => {
  return (
    <form action="" method="">
      <label htmlFor="logFile">Choose log file to scan</label>
      <input type="file" id="logFile" name="logFile" accept="text/htm, text/html" required />
      <button type="submit">Start scanning</button>
    </form>
  );
};

export { FileForm };
