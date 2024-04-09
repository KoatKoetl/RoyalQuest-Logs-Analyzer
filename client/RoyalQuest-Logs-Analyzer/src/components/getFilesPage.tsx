import { Link } from 'react-router-dom';

const GetFilesPage = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/downloads', {
        method: 'GET',
      });
      if (response.ok) {
        alert('File successfully get.');
      } else {
        alert(`Error getting file: ${response.statusText}`);
      }
    } catch (error) {
      alert(`Error getting file:, ${error}`);
    }
  };

  return (
    <>
      <form encType="multipart/form-data" onSubmit={handleSubmit} className="flex flex-col justify-center items-center sm:p-6 gap-2">
        <h1 className="text-center font-bold mb-8 bg-clip-text">
          <span className="md:text-6xl royalQuestGradient p-2">Royal Quest </span>
          <span className="md:text-6xl royalQuestGradient p-2">Log Scanner</span>
        </h1>
        <button
          type="submit"
          className="text-2xl border px-2 py-1 hover:bg-[#ce9b50] hover:text-white hover:rounded-br-2xl hover:rounded-bl-2xl transition-all duration-200"
        >
          <Link to="itemsTable">Show the data</Link>
        </button>
      </form>
    </>
  );
};

export { GetFilesPage };
