import api from "../api/apiClient";

const SERVICE_ID = "JJ";

const authService = {

    async login(userId, password) {

        const form = new URLSearchParams();

        form.append("serviceId", SERVICE_ID);
        form.append("userId", userId);
        form.append("pwd", password);

        const { data } = await api.post(

            "/login",

            form,

            {

                headers: {

                    "Content-Type": "application/x-www-form-urlencoded"

                }

            }

        );

        if (!Array.isArray(data) || data.length === 0) {

            return null;

        }

        const user = data[0];

        delete user.PASSWORD;

        return user;

    }

};

export default authService;