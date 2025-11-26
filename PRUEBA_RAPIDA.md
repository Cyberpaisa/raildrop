# 🎯 PRUEBA RÁPIDA - 5 MINUTOS

## ⚡ Ejecuta el Proyecto AHORA MISMO

### Opción 1: DEMO VISUAL (30 segundos) ⭐ EMPIEZA AQUÍ

```bash
cd /Users/jquiceva/Documents/GitHub/eventmetrycs-1.0-rv/raildrop-demo
npm run demo
```

Esto abrirá `demo.html` en tu navegador. Verás:
- ✅ Diseño Lego-style
- ✅ Ejemplo de split visual
- ✅ Progress bar animado

**¡LISTO! Ya puedes mostrar esto a Tony.**

---

### Opción 2: DEPLOYMENT REAL (15 minutos)

#### Paso 1: Obtener AVAX de Testnet (5 min)

1. **Abre**: https://faucet.avax.network/
2. **Selecciona**: "Fuji (C-Chain)"
3. **Pega tu wallet address** (de MetaMask)
4. **Click**: "Request 2 AVAX"
5. **Espera**: 1-2 minutos

**¿No tienes MetaMask?**
- Descarga: https://metamask.io/
- Crea una wallet nueva (SOLO PARA TESTNET)
- Guarda la seed phrase en lugar seguro

#### Paso 2: Configurar .env (2 min)

```bash
cd /Users/jquiceva/Documents/GitHub/eventmetrycs-1.0-rv/raildrop-demo

# Crear .env
cp env.template .env

# Editar (usa nano, vim, o VSCode)
nano .env
```

**Contenido del .env:**
```bash
PRIVATE_KEY=tu_private_key_sin_0x
SNOWTRACE_API_KEY=opcional
```

**Obtener Private Key de MetaMask:**
1. Click en los 3 puntos → "Account Details"
2. "Show Private Key"
3. Ingresa password
4. Copia (SIN el 0x)
5. Pega en .env

**Guardar y salir de nano:**
- `Ctrl + X`
- `Y` (yes)
- `Enter`

#### Paso 3: Verificar Balance (1 min)

```bash
npm run check:balance
```

**Output esperado:**
```
🔍 Checking wallet balance...

📝 Wallet Address: 0xTuAddress...
💰 Balance: 2.0 AVAX
✅ Balance is sufficient for deployment!

🌐 Network: fuji
🔗 Chain ID: 43113
✅ Connected to Avalanche Fuji Testnet
```

Si ves "Low balance", espera más tiempo o pide más AVAX del faucet.

#### Paso 4: Deploy (3 min)

```bash
npm run deploy:fuji
```

**Output esperado:**
```
🚀 Deploying RailDropEscrow...

📝 Deploying with account: 0xYourAddress...
💰 Account balance: 2.0 AVAX

⏳ Deploying contract...

✅ SUCCESS! Contract deployed to: 0x1234abcd...
🔗 View on Explorer: https://testnet.snowtrace.io/address/0x1234abcd...

📋 Save this address for frontend:
   CONTRACT_ADDRESS="0x1234abcd..."

🎉 Deployment complete!
```

**COPIA Y GUARDA EL CONTRACT ADDRESS!**

#### Paso 5: Verificar en Snowtrace (2 min)

1. **Abre el link** que te dio el script
2. Verás tu contrato deployado
3. Click en **"Contract"** tab
4. Deberías ver el código (puede tardar 1-2 min en verificarse)

**Ejemplo:**
https://testnet.snowtrace.io/address/0xTuContractAddress

---

### Opción 3: INTERACTUAR CON EL CONTRATO (5 min extra)

Una vez deployado, puedes interactuar:

#### Desde Snowtrace (Más Fácil):

1. Ve a tu contrato en Snowtrace
2. Click **"Write Contract"**
3. Click **"Connect to Web3"** (conecta MetaMask)
4. Prueba funciones:

**Ver USDC Address:**
```
usdc() → Click "Query"
```

**Ver Rail Treasury:**
```
railTreasury() → Click "Query"
```

#### Desde Script:

```bash
# Primero edita scripts/interact.ts
# Reemplaza CONTRACT_ADDRESS con tu address

npm run interact
```

---

## 🎬 COMANDOS RÁPIDOS

```bash
# Demo visual
npm run demo

# Verificar balance
npm run check:balance

# Compilar
npm run compile

# Deploy a testnet
npm run deploy:fuji

# Interactuar
npm run interact

# Limpiar
npm run clean
```

---

## 🐛 PROBLEMAS COMUNES

### "Insufficient funds"
**Solución:**
```bash
# Pide más AVAX del faucet
# https://faucet.avax.network/
```

### "Invalid private key"
**Solución:**
```bash
# Verifica que NO tenga 0x al inicio
nano .env

# Debe ser:
PRIVATE_KEY=abc123...  # ✅ Correcto
PRIVATE_KEY=0xabc123... # ❌ Incorrecto
```

### "Cannot find module"
**Solución:**
```bash
npm install --legacy-peer-deps
```

### "Network not found"
**Solución:**
```bash
# Verifica que estés en el directorio correcto
cd /Users/jquiceva/Documents/GitHub/eventmetrycs-1.0-rv/raildrop-demo
```

---

## ✅ CHECKLIST DE PRUEBA

- [ ] Demo HTML abierto y funcionando
- [ ] AVAX de testnet recibido (si vas a deployar)
- [ ] .env configurado
- [ ] Balance verificado
- [ ] Contrato deployado
- [ ] Contract address guardado
- [ ] Contrato visible en Snowtrace

---

## 🎯 PARA LA DEMO CON TONY

### Si Solo Muestras el Demo HTML:
```bash
npm run demo
```
Muestra el diseño y explica el concepto.

### Si Deployaste:
1. Abre Snowtrace con tu contract address
2. Muestra el código verificado
3. Explica que está funcionando en testnet
4. Menciona que deployar a mainnet toma 5 minutos

---

## 🔗 LINKS ÚTILES

- **Faucet**: https://faucet.avax.network/
- **Snowtrace Testnet**: https://testnet.snowtrace.io/
- **MetaMask**: https://metamask.io/
- **GitHub Repo**: https://github.com/Cyberpaisa/raildrop

---

**¡EMPIEZA CON LA OPCIÓN 1 (DEMO VISUAL)!**

Es la forma más rápida de ver el proyecto funcionando.

Luego, si tienes tiempo, prueba el deployment real (Opción 2).
