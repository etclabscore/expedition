import ERPC from "@etclabscore/ethereum-json-rpc";

export default new ERPC({
    transport: {
        type: "http",
        host: "localhost",
        port: 60178,
    },
});
