export interface Auth {
  userName: string;
  password: string;
  token?: string;  // Token opcional, usado en los procesos de autenticación
}

export interface ApiResponse<T>{
  message?:string;
  data:T;
}

