export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className=" container bg-white mx-auto  px-1 rtl:gap-20  lg:px-5 xl:px-20 md:px-10 mb-3 ">
        {" "}
        <div className=" py-6 md:px-[32px]">{children}</div>
      </main>
    </>
  );
}
