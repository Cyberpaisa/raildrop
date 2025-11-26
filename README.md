# 🧱 RailDrop - Interactive Payment Splitter

Split bills with crypto. Settle in fiat instantly.

**Powered by Rail + Avalanche**

---

## 🎯 Concepto

RailDrop es un Farcaster Frame que permite dividir cuentas entre amigos usando crypto (USDC) y liquidar en fiat instantáneamente a través de Rail.

### Escenario de Uso

1. Saliste a cenar con 3 amigos. La cuenta es $200
2. Creas un split en RailDrop
3. Cada amigo paga su parte ($50) con USDC
4. Rail convierte automáticamente a fiat
5. El restaurante recibe $200 en su cuenta bancaria

---

## 🏗️ Arquitectura

```
Farcaster Frame (Next.js)
    ↓
User clicks "Pay My Share"
    ↓
Smart Contract (Avalanche) holds USDC
    ↓
When all paid → Rail API converts to fiat
    ↓
Restaurant receives money in bank
```

---

## 🚀 Quick Start

### Prerequisitos

- Node.js 18+
- Una wallet con AVAX para gas (testnet o mainnet)
- Cuenta en [Snowtrace](https://snowtrace.io) para API key (opcional)

### 1. Instalación

```bash
cd raildrop-demo
npm install
```

### 2. Configuración

Copia el template de variables de entorno:

```bash
cp env.template .env
```

Edita `.env` y agrega:

```bash
PRIVATE_KEY=tu_private_key_aqui
SNOWTRACE_API_KEY=tu_api_key_aqui  # Opcional, para verificación
```

⚠️ **IMPORTANTE**: Usa una wallet de TESTNET para desarrollo. Nunca uses tu wallet principal.

### 3. Obtener AVAX de Testnet

Para deployar en Fuji testnet, necesitas AVAX:

1. Ve a: https://faucet.avax.network/
2. Ingresa tu wallet address
3. Request 2 AVAX (tarda 1-2 minutos)

### 4. Compilar Smart Contract

```bash
npx hardhat compile
```

Deberías ver:
```
✓ Compiled 1 Solidity file successfully
```

### 5. Deploy a Avalanche Fuji Testnet

```bash
npx hardhat run scripts/deploy.ts --network avalancheFuji
```

Output esperado:
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

🎯 **GUARDA ESA ADDRESS**. La necesitas para el frontend.

### 6. Deploy a Avalanche Mainnet (Producción)

⚠️ **Solo cuando estés listo para producción**

```bash
npx hardhat run scripts/deploy.ts --network avalanche
```

### 7. Verificar Contrato en Snowtrace

```bash
npx hardhat verify --network avalancheFuji DEPLOYED_ADDRESS USDC_ADDRESS RAIL_TREASURY_ADDRESS
```

---

## 📁 Estructura del Proyecto

```
raildrop-demo/
├── contracts/
│   └── RailDropEscrow.sol      # Smart contract principal
├── scripts/
│   └── deploy.ts               # Script de deployment
├── test/                       # Tests (TODO)
├── hardhat.config.ts           # Configuración de Hardhat
├── tsconfig.json              # Configuración de TypeScript
└── README.md                  # Este archivo
```

---

## 🔧 Smart Contract: RailDropEscrow

### Funciones Principales

#### `createSplit()`
Crea un nuevo split de pago.

**Parámetros:**
- `totalAmount`: Monto total en USDC (wei)
- `participantWallets`: Array de addresses de participantes
- `participantAmounts`: Array de montos que cada uno debe pagar
- `description`: Descripción del split (ej: "Dinner at La Pizzeria")
- `payee`: Address del comerciante/restaurante (opcional)
- `expiresIn`: Tiempo de expiración en segundos

**Returns:** `splitId` (bytes32)

#### `payShare()`
Permite a un participante pagar su parte.

**Parámetros:**
- `splitId`: ID del split

**Requiere:**
- Que el caller sea un participante
- Que no haya pagado ya
- Que tenga USDC aprobado para el contrato

#### `getSplit()`
Obtiene detalles de un split.

**Parámetros:**
- `splitId`: ID del split

**Returns:** Todos los detalles del split

#### `getParticipants()`
Obtiene lista de participantes de un split.

**Parámetros:**
- `splitId`: ID del split

**Returns:** Array de participantes con sus estados de pago

---

## 🎨 Frontend (Próximamente)

El frontend será un Farcaster Frame con:

- ✅ Visual estilo Lego (bloques coloridos)
- ✅ Real-time updates (quién pagó)
- ✅ Social pressure (gamificación)
- ✅ Integración con Rail API

---

## 📊 Casos de Uso

### 1. Cena entre Amigos
- Total: $200
- 4 personas
- Cada uno paga $50 en USDC
- Restaurante recibe $200 fiat

### 2. Viaje Compartido
- Total: $500 (hotel + transporte)
- 5 personas
- Cada uno paga $100 en USDC
- Proveedor recibe $500 fiat

### 3. Regalo Grupal
- Total: $300 (regalo de cumpleaños)
- 6 personas
- Cada uno paga $50 en USDC
- Tienda recibe $300 fiat

---

## 🔐 Seguridad

- ✅ ReentrancyGuard (protección contra ataques de reentrada)
- ✅ Ownable (funciones administrativas protegidas)
- ✅ OpenZeppelin contracts (auditados)
- ✅ Timelock en splits (expiración automática)
- ✅ Refund automático si split expira

---

## 🧪 Testing (TODO)

```bash
npx hardhat test
```

---

## 📝 Roadmap

### Fase 1: MVP (Actual)
- [x] Smart contract básico
- [x] Deploy scripts
- [x] Documentación

### Fase 2: Frontend
- [ ] Farcaster Frame
- [ ] Wallet connection (Wagmi)
- [ ] Dynamic images (@vercel/og)

### Fase 3: Integración Rail
- [ ] Rail API integration
- [ ] Fiat settlement
- [ ] Webhooks para notificaciones

### Fase 4: Features Avanzados
- [ ] NFT badges ("Split Master")
- [ ] Leaderboard
- [ ] Social proof posts

---

## 🤝 Contribuir

Este proyecto está en desarrollo activo. Contribuciones son bienvenidas!

---

## 📄 Licencia

MIT

---

## 🔗 Links

- **Avalanche Docs**: https://docs.avax.network/
- **Rail.io**: https://rail.io/
- **Farcaster Frames**: https://docs.farcaster.xyz/developers/frames
- **Snowtrace (Explorer)**: https://snowtrace.io/

---

## 💡 Demo para Tony (Rail Partnership)

### El Pitch (60 segundos)

"This is RailDrop - a Farcaster Frame I built to showcase Rail's power.

**How it works:**
You're out with friends. Bill is $200. Everyone opens the Frame, connects wallet, sends their $50 in USDC. Smart contract holds the funds. When everyone's paid, Rail converts all $200 to fiat and sends it to the restaurant's bank in 2 hours.

**Why it's viral:**
- Lego-style visuals (eye-catching)
- Real-time updates (social pressure to pay fast)
- Useful (solves real problem)

**For Rail, this is:**
- Social proof (thousands see it on Farcaster)
- Use case demo (not just speculation)
- Lead generation (users sign up for Rail accounts)

I can deploy this as an official Rail demo in 2 weeks. Interested?"

### Qué Mostrar en tu Laptop

1. **Snowtrace (Smart Contract)**
   - URL: `https://testnet.snowtrace.io/address/YOUR_CONTRACT_ADDRESS`
   - Muestra: Contrato verificado, source code visible

2. **Landing Page** (cuando esté lista)
   - Visual estilo Lego
   - Ejemplo de split animado
   - Botón "Share on Farcaster"

---

**Built with ❤️ for the Rail + Avalanche ecosystem**
