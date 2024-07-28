import SignUpForm from '@/components/login/SignUpForm';
import MainTopbar from '@/components/MainTopbar';

export default function SignUp() {
    return (
        <div className="flex w-full mt-14 mb-14 items-center justify-center bg-cover bg-center px-5 sm:px-0">
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
                        Create a new account
                    </p>
                    <SignUpForm/>
                </div>
            </div>
        </div>
    );
}
