import axios from 'axios'

export interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description?: string;
  stargazers_count: number;
  html_url: string;
}

export const searchUsers = async (query: string): Promise<GitHubUser[]> => {
  const response = await axios.get('https://api.github.com/search/users', {
    params: {
      q: query,
      per_page: 5,
    },
  })
  return response.data.items
}

export const getUserRepos = async (username: string): Promise<GitHubRepo[]> => {
  const response = await axios.get(`https://api.github.com/users/${username}/repos`)
  return response.data
}
