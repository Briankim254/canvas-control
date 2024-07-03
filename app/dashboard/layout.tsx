const LayoutPage = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div>
      <h1>Layout Page</h1>
      {children}
    </div>
  );
};

export default LayoutPage;
