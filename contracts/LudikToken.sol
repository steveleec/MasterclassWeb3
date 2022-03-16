// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LudikToken is ERC20, Ownable {
    IERC20 public busdToken;

    constructor(address _busdAddress) ERC20("LUDIK TOKEN", "LDKT") {
        _mint(msg.sender, 100000 * 10**decimals());
        busdToken = IERC20(_busdAddress);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function purchaseTokensWithBUSD(uint256 _amountBusd) public {
        // verificar si tiene balance en BUSD del comprador
        require(
            busdToken.balanceOf(msg.sender) >= _amountBusd,
            "Cliente no tiene suficiente balance de BUSD."
        );

        // verificar que el contrato tenga LUDIK tokens para enviar
        require(
            balanceOf(address(this)) >= _amountBusd,
            "Contrato inteligente no tiene suficientes fondos."
        );

        // verificar que he dado permiso al smart contract de mover mis fondos
        require(
            busdToken.allowance(msg.sender, address(this)) >= _amountBusd,
            "El cliente no dio permiso para manejar sus fondos."
        );

        busdToken.transferFrom(msg.sender, address(this), _amountBusd);

        IERC20(address(this)).transfer(msg.sender, _amountBusd);
    }
}
