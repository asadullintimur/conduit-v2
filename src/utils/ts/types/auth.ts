export interface User {
    email: string,
    token?: string,
    username: string,
    bio: string | null,
    image: string | null
}

export interface RegisterCredentials {
    email: string | null,
    username:  string | null,
    password:  string | null
}

export interface RegisterPayload {
    user: RegisterCredentials
}

export interface  LoginCredentials {
    email:  string | null,
    password:  string | null
}

export interface LoginPayload {
    user: LoginCredentials
}
