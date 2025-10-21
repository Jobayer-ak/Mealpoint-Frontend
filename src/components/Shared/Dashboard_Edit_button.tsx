import { MdOutlineModeEdit } from 'react-icons/md';

const Dashboard_Edit_button = () => {
  return (
    <div className="w-full lg:w-24">
      <h2 className="text-sm font-semibold mb-4 flex justify-center lg:justify-between items-center gap-1 dashboard-border rounded-full px-4 py-3 d-edit-btn hover:d-edit-btn cursor-pointer">
        <MdOutlineModeEdit size={25} className="py-1" />
        Edit
      </h2>
    </div>
  );
};

export default Dashboard_Edit_button;
