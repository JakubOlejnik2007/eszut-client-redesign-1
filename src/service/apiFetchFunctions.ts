import { IInsertNewProblem } from "../types/requestsTypes";
import config from "../utils/config";
import urls from "../utils/urls";
import createApiRequest from "./createApiRequest";



export const getCategories = async () =>
    await createApiRequest("GET", `${config.backend}${urls.backend.forms.getCategories}`);

export const getPlaces = async () => await createApiRequest("GET", `${config.backend}${urls.backend.forms.getPlaces}`);

export const insertNewProblem = async (newProblem: IInsertNewProblem, AuthToken: string) => await createApiRequest("POST", `${config.backend}${urls.backend.problem.insertProblem}`, newProblem, AuthToken);

export const getUnsolvedProblems = async (AuthToken: string) =>
    await createApiRequest("GET", `${config.backend}${urls.backend.problem.getUnsolvedProblems}`, {}, AuthToken);