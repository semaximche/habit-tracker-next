import { Spinner } from '@/components/MaterialUI';

// The Loading component displays a spinner to indicate that content is loading.
// It centers the spinner both vertically and horizontally within its container,
// providing a user-friendly loading state.

export default function Loading() {
    return (
        <div className="h-full flex items-center justify-center mr-6">
            <Spinner color="white" />
        </div>
    );
}
