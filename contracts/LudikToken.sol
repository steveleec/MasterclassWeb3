// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LudikToken is ERC20, Pausable, Ownable {
    IERC20 public busdToken;

    constructor(address _busdAddress) ERC20("Ludik Token", "LDK") {
        _mint(address(this), 100 * 10**6 * 10**decimals());
        busdToken = IERC20(_busdAddress);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function purchaseLudikTokens(uint256 _amountBusd) public {
        // Verify if customer has BUSDC balance
        require(
            busdToken.balanceOf(msg.sender) >= _amountBusd,
            "Cliente no tiene suficiente balance de BUSD."
        );

        // Verify id customer has given allowance to Private Sale Two smart contract
        require(
            busdToken.allowance(msg.sender, address(this)) >= _amountBusd,
            "El cliente no dio permiso para transferir sus fondos."
        );

        require(
            balanceOf(address(this)) >= _amountBusd,
            "Contrato inteligente no tiene suficientes fondos."
        );

        // Enviando BUSD tokens del que llama la función al contrato
        busdToken.transferFrom(msg.sender, address(this), _amountBusd);

        // // Enviando LUDIK tokens al comprandor
        IERC20(address(this)).transfer(msg.sender, _amountBusd);
    }

    // Stats
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }
}
