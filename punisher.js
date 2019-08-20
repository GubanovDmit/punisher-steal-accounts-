const { setScript, broadcast, waitForTx } = require('@waves/waves-transactions')
const fs = require("fs");
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('setAccount.txt')
  });
  
 

const nodeUrl = 'https://testnodes.wavesnodes.com';
const seed = 'consider lake absorb huge olive bonus galaxy mass never input amateur hen rifle clown rain'
	

lineReader.on('line', function (line) {
    let Pubkey =  line;
    const params = {
        script: 'AwQAAAAHUHViS2V5MQEAAAAgaQxxSAhSITOlMYdvwKcfK7u/x0yzOg/68EH0ax0QlWUEAAAAB1B1YktleTIBAAAAILb58FcZXTIbjEshMW6ayDB2XcNop87YatlbtNE8j6N0BAAAAARzaWcxAwkAAfQAAAADCAUAAAACdHgAAAAJYm9keUJ5dGVzCQABkQAAAAIIBQAAAAJ0eAAAAAZwcm9vZnMAAAAAAAAAAAAFAAAAB1B1YktleTEAAAAAAAAAAAEAAAAAAAAAAAAEAAAABHNpZzIDCQAB9AAAAAMIBQAAAAJ0eAAAAAlib2R5Qnl0ZXMJAAGRAAAAAggFAAAAAnR4AAAABnByb29mcwAAAAAAAAAAAQUAAAAHUHViS2V5MgAAAAAAAAAAAQAAAAAAAAAAAAkAAGYAAAACCQAAZAAAAAIFAAAABHNpZzEFAAAABHNpZzIAAAAAAAAAAADO+UOI',
        senderPublicKey: Pubkey,
        fee: 1400000,
        chainId: 'T'
      }

      const signedSetScriptTx = setScript(params, seed)
      broadcast(signedSetScriptTx, nodeUrl).then(p=> {
        waitForTx(p.id).then(r=> console.log(Pubkey))  
      })
       //       .then(() => {
 //           waitForTx(signedSetScriptTx.id)
 //           .then(res => {
 //               console.log(signedSetScriptTx.id)
 //           })
 //           .catch(()=> {})
 //       })
 //       .catch(()=> {})
 //   //   async() =>{
    //   try{
    //     console.log(signedSetScriptTx)
    //     await broadcast(signedSetScriptTx, nodeUrl).then(resp => console.log(resp))
    //     }
    //     catch(error){

    //         console.log(line + ' - ok')
    //     }
    //   }
});