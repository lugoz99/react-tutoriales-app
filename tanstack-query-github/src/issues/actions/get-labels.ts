import { githubApi } from "../../api/github.api";
import { sleep } from "../../helpers";
import { GithubLabel } from "../interfaces/labe.interface";

export const getAllLabels = async():Promise<GithubLabel[]> => {
  await sleep(1500);
  const { data } = await githubApi.get<GithubLabel[]>('/labels');
  console.log(data)
  return data;
};