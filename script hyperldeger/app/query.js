const { Gateway, Wallets } = require("fabric-network");
const fs = require("fs");
const path = require("path");
const log4js = require("log4js");
const logger = log4js.getLogger("BasicNetwork");
const util = require("util");

const helper = require("./helper");
const queryTransaction = async (
  channelName,
  chaincodeName,
  args,
  fcn,
  username,
  orgName
) => {
  try {
    let random = Math.floor(Math.random() * 4)
    switch (random) {
      case 0:
        orgName = "Penangkar"
        break;
      case 1:
        orgName = "Petani"
        break;
      case 2:
        orgName = "Pengumpul"
        break;
      case 3:
        orgName = "Pedagang"
        break;
      default:
        break;
    }
  
    username = "admin"

    // load the network configuration
    // const ccpPath = path.resolve(__dirname, '..', 'config', 'connection-org1.json');
    // const ccpJSON = fs.readFileSync(ccpPath, 'utf8')
    const ccp = await helper.getCCP(orgName); //JSON.parse(ccpJSON);

    // Create a new file system based wallet for managing identities.
    const walletPath = await helper.getWalletPath(orgName); //.join(process.cwd(), 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the user.
    let identity = await wallet.get(username);
    if (!identity) {
      console.log(
        `An identity for the user ${username} does not exist in the wallet, so registering user`
      );
      await helper.getRegisteredUser(username, orgName, true);
      identity = await wallet.get(username);
      console.log("Register first before retrying");
      return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: username,
      discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

    // Get the contract from the network.
    const contract = network.getContract(chaincodeName);
    let result;

    switch (fcn) {
      case "GetDocumentUsingCarContract":
        console.log("=============");
        result = await contract.evaluateTransaction(
          "SmartContract:" + fcn,
          args[0]
        );
        break;
      case "GetManggaByID":
        console.log("=============");
        result = await contract.evaluateTransaction(
          "BawangContract:" + fcn,
          args[0]
        );
        break;
      case "GetUserByID":
        console.log("=============");
        result = await contract.evaluateTransaction(
          "UserContract:" + fcn,
          args[0]
        );
        break;
      case "GetHistoryForAssetByID":
        console.log("=============");
        result = await contract.evaluateTransaction(
          "BawangContract:" + fcn,
          args[0]
        );
        break;
      case "GetManggaForQuery":
        console.log("=============");
        result = await contract.evaluateTransaction(
          "BawangContract:" + fcn,
          args[0]
        );
        break;
        // case "CreateUser":
        //   result = await contract.submitTransaction(
        //     "UserContract:" + fcn,
        //     args[0]
        //   );
        //   console.log(result.toString());
        //   result = { txid: result.toString() };
        //   break;
      default:
        break;
    }

    // if (fcn == "queryCar" || fcn =="queryCarsByOwner" || fcn == 'getHistoryForAsset' || fcn=='restictedMethod') {
    //     result = await contract.evaluateTransaction(fcn, args[0]);

    // } else if (fcn == "readPrivateCar" || fcn == "queryPrivateDataHash"
    // || fcn == "collectionCarPrivateDetails") {
    //     result = await contract.evaluateTransaction(fcn, args[0], args[1]);
    //     // return result

    // }
   
    console.log(`Buffer result: ${result}`);
    console.log(
      `Transaction has been evaluated, result to string is to: ${result.toString()}`
    );
    console.log(
      `Transaction has been evaluated, result is: ${result}`
    );

    result = JSON.parse(result.toString());
    return result;
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    return error.message;
  }
};

exports.queryTransaction = queryTransaction;
