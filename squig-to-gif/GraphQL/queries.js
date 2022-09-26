import { gql } from "graphql-request";

export const SquigLookup = (tokenId) => {
    return gql`
        query SquigLookup {
          token(token: {address: "0x059edd72cd353df5106d2b9cc5ab83a52287ac3a", 
          tokenId: "${tokenId}"}, 
          network: {chain: MAINNET, network: ETHEREUM}) {
            token {
              metadata
            }
          }
        }        
    `;
    }