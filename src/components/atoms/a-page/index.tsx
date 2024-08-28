interface Props {
  children?: React.ReactNode;
}

const Page: React.FC<Props> = ({ children }) => {
  return (
    <main className="flex flex-1 flex-col gap-6 p-4 lg:px-10 pt-6">
      {children}
    </main>
  );
};

export default Page;
