import type {ErrorDetail, ErrorModel} from "#/gen/api/models";

export type ApiError = Error & {
    info?: ErrorModel
    status?: number
}

// "body.email".replace(/^body\./, "") == "email"
export function toValidationErrors(errors?: ErrorDetail[] | null){
    return Object.fromEntries(
        (errors ?? []).filter((error) => error.location && error.message)
            .map((error) => [
                error.location!.replace(/^body\./, ""),
                error.message!,
            ]),
    )
}