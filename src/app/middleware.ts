function urlVerifier(req: Request, res: Response, next: any) {
  if (req.url.startsWith("_next/")) {
    return next();
  }

  next();
}

module.exports = {
  middleware: [urlVerifier],
};
