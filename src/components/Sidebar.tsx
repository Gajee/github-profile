import { useEffect, useState } from "react";
import { getUser } from "../api/github";

interface Props {
  username: string;
}

const Sidebar = ({ username }: Props) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getUser(username).then(setUser);
  }, [username]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="w-full md:w-72">
      <img
        src={user.avatar_url}
        className="w-full aspect-square rounded-full mb-4"
      />

      <h2 className="text-xl font-semibold">{user.name}</h2>
      <p className="text-githubMuted mb-4">{user.login}</p>

      <button className="w-full bg-githubCard border border-githubBorder rounded-md py-2 text-sm">
        Follow
      </button>

      <p className="text-sm mt-4">{user.bio}</p>

      <div className="text-sm text-githubMuted mt-4 space-y-1">
        <p>👥 {user.followers} followers</p>
        <p>👤 {user.following} following</p>
        {user.location && <p>📍 {user.location}</p>}
        {user.blog && <p>🔗 {user.blog}</p>}
      </div>
    </div>
  );
};

export default Sidebar;