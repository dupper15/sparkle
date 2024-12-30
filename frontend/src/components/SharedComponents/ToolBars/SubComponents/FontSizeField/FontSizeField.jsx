// eslint-disable-next-line react/prop-types
const FontSizeField = ({
  currentFontSize,
  handleFontSizeChange,
  activeTab,
  setActiveTab,
}) => {
  const maxValue = 200;
  const minValue = 1;

  return (
    <div className="flex items-center text-black bg-white dark:text-white dark:bg-black dark:border-gray-500 font-medium rounded border-2 px-2">
      <button
        className="text-lg pr-1"
        onClick={() => {
          handleFontSizeChange(currentFontSize - 1);
          setActiveTab(activeTab === "none");
        }}
        disabled={currentFontSize <= minValue}>
        -
      </button>
      <input
        id="valueInput"
        type="text"
        value={currentFontSize}
        onClick={() => {
          setActiveTab(activeTab === "none");
        }}
        onChange={(e) => handleFontSizeChange(Number(e.target.value))}
        className="w-8 text-center focus:outline-none text-black bg-white dark:text-white dark:bg-black"
        maxLength={maxValue}
        minLength={minValue}
      />
      <button
        className="text-lg pl-0.5"
        onClick={() => {
          handleFontSizeChange(currentFontSize + 1);
          setActiveTab(activeTab === "none");
        }}
        disabled={currentFontSize >= maxValue}>
        +
      </button>
    </div>
  );
};

export default FontSizeField;
