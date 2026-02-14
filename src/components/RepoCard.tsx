interface Props {
  repo: any;
}

const RepoCard = ({ repo }: Props) => {
  return (
    <div className="bg-githubCard border border-githubBorder rounded-lg p-4">
      <div className="flex justify-between items-center">
        <h4 className="text-blue-400 font-semibold text-sm">
          {repo.name}
        </h4>
        <span className="border border-githubBorder text-xs px-2 py-0.5 rounded-full">
          {repo.private ? "Private" : "Public"}
        </span>
      </div>

      <p className="text-sm text-githubMuted mt-2">
        {repo.description}
      </p>

      <div className="flex items-center gap-3 mt-3 text-xs">
        {repo.language && (
          <>
            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
            <span>{repo.language}</span>
          </>
        )}
        <span>⭐ {repo.stargazers_count}</span>
      </div>
    </div>
  );
};

export default RepoCard;