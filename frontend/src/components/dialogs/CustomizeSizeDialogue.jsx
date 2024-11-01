// eslint-disable-next-line react/prop-types
const CustomizeSizeDialogue = ({childCloseFormRequest}) => {
    return(
        <div className="relative h-[400px] w-[600px] flex-column items-center justify-center bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <button className="absolute top-2 right-4 text-gray-400 hover:text-gray-600 font-bold text-xl" onClick={()=>childCloseFormRequest(false)}>×</button>
            <h2 className="text-lg font-semibold mb-6">Customize size</h2>
            <div>
                <input type="text" placeholder="Enter name..."
                       className="w-full p-3 mb-4 border-2 border-indigo-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"/>
            </div>
            <div>
                <input type="text" placeholder="Enter width..."
                        className="w-full p-3 mb-4 border-2 border-indigo-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"/>
            </div>
            <div>
                <input type="text" placeholder="Enter height..."
                       className="w-full p-3 mb-4 border-2 border-indigo-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"/>
            </div>
            <button
                className="w-[120px] py-3 mt-4 font-bold text-white rounded-md bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90">
                Create
            </button>
        </div>
        )
}

export default CustomizeSizeDialogue;