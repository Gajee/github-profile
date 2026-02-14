interface Props {
  username: string;
}
const Header = ({ username }: Props) => {
  return (
    <div className="bg-black border-b border-githubBorder px-10 py-3 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="text-xl">🐙</div>
        <span className="font-semibold">{username}</span>
      </div>

      <div className="flex items-center gap-4">
        <input
          placeholder="Type / to search"
          className="bg-githubBg border border-githubBorder rounded-md px-3 py-1 text-sm focus:outline-none focus:border-gray-500"
        />
        <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
      </div>
    </div>
  );
};

export default Header;