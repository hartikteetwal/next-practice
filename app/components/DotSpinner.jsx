export default function DotSpinner() {
    return (
        <span className="flex gap-[2px] justify-center">
            <span className="w-[10px] h-[10px] bg-green-500 rounded-full animate-bounce [animation-delay:0s]"></span>
            <span className="w-[10px] h-[10px] bg-green-500 rounded-full animate-bounce [animation-delay:0.15s]"></span>
            <span className="w-[10px] h-[10px] bg-green-500 rounded-full animate-bounce [animation-delay:0.3s]"></span>
        </span>
    );
}
  