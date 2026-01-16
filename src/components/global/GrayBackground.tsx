const GrayBackground = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-gray-100 pt-1 pb-12 text-sm min-h-[70vh]">{children}</div>;
};

export default GrayBackground;
