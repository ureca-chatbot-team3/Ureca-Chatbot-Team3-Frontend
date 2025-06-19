const HEADER_HEIGHT = 112;

const BackgroundWrapper = ({ children }) => {
  return (
    <div className="px-[40px] bg-linear-[to_bottom,var(--color-white)_30%,var(--color-purple-200)_58%] bg-fixed bg-cover bg-center min-h-[calc(100vh-var(--header-height))]">
      {children}
    </div>
  );
};

export default BackgroundWrapper;
