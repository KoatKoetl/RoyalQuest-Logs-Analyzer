declare namespace Express {
  export interface Request {
    user?: {
      name: string;
      iat: number;
    };
  }
}
