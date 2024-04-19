import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';

const GetFilesPage = () => {
  const [fileName, setFileName] = useState<string>('');

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFileName(event.target.value);
  };

  const [data, setData] = useState<Array<string>>([]);
  const [isFileDownloaded, setIsFileDownloaded] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/databasecollections', {
        method: 'GET',
      });

      if (response.ok) {
        const result = await response.json();
        setData(result);

        setAlertMessage('Data successfully processed');
        setIsFileDownloaded(true);
      } else {
        setAlertMessage(`Error getting data - ${response.statusText}`);
        setIsFileDownloaded(false);
      }
    } catch (error) {
      setAlertMessage(`Error getting data - ${error}`);
      setIsFileDownloaded(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full font-Bona-Nova">
      <form encType="multipart/form-data" onSubmit={handleSubmit} className="flex flex-col justify-center items-center sm:p-6 gap-2">
        <h1 className="text-center font-bold mb-8 bg-clip-text">
          <span className="md:text-6xl royalQuestGradient p-2">Royal Quest </span>
          <span className="md:text-6xl royalQuestGradient p-2">Log Scanner</span>
        </h1>
        <h2 className={`text-4xl font-bold text-center p-4 ${isFileDownloaded ? 'text-green-700' : 'text-red-700'}`}>{alertMessage}</h2>

        {isFileDownloaded ? (
          <div>
            <Link to={'ItemsTable'} state={fileName}>
              <button
                type="submit"
                className="text-2xl m-2 border px-2 py-1 hover:bg-[#ce9b50] hover:text-white hover:rounded-br-2xl hover:rounded-bl-2xl transition-all duration-200"
              >
                Build a table
              </button>
            </Link>

            <SelectFile data={data} handleSelectChange={handleSelectChange} fileName={fileName} />
          </div>
        ) : (
          <div>
            <button
              type="submit"
              className="text-2xl border px-2 py-1 hover:bg-[#ce9b50] hover:text-white hover:rounded-br-2xl hover:rounded-bl-2xl transition-all duration-200"
            >
              Start data processing
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

const SelectFile = ({
  data,
  handleSelectChange,
  fileName,
}: {
  data: Array<string>;
  handleSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  fileName: string;
}) => {
  return (
    <>
      <label htmlFor="files" className="text-xl mx-2">
        Choose a file
      </label>
      <select name="files" id="files" className="p-1" value={fileName} onChange={handleSelectChange}>
        <option value="default" key="default">
          none
        </option>
        {data.map((file) => (
          <option key={file} value={file} className="bg-white">
            {file}
          </option>
        ))}
      </select>
    </>
  );
};

export { GetFilesPage };
