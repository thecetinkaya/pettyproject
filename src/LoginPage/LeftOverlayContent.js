const LeftOverlayContent = ({ isAnimated, setIsAnimated }) => {
  return (
    <div className="p-8 text-center">
      <h1 className="text-6xl font-bold text-white mb-4">Kullanıcı mısınız?</h1>

      <h5 className="text-xl text-white">Giriş için tıklayın!</h5>
      <div className="mt-16">
        <button
          className="py-3 px-6 bg-transparent rounded-full text-center text-white text-xl font-bold uppercase ring-2 ring-white active:scale-110 transition-transform ease-in"
          onClick={(e) => {
            setIsAnimated(!isAnimated);
          }}
        >
          Kullanıcı Girişi
        </button>
      </div>
    </div>
  );
};

export default LeftOverlayContent;
