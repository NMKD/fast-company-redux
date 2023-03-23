import httpServer from "./http.service";

const urlUsers = `user/`;

const userService = {
    create: async (payload) =>
        await httpServer.put(`${urlUsers}${payload._id}`, payload),
    update: async (payload) =>
        await httpServer.put(`${urlUsers}${payload._id}`, payload),
    getAuth: async (id) => await httpServer.get(`${urlUsers}${id}`),
    fetchAll: async () => await httpServer.get(urlUsers)
};

export default userService;
