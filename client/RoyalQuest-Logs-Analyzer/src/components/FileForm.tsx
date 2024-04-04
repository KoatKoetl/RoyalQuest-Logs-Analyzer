const FileForm = () => {
  return (
    <div className="flex justify-center items-center h-full font-Bona-Nova">
      <form action="" method="" className="flex flex-col justify-center items-center sm:p-6 gap-2">
        <h1 className="text-center font-bold mb-8 bg-clip-text">
          <span className="md:text-6xl royalQuestGradient p-2">Royal Quest </span>
          <span className="md:text-6xl royalQuestGradient p-2">Log Scanner</span>
        </h1>
        <div className="flex gap-2 border-transparent border-b-2 border-t-2 hover:border-[#ce9b50] p-1 transition-colors">
          <label htmlFor="logFile" className="sm:text-2xl font-bold">
            Select a log file to scan:
          </label>
          <input type="file" id="logFile" name="logFile" accept="text/htm, text/html" required />
        </div>
        <button
          type="submit"
          className="text-2xl border px-2 py-1 hover:bg-[#ce9b50] hover:text-white hover:rounded-br-2xl hover:rounded-bl-2xl transition-all duration-200"
        >
          Start scanning
        </button>
      </form>
    </div>
  );
};

export { FileForm };
