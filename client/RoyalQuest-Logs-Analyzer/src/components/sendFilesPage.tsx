import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertStatus } from './alertStatus';
import GameLOGO from './gameLogo';

const validExtensions: Array<string> = ['htm', 'html'];

const SendFileForm = ({ handleSubmit }: { handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // This function prevents multiple fetch calls by clicking the submit button
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    await handleSubmit(event);

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleFormSubmit} encType="multipart/form-data" className="flex flex-col justify-center items-center sm:p-6 gap-5">
      <GameLOGO></GameLOGO>
      <div className="flex gap-2 border-transparent border-b-2 border-t-2 hover:border-[#ce9b50] p-1 transition-colors">
        <label htmlFor="file" className="sm:text-2xl font-bold">
          Select a log file to scan:
        </label>
        <input type="file" id="file" name="file" accept="text/htm, text/html" required />
      </div>
      <div className="flex gap-2">
        <Button type="submit" color="success" variant="contained" disabled={isSubmitting}>
          Start scanning
        </Button>
        <Link to="getFilesPage">
          <Button variant="contained" color="primary">
            Continue without scanning ⇁
          </Button>
        </Link>
      </div>
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
