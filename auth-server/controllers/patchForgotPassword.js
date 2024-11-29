export default function makePatchForgotPassword({ listUserByEmail, editPasswordResetTokenAndExpires, Email, AppError }) {
    return async function patchForgotPassword(httpRequest) {
        const headers = {
            'Content-Type': 'application/json',
        };

        try {
            const { email } = httpRequest.body

            if (!email) {
                throw new AppError('Please provide an email address', 400)
            }

            // Use the email to check if the user exist
            const getUser = await listUserByEmail(email)

            // update the passwordResetToken and passwordResetExpires
            const { resetToken, updatedUser } = await editPasswordResetTokenAndExpires({ userId: getUser.id, createToken: true })

            // use email service to send email with reset token
            const resetHTML = `${httpRequest.protocol}://${httpRequest.host}/resetPassword/${resetToken}`;

            const sendEmail = new Email(getUser, resetHTML)

            const res = await sendEmail.sendResetPasswordEmail().catch(async(err) => {
                await editPasswordResetTokenAndExpires({ userId: getUser.id, createToken: false })
                
                console.log(err.message)
                
                throw new AppError('There was an error sending the email. Please try again.', 500)
            })

            if (Object.hasOwn(res, 'success') && res.success) {
                return {
                    headers,
                    status: 'success',
                    message: 'Token was sent to the user\'s email',
                    statusCode: 200,
                    data: {
                        resetToken
                    }
                }
            }
        } catch (error) {
            return {
                headers,
                status: 'fail',
                message: error.message,
                statusCode: error.statusCode || 400,
                stack: error.stack
            }
        }
    }
}