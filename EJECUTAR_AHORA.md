# 🚀 GUÍA DE EJECUCIÓN INMEDIATA - RAILDROP

## ⚡ Prueba el Proyecto AHORA (15 minutos)

Vamos a deployar el smart contract a Avalanche Fuji testnet y probarlo.

---

## PASO 1: Obtener AVAX de Testnet (5 minutos)

### Opción A: Usar el Faucet Oficial
1. Ve a: https://faucet.avax.network/
2. Selecciona "Fuji (C-Chain)"
3. Pega tu wallet address (MetaMask o cualquier wallet)
4. Click "Request 2 AVAX"
5. Espera 1-2 minutos

### Opción B: Faucet Alternativo
1. Ve a: https://core.app/tools/testnet-faucet/
2. Conecta tu wallet
3. Request AVAX

**Tu Wallet Address:**
- Abre MetaMask
- Copia tu address (0x...)
- Guárdala para el siguiente paso

---

## PASO 2: Configurar Variables de Entorno (2 minutos)

```bash
cd /Users/jquiceva/Documents/GitHub/eventmetrycs-1.0-rv/raildrop-demo

# Crear archivo .env
cp env.template .env

# Editar .env
nano .env
```

**Contenido del .env:**
```bash
# Tu private key (SIN el 0x al inicio)
PRIVATE_KEY=tu_private_key_aqui

# Snowtrace API key (opcional, para verificación)
SNOWTRACE_API_KEY=opcional
```

**¿Cómo obtener tu Private Key?**

### En MetaMask:
1. Click en los 3 puntos
2. "Account Details"
3. "Show Private Key"
4. Ingresa tu password
5. Copia la key (SIN el 0x)

⚠️ **IMPORTANTE**: Usa una wallet de TESTNET, no tu wallet principal!

---

## PASO 3: Verificar Configuración (1 minuto)

```bash
# Verificar que todo esté instalado
npm run compile

# Deberías ver:
# "Nothing to compile" o "Compiled successfully"
```

---

## PASO 4: Deploy a Fuji Testnet (3 minutos)

```bash
npm run deploy:fuji
```

**Output esperado:**
```
🚀 Deploying RailDropEscrow...

📝 Deploying with account: 0xTuAddress...
💰 Account balance: 2.0 AVAX

⏳ Deploying contract...

✅ SUCCESS! Contract deployed to: 0x1234abcd...
🔗 View on Explorer: https://testnet.snowtrace.io/address/0x1234abcd...

📋 Save this address for frontend:
   CONTRACT_ADDRESS="0x1234abcd..."

🎉 Deployment complete!
```

**GUARDA EL CONTRACT ADDRESS!**

---

## PASO 5: Verificar en Snowtrace (2 minutos)

1. Abre el link del explorer que te dio el script
2. Verás tu contrato deployado
3. Click en "Contract" tab
4. Deberías ver el código verificado

---

## PASO 6: Interactuar con el Contrato (5 minutos)

### Opción A: Desde Snowtrace (Más Fácil)

1. Ve a tu contrato en Snowtrace
2. Click en "Write Contract"
3. Click "Connect to Web3" (conecta MetaMask)
4. Prueba las funciones:

**Crear un Split:**
```
createSplit(
  _totalAmount: 100000000 (100 USDC en wei, 6 decimales)
  _participantWallets: ["0xAddress1", "0xAddress2"]
  _participantAmounts: [50000000, 50000000]
  _description: "Test Dinner Split"
  _payee: 0x0000000000000000000000000000000000000000
  _expiresIn: 86400 (24 horas)
)
```

5. Click "Write" y confirma en MetaMask

**Ver el Split:**
```
getSplit(splitId)
```

### Opción B: Desde Hardhat Console

```bash
npx hardhat console --network avalancheFuji
```

En la consola:
```javascript
const RailDropEscrow = await ethers.getContractFactory("RailDropEscrow");
const contract = await RailDropEscrow.attach("TU_CONTRACT_ADDRESS");

// Ver info del contrato
await contract.usdc();
await contract.railTreasury();
```

---

## 🧪 TESTS RÁPIDOS

### Test 1: Verificar Compilación
```bash
npm run compile
```
✅ Debería compilar sin errores

### Test 2: Verificar Balance
```bash
npx hardhat run scripts/check-balance.ts --network avalancheFuji
```

### Test 3: Ver Contrato en Explorer
Abre: https://testnet.snowtrace.io/address/TU_CONTRACT_ADDRESS

---

## 🎯 DEMO VISUAL INMEDIATA

### Abrir Demo HTML
```bash
open demo.html
```

Deberías ver:
- ✅ Diseño Lego-style
- ✅ Ejemplo de split visual
- ✅ Progress bar animado
- ✅ Lista de participantes

---

## 🐛 TROUBLESHOOTING

### Error: "Insufficient funds"
**Solución**: Necesitas más AVAX de testnet
```bash
# Ve a: https://faucet.avax.network/
# Request más AVAX
```

### Error: "Invalid private key"
**Solución**: Verifica que tu private key esté correcta
```bash
# Edita .env
nano .env

# Asegúrate que NO tenga el 0x al inicio
PRIVATE_KEY=abc123... (SIN 0x)
```

### Error: "Network not found"
**Solución**: Verifica hardhat.config.ts
```bash
cat hardhat.config.ts | grep avalancheFuji
```

### Error: "Cannot find module"
**Solución**: Reinstala dependencias
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

---

## 📊 VERIFICAR QUE TODO FUNCIONA

### Checklist:
- [ ] AVAX de testnet recibido
- [ ] .env configurado con PRIVATE_KEY
- [ ] Contrato compilado
- [ ] Contrato deployado a Fuji
- [ ] Contract address guardado
- [ ] Contrato visible en Snowtrace
- [ ] demo.html abierto y funcionando

---

## 🎬 COMANDOS RÁPIDOS

```bash
# Ver balance de tu wallet
npx hardhat run --network avalancheFuji scripts/check-balance.ts

# Compilar
npm run compile

# Deploy a testnet
npm run deploy:fuji

# Abrir demo
open demo.html

# Ver en GitHub
gh repo view --web
```

---

## 🔗 LINKS ÚTILES

- **Faucet**: https://faucet.avax.network/
- **Snowtrace Testnet**: https://testnet.snowtrace.io/
- **Core Wallet**: https://core.app/
- **MetaMask**: https://metamask.io/

---

## 🎯 SIGUIENTE NIVEL

Una vez deployado, puedes:

1. **Crear Splits de Prueba**
   - Usa diferentes addresses
   - Prueba diferentes montos
   - Verifica expiración

2. **Interactuar desde Frontend**
   - Conecta MetaMask
   - Llama funciones del contrato
   - Ve updates en tiempo real

3. **Mostrar a Tony**
   - Abre Snowtrace con tu contrato
   - Muestra transacciones reales
   - Demuestra que funciona

---

**¡LISTO PARA PROBAR! 🚀**

Empieza con el PASO 1 y en 15 minutos tendrás el contrato funcionando en testnet.
