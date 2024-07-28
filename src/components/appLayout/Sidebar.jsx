export default function Sidebar() {
    return (
        <div className="bg-gray-700 text-white h-screen w-fit">
            <ul>
                <li>
                    <button className="mt-4 w-32 rounded-lg border bg-white shadow-md hover:bg-gray-100">
                        <div className="flex w-full justify-center px-5 py-3">
                            <div className="flex w-full justify-center">
                                <h1 className="whitespace-nowrap font-bold text-black">
                                    Dashboard
                                </h1>
                            </div>
                        </div>
                    </button>
                </li>
                <li>
                    <button className="mt-1 w-32 rounded-lg border bg-white shadow-md hover:bg-gray-100">
                        <div className="flex w-full justify-center px-5 py-3">
                            <div className="flex w-full justify-center">
                                <h1 className="whitespace-nowrap font-bold text-black">
                                    Profile
                                </h1>
                            </div>
                        </div>
                    </button>
                </li>
                <li>
                    <button className="mt-1 w-32 rounded-lg border bg-white shadow-md hover:bg-gray-100">
                        <div className="flex w-full justify-center px-5 py-3">
                            <div className="flex w-full justify-center">
                                <h1 className="whitespace-nowrap font-bold text-black">
                                    Settings
                                </h1>
                            </div>
                        </div>
                    </button>
                </li>
            </ul>
        </div>
    );
}
