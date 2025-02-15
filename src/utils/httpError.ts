export const HttpError = (status: number, message: string) => {
    const error = new Error(message) as Error & { status: number };
    error.status = status;
    return error
}