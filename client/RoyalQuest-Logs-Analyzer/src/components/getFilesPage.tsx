import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import GameLOGO from './gameLogo';

const GetFilesPage = () => {
  const [fileName, setFileName] = useState<string>('');

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
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
        <GameLOGO></GameLOGO>
        <h2 className={`text-4xl font-bold text-center p-4 ${isFileDownloaded ? 'text-green-700' : 'text-red-700'}`}>
          <span>{alertMessage}</span> <br />
          <span></span>
        </h2>

        {isFileDownloaded ? (
          <div className="flex flex-col items-center justify-center">
            <Link to={'ItemsTable'} state={fileName}>
              <Button variant="contained" color="success" type="submit">
                Build data table
              </Button>
            </Link>

            <SelectFile data={data} handleSelectChange={handleSelectChange} fileName={fileName} />
          </div>
        ) : (
          <div className="flex gap-4">
            <Link to="/">
              <Button variant="contained" color="primary" type="submit">
                ↽ Return to file loading
              </Button>
            </Link>
            <Button variant="contained" color="success" type="submit">
              Start data processing
            </Button>
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
  handleSelectChange: (event: SelectChangeEvent<string>) => void;
  fileName: string;
}) => {
  return (
    <>
      <div className="p-4">
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="files">File</InputLabel>
          <Select name="files" labelId="files" value={fileName} onChange={handleSelectChange} label="File">
            <MenuItem value="default" key="default">
              none
            </MenuItem>
            {data.map((file) => (
              <MenuItem key={file} value={file} className="bg-white">
                {file}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
};

export default GetFilesPage;
