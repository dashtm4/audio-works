interface ILoadingBarProps {
  className?: string;
}

export function LoadingBar({ className: wrapperStyle }: ILoadingBarProps) {
  return (
    <div className={`p-[24px] flex items-center justify-center h-full ${wrapperStyle}`}>
      <div className="w-12 h-12 border-4 border-dotted rounded-full border-t-transparent border-blue-900 animate-spin"></div>
    </div>
  );
}
