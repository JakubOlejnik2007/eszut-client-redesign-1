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

export const getSolvedProblems = async (AuthToken: string, page: number) =>
    await createApiRequest(
        "GET",
        `${config.backend}${urls.backend.problem.getSolvedProblems}?page=${page}`,
        {},
        AuthToken
    );

export const putTakeOnProblem = async (AuthToken: string, ProblemID: string) =>
    await createApiRequest(
        "PUT",
        `${config.backend}${urls.backend.problem.takeOnProblem}`,
        { ProblemID },
        AuthToken
    );

export const putRejectProblem = async (AuthToken: string, ProblemID: string) =>
    await createApiRequest("PUT", `${config.backend}${urls.backend.problem.rejectProblem}`, { ProblemID }, AuthToken);

export const putMarkAsSolved = async (AuthToken: string, ProblemID: string) =>
    await createApiRequest(
        "PUT",
        `${config.backend}${urls.backend.problem.markProblemAsSolved}`,
        { ProblemID },
        AuthToken
    );

export const putMarkProblemAsUnsolved = async (AuthToken: string, ProblemID: string) =>
    await createApiRequest(
        "PUT",
        `${config.backend}${urls.backend.problem.markProblemAsUnsolved}`,
        { ProblemID },
        AuthToken
    );

export const putUpdateUnsolvedProblem = async (
    AuthToken: string,
    priority: string,
    PlaceID: string,
    CategoryID: string,
    ProblemID: string
) =>
    await createApiRequest(
        "PUT",
        `${config.backend}${urls.backend.problem.updateProblem}`,
        { ProblemID, CategoryID, priority, PlaceID },
        AuthToken
    );

export const getLogData = async (AuthToken: string, page: number) => await createApiRequest("GET", `${config.backend}${urls.backend.logs.getLogData}?page=${page}`, {}, AuthToken)


export const createLongPeriodToken = async (
    AuthToken: string,
    daysToExpire: number,
    name: string

) =>
    await createApiRequest(
        "POST",
        `${config.backend}${urls.backend.token.createToken}`,
        { daysToExpire, name },
        AuthToken
    );

export const getActiveTokens = async (
    AuthToken: string,
) =>
    await createApiRequest(
        "GET",
        `${config.backend}${urls.backend.token.getTokens}`,
        {},
        AuthToken
    );

export const insertNewPlace = async (
    AuthToken: string,
    name: string,

) => await createApiRequest("POST", `${config.backend}${urls.backend.forms.insertNewPlace}`, {name}, AuthToken);

export const deletePlace = async (
    AuthToken: string,
    PlaceID: string,
) => await createApiRequest("DELETE", `${config.backend}${urls.backend.forms.deletePlace}`, {PlaceID}, AuthToken);