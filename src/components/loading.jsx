import { Spinner } from '@/components/MaterialUI';

export default function Loading() {
    return (
        <div className="h-full flex items-center justify-center mr-6">
            <Spinner color="white" />
        </div>
    );
}
