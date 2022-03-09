# Master Class de Web3 y Smart Contracts

### Requisitos

1. Repositorio y Sistema

   - Node version 14.x. Usar nvm para intalar otras versiones de `nodeJS`

   - Hacer fork del repositorio de la clase:
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
