function delay(ms: number) {
  return new Promise((resolve) => { setTimeout(resolve, ms); });
}

const MainPage = async () => {
  await delay(3000);
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex'>
        main page
      </div>
    </main>
  );
};

export default MainPage;
