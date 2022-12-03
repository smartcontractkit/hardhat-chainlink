import axios from 'axios'

export const login = async (
    email: string = 'user@hardhatchainlink.io',
    password: string = 'strongpassword777'
): Promise<string> => {
    try {
        console.info(`\nAuthenticating User ${email} using password ${password}\n`)

        const authResponse = await axios.post(
            'http://127.0.0.1:6688/sessions',
            { email, password },
            {
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    referer: 'http://127.0.0.1:6688/signin'
                }
            }
        )

        if (authResponse.status === 429) throw new Error('Too Many Requests')

        const regex = /clsession=[a-zA-Z0-9=\-_]+/g // Grab the session token
        const cookies = authResponse.headers['set-cookie']
        const sessionCookie = cookies?.find((cookie) => cookie.match('clsession'))
        const session = sessionCookie?.match(regex)

        if (session !== null && session !== undefined) {
            return session[0]
        } else {
            throw new Error('Authentication cookie not found')
        }
    } catch (err) {
        console.error('Failed to authenticate user with error: ', err)

        return ''
    }
}
