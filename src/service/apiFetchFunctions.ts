import config from "../utils/config";
import urls from "../utils/urls";
import createApiRequest from "./createApiRequest";

export const getCategories = async () =>
    await createApiRequest("GET", `${config.backend}${urls.backend.forms.getCategories}`);

export const getPlaces = async () => await createApiRequest("GET", `${config.backend}${urls.backend.forms.getPlaces}`);