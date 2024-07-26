import GoogleButton from "@/components/login/GoogleButton";

export default function Login() {
    return (
        <div
            className="flex h-screen w-full items-center justify-center bg-cover bg-center px-5 sm:px-0"
            style={{
                backgroundImage: `url(https://www.veeforu.com/wp-content/uploads/2022/10/Purple-color-linear-gradient-background..png)`,
            }}
        >
            <div className="flex w-full max-w-sm overflow-hidden rounded-lg border bg-white shadow-lg lg:max-w-4xl">
                <div
                    className="hidden bg-blue-700 bg-cover md:block lg:w-1/2"
                    style={{
                        backgroundImage: `url(https://media.istockphoto.com/id/1305998573/vector/woman-with-pencil-marking-completed-tasks-on-to-do-list-concept-of-time-management-work.jpg?s=612x612&w=0&k=20&c=F_P6Ke0ubUk1rj7TmF4RMHN7SySW74ZVJOqi4CyHMJU=)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                ></div>
                <div className="w-full p-8 lg:w-1/2">
                    <p className="text-center text-2xl font-bold text-gray-600">
                        Welcome back!
                    </p>
                    <p className="mb-4 text-center text-gray-500">
                        Track your habits and share your progress with friends
                    </p>
                    <div className="mt-4">
                        <label className="mb-2 block text-sm font-bold text-gray-700">
                            Email Address
                        </label>
                        <input
                            className="block w-full rounded border border-gray-300 px-4 py-2 text-gray-700 focus:outline-2 focus:outline-green-500"
                            type="email"
                            required
                        />
                    </div>
                    <div className="mt-4 flex flex-col justify-between">
                        <div className="flex justify-between">
                            <label className="mb-2 block text-sm font-bold text-gray-700">
                                Password
                            </label>
                        </div>
                        <input
                            className="block w-full rounded border border-gray-300 px-4 py-2 text-gray-700 focus:outline-2 focus:outline-green-500"
                            type="password"
                        />
                        <a
                            href="#"
                            className="mt-2 w-full text-end text-xs text-gray-500 hover:text-gray-900"
                        >
                            Forgot Password?
                        </a>
                    </div>
                    <div className="mt-8">
                        <button
                            className="w-full rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-400"
                        >
                            Login
                        </button>
                    </div>
                    <GoogleButton />
                    <div className="mt-4 flex w-full items-center text-center">
                        <a
                            href="#"
                            className="w-full text-center text-xs capitalize text-gray-500"
                        >
                            Don&apos;t have an account yet?
                            <span className="text-green-500"> Sign Up</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
