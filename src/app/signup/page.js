import SignUpForm from '@/components/login/SignUpForm';

export default function SignUp() {
    return (
        <div className="flex w-full mt-14 mb-14 items-center justify-center bg-cover bg-center px-5 sm:px-0">
            <div className="flex w-full max-w-sm overflow-hidden rounded-lg bg-foreground-light dark:bg-foreground-dark shadow-lg lg:max-w-4xl">
                <div
                    className="hidden bg-blue-700 bg-cover md:block lg:w-1/2 mix-blend-multiply"
                    style={{
                        backgroundImage: `url(https://media.istockphoto.com/id/1305998573/vector/woman-with-pencil-marking-completed-tasks-on-to-do-list-concept-of-time-management-work.jpg?s=612x612&w=0&k=20&c=F_P6Ke0ubUk1rj7TmF4RMHN7SySW74ZVJOqi4CyHMJU=)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                ></div>
                <div className="w-full p-8 lg:w-1/2">
                    <p className="text-center mb-8 text-xl font-bold text-accent-light dark:text-accent-dark">
                        Create a New Account
                    </p>
                    <SignUpForm />
                    <div className="mt-4 flex w-full items-center text-center">
                        <a
                            href="/login"
                            className="w-full text-center text-xs capitalize text-gray-500"
                        >
                            Already have an account?
                            <span className="text-green-500"> Login</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
