// pages/signup/page.js

import SignUpForm from '@/components/login/SignUpForm';

export default function SignUpPage() {
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
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                ></div>
                <div className="w-full p-8 lg:w-1/2">
                    <p className="text-center text-2xl font-bold text-gray-600">
                        Create an account
                    </p>
                    <p className="mb-4 text-center text-gray-500">
                        Track your habits and share your progress with friends
                    </p>
                    <SignUpForm />
                    <div className="mt-4 flex w-full items-center text-center">
                        <a
                            href="/login"
                            className="w-full text-center text-xs capitalize text-gray-500"
                        >
                            Already have an account?
                            <span className="text-green-500"> Sign In</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
