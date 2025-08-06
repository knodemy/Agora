const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

const app = express();

const appId = process.env.AGORA_APP_ID;
const appCertificate = process.env.AGORA_APP_CERTIFICATE;

app.get('/', (req, res) => {
  res.send('Hello from Vercel!');
});

app.get('/generate-token', (req, res) => {
  const channelName = req.query.channel || 'demo-channel';
  const uid = parseInt(req.query.uid) || 0;
  const role = RtcRole.PUBLISHER;
  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCertificate,
    channelName,
    uid,
    role,
    privilegeExpiredTs
  );

  res.json({ token, channelName, uid });
});

// 👇 Export handler instead of app.listen()
module.exports = app;
