# 🚀 Instrucciones para Subir a GitHub

## Paso 1: Inicializar Git en el Proyecto

```bash
cd /Users/jquiceva/Documents/GitHub/eventmetrycs-1.0-rv/raildrop-demo
git init
git add .
git commit -m "Initial commit: RailDrop smart contract and deployment scripts"
```

## Paso 2: Crear Repositorio en GitHub

1. Ve a: https://github.com/new
2. Repository name: `raildrop`
3. Description: `RailDrop - Interactive Payment Splitter powered by Rail + Avalanche`
4. Visibility: **Public** (o Private si prefieres)
5. **NO** marques "Initialize this repository with a README" (ya tenemos uno)
6. Click "Create repository"

## Paso 3: Conectar y Subir

Después de crear el repo, GitHub te mostrará comandos. Usa estos:

```bash
# Agregar remote
git remote add origin https://github.com/Cyberpaisa/raildrop.git

# Subir código
git branch -M main
git push -u origin main
```

## Paso 4: Verificar

Ve a: https://github.com/Cyberpaisa/raildrop

Deberías ver:
- ✅ Smart contract (contracts/RailDropEscrow.sol)
- ✅ Scripts de deployment
- ✅ README con documentación completa
- ✅ Configuración de Hardhat

## Paso 5: Configurar Variables de Entorno (Importante)

**NUNCA** subas tu `.env` a GitHub. Ya está en `.gitignore`.

Para deployment:
1. Copia `env.template` a `.env`
2. Agrega tu PRIVATE_KEY y SNOWTRACE_API_KEY
3. Verifica que `.env` NO esté en git: `git status` (no debería aparecer)

## Comandos Útiles

```bash
# Ver status
git status

# Agregar cambios
git add .

# Commit
git commit -m "Descripción de cambios"

# Push
git push

# Ver remotes
git remote -v
```

## Próximos Pasos

Una vez en GitHub, puedes:

1. **Agregar Topics** en GitHub:
   - blockchain
   - avalanche
   - smart-contracts
   - farcaster
   - defi
   - payment-splitter

2. **Agregar GitHub Actions** para CI/CD (opcional)

3. **Invitar colaboradores** si trabajas en equipo

4. **Crear Issues** para features futuras

---

**¡Listo para mostrar a Tony mañana!** 🎉
