export const checkSquig = (tokenID) => {
    const squigsMinted = 9675;
    if (
      (tokenID === undefined) |
      (tokenID === null) |
      (tokenID > squigsMinted) |
      (tokenID < 0)
    ) {
      return tokenID = Math.floor(Math.random() * squigsMinted);
    } else {
        return tokenID
    }

}


