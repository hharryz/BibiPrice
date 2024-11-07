export const filterSpace = (string: string | undefined) => {
  return string?.replace(/\s+/g, " ").trim();
};

export const userAgent =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36";
