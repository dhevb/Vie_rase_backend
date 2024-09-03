import { Request, Response } from 'express';
import { getUserByEmail, getUserById } from '../models/userModel';
export const getUserDetailsEmail = async (req: Request, res: Response) => {
  const { email } = req.params;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Error retrieving user details' });
  }
}


export const getUserDetailsId = async (req: Request, res: Response) => {
  const {id } = req.params;

  try {
    const user = await getUserById(Number(id));

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Error retrieving user details' });
  }
};
