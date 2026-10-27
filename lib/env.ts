type PublicEnvironment = {
    supabaseUrl: string
    supabaseAnonKey: string
    adminPassword?: string
}

function required(name: string, value: string | undefined): string {
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`)
    }

    return value
}

export function getPublicEnvironment(): PublicEnvironment {
    return {
        supabaseUrl: required('NEXT_PUBLIC_SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL),
        supabaseAnonKey: required('NEXT_PUBLIC_SUPABASE_ANON_KEY', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
        adminPassword: process.env.ADMIN_PASSWORD,
    }
}
