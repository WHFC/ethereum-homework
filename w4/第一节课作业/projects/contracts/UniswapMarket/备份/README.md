# UniswapMarket.sol
# 因为使用market添加流动性的交易步骤较多，有可能出现run out of gas的错误。所以备份一个拆分了步骤的market合约，将添加流动性的操作拆分为分别存入TokenA、TokenB到market合约中，再调用添加流动性接口。
