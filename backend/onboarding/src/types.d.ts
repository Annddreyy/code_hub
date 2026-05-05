import type { JwtPayload } from '@/pkg/jwt';

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }

    type RequestWithParams<T> = Request<T>;
    type RequestWithBody<T> = Request<object, object, T>;
    type RequestWithQuery<T> = Request<object, object, object, T>;
    type RequestWithParamsAndBody<T, K> = Request<T, object, K>;
}
