import erpc from "./erpc";

const getBlocks = (from: number, to: number): Promise<any> => {
    const promises: any[] = [];
    for (let i = from; i < to; i++) {
        promises.push(erpc.eth_getBlockByNumber(`0x${i.toString(16)}`, true));
    }
    return Promise.all(promises);
};

export default getBlocks;
