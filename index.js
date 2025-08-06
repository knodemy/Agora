const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

const app = express();

const appId = process.env.AGORA_APP_ID;
const appCertificate = process.env.AGORA_APP_CERTIFICATE;
const channelName = "demo-channel"; // Fixed channel
const uid = 0;
const role = RtcRole.PUBLISHER;
const expirationTimeInSeconds = 3600;

app.get('/generate-token', (req, res) => {
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

  res.json({
    agora_app_id: appId,
    agora_channel: channelName,
    agora_token: token
  });
});

app.get('/', (req, res) => {
  res.send('Agora token service is live!');
});

// ✅ THIS is the Vercel-compatible export
module.exports = app;
