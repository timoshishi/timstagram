import isMobile, { isMobileResult } from 'ismobilejs';
import { NextApiRequest } from 'next';
export const isMobileBrowser = (window: Window): isMobileResult => {
  return isMobile(window.navigator);
};

export const isMobileServer = (req: NextApiRequest): isMobileResult => {
  return isMobile(req.headers['user-agent']);
};
