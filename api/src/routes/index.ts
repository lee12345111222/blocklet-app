import middleware from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';
import openDb from '../database';

const router = Router();

router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));

router.use('/data', (_, res) =>
  res.json({
    message: 'Hello Blocklet!',
  }),
);

router.get('/profile', async (_req, res) => {
  const db = await openDb();
  const profile = await db.get('SELECT * FROM profile LIMIT 1');
  res.json(profile);
});

router.get('/profiles', async (_req, res) => {
  const db = await openDb();
  const profiles = await db.all('SELECT * FROM profile');
  res.json(profiles);
});

router.get('/profile/email/:email', async (req, res) => {
  const { email } = req.params;
  const db = await openDb();
  const profile = await db.get('SELECT * FROM profile WHERE email = ?', [email]);
  res.json(profile);
});

router.get('/profile/phone/:phone', async (req, res) => {
  const { phone } = req.params;
  const db = await openDb();
  const profile = await db.get('SELECT * FROM profile WHERE phone = ?', [phone]);
  res.json(profile);
});

router.post('/profile', async (req, res) => {
  const { username, email, phone, remark, address } = req.body;
  const db = await openDb();

  const existingProfileWithEmail = await db.get('SELECT * FROM profile WHERE email = ?', [email]);
  const existingProfileWithPhone = await db.get('SELECT * FROM profile WHERE phone = ?', [phone]);

  if (existingProfileWithEmail) {
    await db.run('UPDATE profile SET username = ?, email = ?, phone = ?, remark = ?, address = ? WHERE id = ?', [
      username,
      email,
      phone,
      remark,
      address,
      existingProfileWithEmail.id,
    ]);
    res.status(200).json({ message: 'Profile updated' });
  } else if (existingProfileWithPhone) {
    await db.run('UPDATE profile SET username = ?, email = ?, phone = ?, remark = ?, address = ? WHERE id = ?', [
      username,
      email,
      phone,
      remark,
      address,
      existingProfileWithPhone.id,
    ]);
    res.status(200).json({ message: 'Profile updated' });
  } else {
    await db.run('INSERT INTO profile (username, email, phone, remark, address) VALUES (?, ?, ?, ?, ?)', [
      username,
      email,
      phone,
      remark,
      address,
    ]);
    res.status(200).json({ message: 'Profile created' });
  }
});

export default router;
