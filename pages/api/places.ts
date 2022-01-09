// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { IPlace } from '../../models/IPlace'
import { arrayOfObj } from '../../utils/utils'
import { place } from '../../utils/dbschema'

export default function handler(req: NextApiRequest, res: NextApiResponse<IPlace[]>) {
  const places = [...arrayOfObj(place, 9)]

  res.status(200).json(places)
}
