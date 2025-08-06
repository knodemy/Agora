const express = require('express');
const app = express();
const port = 3000;
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

const appId = "7ba3fc8a7694427191f8470eaa115713";
const appCertificate = "3c12059c53c44cd6bf9e34dad7fce6d6";
const channelName = "testChannel";
const uid = 0; // or any user ID
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

console.log("Generated Token:", token);

app.get('/', (req, res) => {
    res.send('Hello World from Node.js!');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
