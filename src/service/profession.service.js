import httpServer from "./http.service";

const urlProfession = `profession/`;

const professionService = {
    fetchAll: async () => await httpServer.get(urlProfession)
};

export default professionService;
