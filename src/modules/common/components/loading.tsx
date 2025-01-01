export const Loading = () => {
  return (
    <div className="flex items-center justify-center p-12">
      <div className="animate-pulse flex gap-2 items-center text-gray-400">
        <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" />
        <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:0.2s]" />
        <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:0.4s]" />
      </div>
    </div>
  );
};
