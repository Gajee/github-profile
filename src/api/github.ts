import axios from "axios";

const BASE = "https://api.github.com";

export const getUser = async (username: string) => {
  const res = await axios.get(`${BASE}/users/${username}`);
  return res.data;
};

export const getRepos = async (username: string) => {
  const res = await axios.get(
    `${BASE}/users/${username}/repos?sort=updated`
  );
  return res.data;
};

export const getContributions = async (username: string) => {
  const res = await axios.get(
    `https://github-contributions-api.jogruber.de/v4/${username}`
  );
  return res.data;
};