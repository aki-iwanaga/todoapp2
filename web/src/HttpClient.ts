export interface HttpClient {
    post(path: string, body?: any): Promise<any>;

    get(path: string): Promise<any>;

    patch(path: string, body?: any): Promise<any>;

    delete(path: string): Promise<any>;
}
