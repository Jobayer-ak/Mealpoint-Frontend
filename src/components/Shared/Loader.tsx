import HashLoader from 'react-spinners/HashLoader';

export default function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <HashLoader color="#facc15" size={70} loading={true} />
    </div>
  );
}
