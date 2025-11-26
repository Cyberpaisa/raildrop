# 🎯 Quick Deployment Guide

## Para Mañana (Demo con Tony)

### Opción 1: Mostrar el Código (SIN deployment)
Si no tienes tiempo de deployar, simplemente muestra:

1. **GitHub Repo**: https://github.com/Cyberpaisa/raildrop
2. **Smart Contract**: Abre `contracts/RailDropEscrow.sol`
3. **Explica el concepto** con el README

**Pitch de 30 segundos:**
"Este es el smart contract que construí. Maneja splits de pagos en USDC en Avalanche. Cuando todos pagan, Rail convierte a fiat y liquida al comerciante. El código está production-ready."

---

### Opción 2: Deployment Rápido (30 minutos)

#### Prerequisitos:
- [ ] Wallet con 0.5+ AVAX en Fuji testnet
- [ ] Private key de esa wallet
- [ ] Snowtrace API key (opcional)

#### Pasos:

**1. Get Testnet AVAX** (5 min)
```bash
# Ve a: https://faucet.avax.network/
# Pega tu wallet address
# Request 2 AVAX
# Espera 1-2 minutos
```

**2. Configurar .env** (2 min)
```bash
cd raildrop-demo
cp env.template .env
nano .env  # o usa tu editor favorito
```

Agrega:
```
PRIVATE_KEY=tu_private_key_aqui_sin_0x
SNOWTRACE_API_KEY=opcional
```

**3. Deploy** (5 min)
```bash
npm run deploy:fuji
```

Deberías ver:
```
✅ SUCCESS! Contract deployed to: 0x1234...
🔗 View on Explorer: https://testnet.snowtrace.io/address/0x1234...
```

**4. Guardar Address** (1 min)
Copia el contract address y guárdalo en algún lado.

**5. Abrir en Snowtrace** (2 min)
- Abre el link del explorer
- Verifica que el contrato esté ahí
- Muestra el código verificado

---

## Durante la Reunión

### Qué Mostrar:

**1. GitHub (30 seg)**
- Repo público
- README profesional
- Código limpio

**2. Snowtrace (30 seg)** (si deployaste)
- Contrato verificado
- Source code visible
- Transacciones (si hiciste alguna)

**3. Concepto (60 seg)**
```
"RailDrop es un Farcaster Frame para splits de pagos.

Escenario: Cena con amigos, $200 total.
- Cada uno paga $50 en USDC
- Smart contract holds funds
- Cuando todos pagaron → Rail convierte a fiat
- Restaurante recibe $200 en banco

Por qué es viral:
- Visual estilo Lego (llamativo)
- Real-time updates (presión social)
- Útil (problema real)

Para Rail:
- Social proof en Farcaster
- Demo de crypto → fiat
- Lead generation

Puedo tener esto funcionando end-to-end en 2 semanas."
```

---

## Si Tony Pregunta...

**"¿Cuánto tiempo te tomó?"**
→ "48 horas. El smart contract está production-ready. El frontend necesita 1-2 semanas más."

**"¿Cuánto cuesta deployar?"**
→ "En Avalanche, menos de $1 en gas. Deployment a mainnet toma 5 minutos."

**"¿Cómo se integra con Rail?"**
→ "Cuando el split se completa, llamamos a Rail API para convertir USDC → fiat. Tengo la arquitectura lista, solo necesito acceso a su sandbox."

**"¿Qué falta?"**
→ "Frontend (Farcaster Frame), integración con Rail API, y testing con usuarios reales. Todo factible en 2 semanas."

**"¿Puedes hacerlo oficial?"**
→ "Sí. Puedo iterar con su equipo, usar su branding, y lanzarlo como demo oficial de Rail en redes sociales."

---

## Backup Plan

Si algo falla técnicamente:

1. **Muestra el código en GitHub**
2. **Explica el concepto con el README**
3. **Dibuja el flujo en un whiteboard/papel**
4. **Enfócate en el valor para Rail**

Lo importante es la IDEA y tu capacidad de ejecutar, no el deployment perfecto.

---

## Después de la Reunión

Si Tony está interesado:

**Week 1:**
- [ ] Deploy a mainnet
- [ ] Crear frontend básico
- [ ] Integrar Rail API sandbox
- [ ] Testing interno

**Week 2:**
- [ ] Farcaster Frame funcional
- [ ] Beta testing (10-20 usuarios)
- [ ] Branding Rail oficial
- [ ] Launch en Farcaster

---

**¡Buena suerte mañana!** 🚀

Recuerda: Estás mostrando tu capacidad de ejecutar rápido y pensar en productos virales. Eso vale más que un deployment perfecto.
