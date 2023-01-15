export enum ApiResponseType {
    SUCCES = 'SUCCESS',
    ERROR = 'ERROR',
}

export type ApiResponse<DataType> =
    | {
          type: ApiResponseType.SUCCES
          data: DataType
      }
    | {
          type: ApiResponseType.ERROR
      }