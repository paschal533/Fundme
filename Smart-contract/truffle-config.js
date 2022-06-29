const path = require("path");
const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  compilers: {
    solc: {
      version: '0.8.0',
      parser: 'solcjs'
    }
  },
  contracts_build_directory: path.join(__dirname, "../Frontend/contracts"),
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    rinkeby: {
      provider: () => {
        const mnemonic = process.env.PrivateKey;
        const project_id = process.env.Project_id;
        return new HDWalletProvider(
          mnemonic,
          `https://rinkeby.infura.io/v3/${project_id}`
        );
      },
      network_id: "*"
    }
  }
};
