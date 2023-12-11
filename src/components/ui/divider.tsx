const Divider = ({ text }: { text: string }) => {
  return (
    <h3 className="flex items-center my-8">
      <span
        aria-hidden="true"
        className="flex-grow bg-gray-200 rounded h-0.5"></span>
      <span className="mx-3 text-lg font-medium">{text}</span>
      <span
        aria-hidden="true"
        className="flex-grow bg-gray-200 rounded h-0.5"></span>
    </h3>
  );
};

export default Divider;
