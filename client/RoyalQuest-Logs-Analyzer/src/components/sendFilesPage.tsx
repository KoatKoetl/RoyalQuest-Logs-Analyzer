import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { AlertStatus } from './alertStatus';

const validExtensions: Array<string> = ['htm', 'html'];

const SendFileForm = ({ handleSubmit }: { handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void }) => {
  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col justify-center items-center sm:p-6 gap-2">
      <h1 className="text-center font-bold mb-8 bg-clip-text">
        <span className="md:text-6xl royalQuestGradient p-2">Royal Quest </span>
        <span className="md:text-6xl royalQuestGradient p-2">Log Scanner</span>
      </h1>
      <div className="flex gap-2 border-transparent border-b-2 border-t-2 hover:border-[#ce9b50] p-1 transition-colors">
        <label htmlFor="file" className="sm:text-2xl font-bold">
          Select a log file to scan:
        </label>
        <input type="file" id="file" name="file" accept="text/htm, text/html" required />
      </div>
      <button
        type="submit"
        className="text-2xl border px-2 py-1 hover:bg-[#ce9b50] hover:text-white hover:rounded-br-2xl hover:rounded-bl-2xl transition-all duration-200"
      >
        Start scanning
      </button>
    </form>
  );
};

const SendFilesPage = () => {
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [scanIsClicked, setScanIsClicked] = useState<boolean>(false);
  const [isFileSent, setIsFileSent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const fileInput = formData.get('file') as File;

    const extension = fileInput.name.split('.').pop()?.toLowerCase();

    if (!validExtensions.includes(extension || '')) {
      handleAlert('Please select a file with a valid extension (.htm or .html)', false);
      setScanIsClicked(true);
      return;
    }

    try {
      setIsLoading(true);

      const ServerRequest = await axios({
        method: 'POST',
        url: 'http://localhost:3000/api/storeCurrentLogs',
        data: formData,
      });

      const DBRequest = await axios({
        method: 'POST',
        url: 'http://localhost:3000/api/storeToAllItems',
        data: formData,
      });

      if (ServerRequest.status === 200 && DBRequest.status === 200) {
        handleAlert('File successfully sent', true);
      } else {
        handleAlert(`Error sending file - ${ServerRequest.statusText}`, false);
      }
    } catch (error) {
      handleAlert(`Error sending file - ${error}`, false);
    } finally {
      setIsLoading(false);
      setScanIsClicked(true);
    }
  };

  const handleAlert = (message: string, success: boolean) => {
    setAlertMessage(message);
    setIsFileSent(success);
  };

  return (
    <div className="flex flex-col justify-center items-center h-full font-Bona-Nova">
      {!scanIsClicked ? (
        <SendFileForm handleSubmit={handleSubmit} />
      ) : (
        <AlertStatus isFileSent={isFileSent} alertMessage={alertMessage} setScanIsClicked={setScanIsClicked} />
      )}
      {isLoading && <CircularProgress color="inherit" />}
    </div>
  );
};

export { SendFilesPage };
