import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface alertStatus {
  isFileSent: boolean;
  setScanIsClicked: (click: boolean) => void;
  alertMessage: string;
}

const AlertStatus = ({ isFileSent, alertMessage, setScanIsClicked }: alertStatus) => {
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <h2 className={`text-4xl font-bold text-center ${isFileSent ? 'text-green-700' : 'text-red-700'}`}>{alertMessage}</h2>
      {!isFileSent ? (
        <Button color="error" variant="contained" onClick={() => setScanIsClicked(false)}>
          Return back
        </Button>
      ) : (
        <div className="flex gap-6">
          <Link to="/">
            <Button color="primary" variant="contained" onClick={() => setScanIsClicked(false)}>
              ↽ Load more files
            </Button>
          </Link>
          <Link to="getFilesPage">
            <Button color="success" variant="contained" onClick={() => setScanIsClicked(false)}>
              Continue
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export { AlertStatus };
