export enum ApiResponseType {
    SUCCES = 'SUCCES',
    ERROR = 'ERROR',
}

export type ApiResponse<T> =
    | {
          type: ApiResponseType.ERROR
      }
    | {
          type: ApiResponseType.SUCCES
          data: T
      }
