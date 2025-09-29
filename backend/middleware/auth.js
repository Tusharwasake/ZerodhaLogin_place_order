export function requireAuth(req, _res, next) {
  if (req.user?.accessToken) return next();
  const token = req.session?.access_token; // or JWT decode
  if (!token)
    return next(Object.assign(new Error("Unauthorized"), { status: 401 }));
  req.user = { accessToken: token };
  next();
}
