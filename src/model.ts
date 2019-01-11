export interface AbiFunction {
    name: string;
    constant: boolean;
    payable: boolean;
    inputs: Array<AbiFunctionInput>;
    outputs: Array<AbiFunctionOutput>;
  }
  
  export interface AbiFunctionInput {
    name: string;
    type: string;
  }
  
  export interface AbiFunctionOutput {
    name: string;
    type: string;
  }
  
  export type Contract = {
    address: string;
    name: string;
    txHash?: string;
    version?: string;
    options?: string;
    abi?: Array<AbiFunction>;
  };