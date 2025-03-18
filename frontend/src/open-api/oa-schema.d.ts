/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/users/{user_id}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                user_id: string;
            };
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    user_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["UserResponse"];
                    };
                };
                default: components["responses"]["DEFAULT_ERROR"];
            };
        };
        put?: never;
        post?: never;
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    user_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description No Content */
                204: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                default: components["responses"]["DEFAULT_ERROR"];
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/register": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["UserRegisterRequest"];
                };
            };
            responses: {
                /** @description Created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["UserRegisterResponse"];
                    };
                };
                422: components["responses"]["UNPROCESSABLE_ENTITY"];
                default: components["responses"]["DEFAULT_ERROR"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/verification": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["VerifyTokenRequest"];
                };
            };
            responses: {
                /** @description Created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["VerifyTokenResponse"];
                    };
                };
                422: components["responses"]["UNPROCESSABLE_ENTITY"];
                default: components["responses"]["DEFAULT_ERROR"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/sign-in": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["UserSignInRequest"];
                };
            };
            responses: {
                /** @description Created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["UserSignInResponse"];
                    };
                };
                422: components["responses"]["UNPROCESSABLE_ENTITY"];
                default: components["responses"]["DEFAULT_ERROR"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/sign-in-with-google": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["UserSignInWithGoogleRequest"];
                };
            };
            responses: {
                /** @description Created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["UserSignInWithGoogleResponse"];
                    };
                };
                422: components["responses"]["UNPROCESSABLE_ENTITY"];
                default: components["responses"]["DEFAULT_ERROR"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/by-email-with-google-token": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query: {
                    email: string;
                    id_token: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["UserResponse"];
                    };
                };
                422: components["responses"]["UNPROCESSABLE_ENTITY"];
                default: components["responses"]["DEFAULT_ERROR"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/documents/put_signed_url": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["PreSignedUrl"];
                    };
                };
                default: components["responses"]["DEFAULT_ERROR"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/documents/{document_id}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                document_id: string;
            };
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    document_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["DocumentResponse"];
                    };
                };
                default: components["responses"]["DEFAULT_ERROR"];
            };
        };
        put?: never;
        post?: never;
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    document_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description No Content */
                204: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                default: components["responses"]["DEFAULT_ERROR"];
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/documents": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["DocumentPaginationResponse"];
                    };
                };
                default: components["responses"]["DEFAULT_ERROR"];
            };
        };
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["CreateDocumentRequest"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["DocumentResponse"];
                    };
                };
                422: components["responses"]["UNPROCESSABLE_ENTITY"];
                default: components["responses"]["DEFAULT_ERROR"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/documents/{document_id}/words": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                document_id: string;
            };
            cookie?: never;
        };
        get: {
            parameters: {
                query?: {
                    page?: number;
                    per_page?: number;
                    search?: string;
                };
                header?: never;
                path: {
                    document_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["DocumentWordPaginationResponse"];
                    };
                };
                422: components["responses"]["UNPROCESSABLE_ENTITY"];
                default: components["responses"]["DEFAULT_ERROR"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/documents/{document_id}/chapters": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                document_id: string;
            };
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    document_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ChapterResponse"][];
                    };
                };
                default: components["responses"]["DEFAULT_ERROR"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/webhook/document-word": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["WebhookDocumentWordArgs"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["WebhookDocumentWordResponse"];
                    };
                };
                422: components["responses"]["UNPROCESSABLE_ENTITY"];
                default: components["responses"]["DEFAULT_ERROR"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/webhook/document-word/error": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["WebhookDocumentWordErrorArgs"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["WebhookDocumentWordErrorResponse"];
                    };
                };
                422: components["responses"]["UNPROCESSABLE_ENTITY"];
                default: components["responses"]["DEFAULT_ERROR"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        Error: {
            /** @description Error code */
            code?: number;
            /** @description Error name */
            status?: string;
            /** @description Error message */
            message?: string;
            /** @description Errors */
            errors?: Record<string, never>;
        };
        PaginationMetadata: {
            total?: number;
            total_pages?: number;
            first_page?: number;
            last_page?: number;
            page?: number;
            previous_page?: number;
            next_page?: number;
        };
        UserResponse: {
            readonly id?: string;
            email?: string;
            name?: string;
        };
        UserRegisterRequest: {
            email?: string;
            name?: string;
            password?: string;
        };
        UserRegisterResponse: {
            readonly id?: string;
            email?: string;
            name?: string;
            token?: string;
        };
        VerifyTokenRequest: {
            token?: string;
        };
        VerifyTokenResponse: {
            readonly id?: string;
        };
        UserSignInRequest: {
            email: string;
            password: string;
        };
        UserSignInResponse: {
            readonly id?: string;
            email?: string;
            name?: string;
        };
        UserSignInWithGoogleRequest: {
            email: string;
            name?: string;
            id_token: string;
        };
        UserSignInWithGoogleResponse: {
            created?: boolean;
            user?: components["schemas"]["UserResponse"];
        };
        PreSignedUrl: {
            readonly url?: string;
        };
        DocumentImportStatusResponse: {
            readonly id?: string;
            document_id?: string;
            /** @enum {string} */
            status?: "PENDING" | "STARTING" | "STARTED" | "PROGRESS" | "COMPLETED" | "FAILED";
            progress?: number;
            total_steps?: number;
            /** Format: date-time */
            created_at?: string;
        };
        DocumentResponse: {
            readonly id?: string;
            /** @enum {string} */
            type?: "BOOK" | "VIDEO" | "TEXT" | "WEB";
            name?: string;
            description?: string;
            /** Format: date-time */
            created_at?: string;
            readonly document_import_status?: components["schemas"]["DocumentImportStatusResponse"] | null;
        };
        Pagination: {
            total?: number;
            pages?: number;
            current_page?: number;
            next_page?: number | null;
            prev_page?: number | null;
        };
        DocumentPaginationResponse: {
            pagination?: components["schemas"]["Pagination"];
            items?: components["schemas"]["DocumentResponse"][];
        };
        CreateDocumentRequest: {
            source: string;
            /** @enum {string} */
            type: "BOOK" | "VIDEO" | "TEXT" | "WEB";
        };
        WordResponse: {
            readonly id?: string;
            word?: string;
            mean?: string;
            level?: number;
            grade?: number;
        };
        DocumentWordResponse: {
            readonly id?: string;
            document_id?: string;
            word_id?: string;
            index?: number;
            chapter_id?: string;
            example?: string;
            duplication?: boolean;
            word_raw?: string;
            readonly word?: components["schemas"]["WordResponse"];
        };
        DocumentWordPaginationResponse: {
            pagination?: components["schemas"]["Pagination"];
            items?: components["schemas"]["DocumentWordResponse"][];
        };
        ChapterResponse: {
            readonly id?: string;
            document_id?: string;
            index?: number;
            name?: string;
            title?: string;
        };
        WebhookDocumentWordArgs: {
            type: string;
            document_id: string;
            chapter_id?: string;
            chapter_index?: number;
            chapter_count?: number;
            has_chapter?: boolean;
            target_chapter_index?: number;
            multiple_save?: boolean;
        };
        WebhookDocumentWordResponse: {
            readonly document_id?: string;
        };
        WebhookDocumentWordErrorArgs: {
            document_id?: string;
        };
        WebhookDocumentWordErrorResponse: {
            readonly document_id?: string;
        };
    };
    responses: {
        /** @description Default error response */
        DEFAULT_ERROR: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description Unprocessable Entity */
        UNPROCESSABLE_ENTITY: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
    };
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
