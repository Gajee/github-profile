import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRepos } from "../api/github";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Tabs from "../components/Tabs";
import RepoCard from "../components/RepoCard";
import GithubContributionGrid from "../components/GithubContributionGrid";

const ProfilePage = () => {
  const { username: paramUsername } = useParams();
  const username = paramUsername || "gajee";

  const [repos, setRepos] = useState<any[]>([]);

  useEffect(() => {
    document.title = "Github Profile - " + username;
    getRepos(username).then(setRepos);
  }, [username]);

  return (
    <>
      <Header username={username} />

      <div className="max-w-6xl mx-auto px-6 mt-8 flex flex-col md:flex-row gap-10">
        <Sidebar username={username} />

        <div className="flex-1">
          <Tabs />

          <h3 className="mt-6 mb-4 font-semibold">
            Popular repositories
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {repos.slice(0, 6).map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>

          <GithubContributionGrid username={username} />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;