import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import { AlertStatus } from './alertStatus';

const validExtensions = ['htm', 'html'];

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
  const [alertMessage, setAlertMessage] = useState('');
  const [scanIsClicked, setScanIsClicked] = useState(false);
  const [isFileSent, setIsFileSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const fileInput = formData.get('file') as File;

    const extension = fileInput.name.split('.').pop()?.toLowerCase();

    if (!validExtensions.includes(extension || '')) {
      setAlertMessage('Please select a file with a valid extension (.htm or .html)');
      setScanIsClicked(true);
      setIsFileSent(false);
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch('http://localhost:3000/uploads', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setScanIsClicked(true);
        setIsFileSent(true);
        setIsLoading(false);
        setAlertMessage('File successfully sent');
      } else {
        setScanIsClicked(true);
        setIsFileSent(false);
        setIsLoading(false);
        setAlertMessage(`Error sending file - ${response.statusText}`);
      }
    } catch (error) {
      setScanIsClicked(true);
      setIsLoading(false);
      setIsFileSent(false);
      setAlertMessage(`Error sending file - ${error}`);
    }
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
