import { Request, Response } from 'express';
import { getUserById } from '../models/userModel';

export const getUserDetails = async (req: Request, res: Response) => {
  const { id } = req.params;

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
