import { Spinner } from '@/components/MaterialUI'; // Importing the Spinner component

export default function Loading() {
    return (
        // Container div to center the spinner on the page
        <div className="h-full flex items-center justify-center mr-6">
            {/* Spinner component indicating loading state */}
            <Spinner color="white" />
        </div>
    );
}
