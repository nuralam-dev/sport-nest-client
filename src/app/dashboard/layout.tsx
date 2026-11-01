const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-6 h-screen mt-20">
      <div className="fond-bold text-7xl w-[250px] bg-amber-600">sidebar</div>
      <div className="flex-1 bg-amber-400">{children}</div>
    </div>
  );
};

export default layout;
