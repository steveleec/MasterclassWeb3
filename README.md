# Master Class de Web3 y Smart Contracts

### Requisitos

1. Repositorio y Sistema

   - Node version 14.x. Usar nvm para intalar otras versiones de `nodeJS`

   - Hacer fork del [repositorio de la clase](https://github.com/steveleec/MasterclassWeb3/)
   - Ubicarte en el branch `setup` y luego instalar los paquetes de NPM
     - `$ git checkout setup`
     - `$ npm install`
   - Abrir un terminal en la carpeta raíz. Correr el siguiente comando y verificar errores:
     - `$ npx hardhat compile`

2. Billetera

   - Instalar extensión de Metamask en Navegador. Crear cuenta. Habilitar una billetera en Metamask. Cambiar a la red `Rinkeby`. Enviar Ether a la billetera creada usando su ID o address. Para solicitar Ether, buscar en google "rinkeby faucet". Ingresar la dirección (address) de tu billetera en uno de los faucets para recibir crypto. Conseguir al menos `0.5 ETH` de distintos faucets.

3. Crear archivo de Secrets `.env` duplicando el archivo `.env-copy`

   - `$ cp .env-copy .env`

4. Rellenar las claves del archivo `.env`:

   - `API_KEY_ETHERSCAN`: Dirigirte a [Etherscan](http://etherscan.io/). Click en `Sign in`. Click en `Click to sign up` y terminar de crear la cuenta en Etherscan. Luego de crear la cuenta ingresar con tus credenciales. Dirigirte a la columna de la derecha. Buscar `OTHER` > `API Keys`. Crear un nuevo api key haciendo click en `+ Add` ubicado en la esquina superior derecha. Darle nombre al proyecto y click en `Create New API Key`. Copiar el `API Key Token` dentro del archivo `.env`.
   - `PRIVATE_KEY_WALLET_METAMASK`: Obtener el `private key` de la wallet que se creó en el punto `2` siguiendo [estos pasos](http://help.silamoney.com/en/articles/4254246-how-to-generate-ethereum-keys#:~:text=Retrieving%20your%20Private%20Key%20using,password%20and%20then%20click%20Confirm.) y copiarlo en esta variable en el archivo `.env`.
   - `ALCHEMY_URL_RINKBY`: Crear una cuenta en [Alchemy](https://dashboard.alchemyapi.io/). Ingresar al dashboard y crear una app `+ CREATE APP`. Escoger `NAME` y `DESCRIPTION` cualquiera. Escoger `ENVIRONMENT` = `Development`, `CHAIN` = `Ethereum` y `NETWORK` = `Rinkeby`. Hacer click en `VIEW KEY` y copiar el `API KEY` en el documento `.env` para esta variable de entorno. Saltar el paso que te pide incluir tarjeta de débito.

5. Comprobar que no hay ningún error ejecutando el siguiente comando:

   - `$ npx hardhat --network rinkeby run scripts/sample-script.js`
   - Esperar de 2 a 3 minutos mientras se hace el deployment.
   - Si todo fue correctamente ejecutado, se verá el siguiente resultado:

   ```bash
   Compiled 1 Solidity file successfully
   Greeter deployed to: 0x84c523d050ba3C6B180688C468e6Ed7764D3c709
   Nothing to compile
   Successfully submitted source code for contract
   contracts/Greeter.sol:Greeter at 0x84c523d050ba3C6B180688C468e6Ed7764D3c709
   for verification on the block explorer. Waiting for verification result...

   Successfully verified contract Greeter on Etherscan.
   https://rinkeby.etherscan.io/address/0x84c523d050ba3C6B180688C468e6Ed7764D3c709#code
   ```

6. Razones por las cuales el comando anterior podría fallar

   - El archivo `.env` no tiene las claves correctas
   - La llave privada de la billetara de Metamask no cuenta con los fondos suficientes
   - `NodeJS` es una versión antigua

### Desarrollo de la clase

- ¿Qué es blockchain?

  Transaction is the basic atomic of work submitted by the user to be included in the next block. A wallet address is like a bank account. A wallet address is used to send transactions to one another. Before the network validates a transaction, you need a signature. A signature is needed to sign a transaction before including it in the network. After the transaction is signed, it’s included in the mempool. This is where all transactions wait until miners validate that transaction. The network to which the nodes belong to are distributed in nature. Everyone is able to download a copy of the blockchain. There is no centralized ownership of information. Allows the network to determine which transactions are valid. Consensus is a way to create a voting mechanism. Once the network agrees a transaction, a hashed is assigned and placed in a block. Hashing is a process of generating a digital fingerprint. It’s donde through passing data through a passing function. If information changes, the hash will change as well, which invalidates the block. A block is a container of a list of transactions to be added to the block chain. These blocks are linked together using hash values into what we called block chain. Blockchain is a shared ledger in which blocks are linked together. This allows us to see which transactions are valid or not.

![image](https://user-images.githubusercontent.com/3300958/157954809-f5388011-908b-4f5b-9a53-beb1f694d78f.png)


- ¿Qué es Ethereum? ¿Qué es Ethereum Virtual Machine (EVM)?

  Ethereum is an open source, programmable public blockchain platform. The EVM is able to execute logic and algorithms and process data inputs.

  In Ethereum a user is able to create their own operations. They could create their own crypto currencies and tokens. Ethereum is turing complete, meaning that it’s able to run code written by a developer o executed by an end user.

  EVM is the heart of ethereum and responsible of building application in the Ethereum network.

- ¿Qué es un smart contract?

  A developer can write a program using solidity. It’s submitted to an EVM to run for execution.

  Smart Contract is basically a contract written in code. It’s set up between a negotiations between two paties. It’s an object on the Ethereum blockchain that contain EVM code functions. Can store data, make decision, interact with other contracts and send ether. No one can take it down. It will only disappear if it’s programmed to do that.

- ¿Qué es Solidity Languge?

  Solidity: high level language for coding and deploying smart contracts. Influenced by c++, java and python and javascript. Statically typed. Supports inheritance and the usage of libraries.

  Statically typed:

  ```solidity
   function transferOwnership(address newOwner) public onlyOwner {
          require(newOwner != _owner && newOwner != address(0), WRONG_ADDRESS);
          address oldOwner = _owner;
          _owner = newOwner;
          admins[newOwner] = true;
          emit OwnershipTransferred(oldOwner, newOwner);
      }
  ```

  Inheritance:

  ```solidity
  contract PrizeStrategy is
      IPrizeStrategy,
      Initializable,
      AccessControlUpgradeable,
      ReentrancyGuardUpgradeable,
      PausableUpgradeable
  {}
  ```

- Solidity Language

  - Struct

    ```solidity
    struct winnerRandomNumber {
    	uint256 randomNumber;
    	uint256 tier;
    }
    ```

  - Mapping

    ```solidity
    /**
     * @dev mapping from vault id to the the amount that reprents the amount from which the percentages
     * are calculated
    */
     mapping(uint256 => uint256) prizes;
    ```

    `mapping` se parece un objecto en Javascript. El equivalente sería el siguiente:

    ```js
    // Solidity
    mapping(uint256 => uint256) prizes;
    // Guardando data
    prizes[1241] = 1321;
    // Leyendo data
    prizes[1241]; // 1321

    // Javascript
    var prizes = {}
    prizes[1241] = 1321;
    // O lo que es lo mismo
    var prizes = {
      "1241": 1321
    }
    ```

    La diferencia es que en solidity el rango de posibilidades está delimitada por el tipo del dato `uint256`, `address`, `string`, etc.

  - Visibility Words for functions

    - `internal`: se puede usar dentro del contrato. Tambié se hereda
    - `view`: function que no modifica el estado. Solo lectura
    - `public`: function que permite leer, cambiar el estado, usar internamente y externamente.
    - `external`: function que no se puede usar dentro del contrato. Solo usado por usuarios externos

    ```solidity
    function _getPrizesArr(uint256 _numberOfPrizes, uint256 _vaultId)
        internal
        view
        returns (uint256[] memory _prizesArr)
    {}

    function _sort(winnerRandomNumber[] memory data)
        public
        returns (winnerRandomNumber[] memory)
    {}

    function computeRewards(uint256 _vaultId, address[] memory _users)
        external
        override
        onlyRole(VAULT_MANAGER_ROLE) // <- MODIFIER HERE
    {
    ```

  - Modifiers

    ```solidity
    // Modifier file
    /**
        * @dev Throws if called by any account other than the owner.
        */
    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    // Usando el Modifier
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    ```

  - Manejo de Errores

    ```solidity
    require(
        whiteList[_msgSender()] || !whitelistFilterActive,
        "Private Sale: Customer is not in Whitelist."
    );

    require(
        _amountBusdSpent.add(_amountBusd) <= limitPerWallet * 10**18,
        "Private Sale: 500 BUSD is the maximun amount of purchase."
    );

    // Verify if customer has BUSDC balance
    require(
        busdToken.balanceOf(_msgSender()) >= _amountBusd,
        "Private Sale: Customer does not have enough balance."
    );
    ```

    Errores que se mostrará en el escáner. Provee información adicional para el usuario final. Veamos algunos ejemplos:

    1. [Usuario no está en una lista blanca](https://bscscan.com/tx/0x41c1c88265c7bc822288409039f0e7b7516136546093039234d7a428be31a696)
    2. [Usuario no tiene balance](https://bscscan.com/tx/0xbcc61cf0888eac380bd1d383d829d81b8b92a265c3a3acb9722bd81b76e7efea)
    3. [Error Desconocido - Mala práctica](https://bscscan.com/tx/0xa5357ff8066d4d1564a510c87a63d2f73375e84e63456aff42558a884631f0db)

- Desarrollando un contrato de compra y venta de tokens
  - Ejemplo: Código de la moneda [Cuy Token](https://bscscan.com/address/0xc13d76461aa8523002f2bee4c72daa3f91bcb0b9#code). Hay duplicación de código innecesaria.
  - Ejemplo: Moneda Pachacuy usando Librearías
  - Ejemplo: Contrato de pre compra-venta Pachacuy [Código](https://bscscan.com/address/0x711c0a54f82f56fdbffcd7cc1aefa80ec44cf42c#code), [Transacciones](https://bscscan.com/address/0x31102c8a033f0ba562baa081567aa9b710e25e3c)
  - Crear un template usando [Wizard de OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/wizard)
  - Obtener BNB de un [faucet](https://testnet.binance.org/faucet-smart/)
  - Añadir funciones para intercambiar BUSD con LDK token.
