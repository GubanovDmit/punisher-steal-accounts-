const { setScript, broadcast, waitForTx } = require('@waves/waves-transactions')
const fs = require("fs");

const nodeUrl = 'https://testnodes.wavesnodes.com';
const seed = 'consider lake absorb huge olive bonus galaxy mass never input amateur hen rifle clown rain'
console.log('start');
const file = fs.readFileSync('./setAccount.txt', 'utf8');
const publicKeyList = file.split('\n').map(line => line.trim());

const loop = () => {
  if (!publicKeyList.length) {
    console.log('Done');
    return null;
  }

  const key = publicKeyList.pop();
  const params = {
    script: 'AwQAAAAHUHViS2V5MQEAAAAgaQxxSAhSITOlMYdvwKcfK7u/x0yzOg/68EH0ax0QlWUEAAAAB1B1YktleTIBAAAAILb58FcZXTIbjEshMW6ayDB2XcNop87YatlbtNE8j6N0BAAAAARzaWcxAwkAAfQAAAADCAUAAAACdHgAAAAJYm9keUJ5dGVzCQABkQAAAAIIBQAAAAJ0eAAAAAZwcm9vZnMAAAAAAAAAAAAFAAAAB1B1YktleTEAAAAAAAAAAAEAAAAAAAAAAAAEAAAABHNpZzIDCQAB9AAAAAMIBQAAAAJ0eAAAAAlib2R5Qnl0ZXMJAAGRAAAAAggFAAAAAnR4AAAABnByb29mcwAAAAAAAAAAAQUAAAAHUHViS2V5MgAAAAAAAAAAAQAAAAAAAAAAAAkAAGYAAAACCQAAZAAAAAIFAAAABHNpZzEFAAAABHNpZzIAAAAAAAAAAADO+UOI',
    senderPublicKey: key,
    fee: 1400000,
    chainId: 'T'
  }
  const signedSetScriptTx = setScript(params, seed)
  broadcast(signedSetScriptTx, nodeUrl)
    .then(tx => waitForTx(tx.id, {apiBase: nodeUrl}))
    .then(() => {
      console.log(`Set Script for public key ${key} success!`);
      loop();
    }, () => {
      console.log(`Can't set script for public key ${key}!`);
      loop();
    });
}

loop();