import {MailtrapClient} from "mailtrap";
import system_data from "../../config/environment/env.constants.js";

const mailtrap_client = new MailtrapClient({
    token: system_data.MAILTRAP_TOKEN
});

const mailtrap_sender = {
    email: "hello@kiist.ac.ke",
    name: "Kisii Impact Institute of Science and Technology",
};

export {
    mailtrap_sender,
    mailtrap_client,
};