// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NEXT_PUBLIC_API_CACHE_TIME_IN_SECOND } from "const/config";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: `OK ${NEXT_PUBLIC_API_CACHE_TIME_IN_SECOND}s` });
}
