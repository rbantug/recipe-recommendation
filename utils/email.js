import { MailtrapClient } from "mailtrap";

export default class Email {
    constructor(user, url) {
        this.user = user
        this.to = user.email
        this.firstName = user.fullName.split(' ')[0]
        this.lastName = user.fullName.split(' ')[1],
            this.url = url
        this.from = process.env.MAILTRAP_EMAIL_FROM
    }

    newTransport() {

        if (process.env.NODE_ENV === 'production') {
            const client = new MailtrapClient({
                token: process.env.MAILTRAP_TOKEN
            })

            return client
        }

        if (process.env.NODE_ENV === 'development') {
            const client = new MailtrapClient({
                token: process.env.MAILTRAP_TOKEN,
                testInboxId: 3283668,
                accountId: 2123839
            })

            return client.testing
        }
    }

    async sendResetPasswordEmail() {
        const res = await this.newTransport().send({
            from: {
                email: this.from,
                name: 'Reset Password'
            },
            to: [{ email: this.to }],
            template_uuid: "838da1d4-469f-406b-8c66-de3b8537b5a3",
            template_variables: {
                "company_info_name": "Recipe Recommendation",

                "name": this.firstName,

                "company_info_address": "10 South Avenue",

                "company_info_city": "Manila",

                "company_info_zip_code": "1000",

                "company_info_country": "Philippines",

                "link_to_reset_password": this.url,

                "link_to_report": "www.hottubetofu.com",
            }
        })
        return res
    }
}