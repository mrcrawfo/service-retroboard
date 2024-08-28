import jsonwebtoken from 'jsonwebtoken';

export interface AuthTokenPayload {
    userId: number;
    message?: string;
}

export const auth = (header: string): AuthTokenPayload => {
    const token = header.split(' ')[1];

    if (!token || token === 'null') {
        throw new Error('Invalid token');
    }

    try {
        return jsonwebtoken.verify(token, process.env.TOKEN_SECRET as jsonwebtoken.Secret) as AuthTokenPayload;
    } catch (_error) {
        return { userId: null, message: 'jwt expired' } as AuthTokenPayload;
    }
};
