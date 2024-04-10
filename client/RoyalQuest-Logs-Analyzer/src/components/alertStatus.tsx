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
        <button
          type="button"
          onClick={() => setScanIsClicked(false)}
          className="text-2xl border px-2 py-1 hover:bg-[#ce9b50] hover:text-white hover:rounded-br-2xl hover:rounded-bl-2xl transition-all duration-200"
        >
          Return back
        </button>
      ) : (
        <Link to="getFilesPage">
          <button
            type="button"
            onClick={() => setScanIsClicked(false)}
            className="text-2xl border px-2 py-1 hover:bg-[#ce9b50] hover:text-white hover:rounded-br-2xl hover:rounded-bl-2xl transition-all duration-200"
          >
            Continue scanning
          </button>
        </Link>
      )}
    </div>
  );
};

export { AlertStatus };
