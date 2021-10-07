require("ts-node").register({
  files: true,
});

module.exports = {
  test_file_extension_regexp: /.*\.ts$/,
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
};
