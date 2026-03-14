function ConfirmDeleteModal({ deleting, deleted }) {
  return (
    <aside className="fixed flex justify-center items-center w-screen h-screen bg-[#00000079] z-100">
      <div className="flex flex-col gap-4 bg-white w-xs md:w-sm rounded-2xl p-6">
        <h2 className="text-xl text-accGray1 font-medium">Delete Comment</h2>
        <p className="text-accGray2">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="flex justify-between">
          <button onClick={() => deleting(0)} className="w-40 rounded-lg bg-accGray2 text-white p-3 font-medium uppercase hover:cursor-pointer hover:bg-accGray1">No, Cancel</button>
          <button onClick={deleted} className="w-40 rounded-lg bg-accPink1 text-white p-3 font-medium uppercase hover:cursor-pointer hover:bg-accPink2">Yes, Delete</button>
        </div>
      </div>
    </aside>
  );
}

export default ConfirmDeleteModal;
