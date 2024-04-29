import argon2  from 'argon2';

export class hashPassword {
    async hashPassword (password: string) {
        const hashPassword = await argon2.hash(password);
        return hashPassword;
    }

    async verifyPassword (password: string, hashPassword: string){
        const passwordMatch = await argon2.verify(hashPassword, password);
        return passwordMatch;
    }
}
