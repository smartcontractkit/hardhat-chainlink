require('@nomicfoundation/hardhat-toolbox')
// require('./dist')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545'
    },
    hardhat: {
      // See its defaults
    }
  },
  solidity: {
    compilers: [
      {
        version: '0.8.9'
      },
      {
        version: '0.4.24'
      },
      {
        version: '0.6.0'
      }
    ]
  }
}
