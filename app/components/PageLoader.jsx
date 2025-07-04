// components/Spinner.jsx
export default function Spinner() {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }} // translucent white bg
        >
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-transparent border-green-500" />
        </div>
    );
}
  