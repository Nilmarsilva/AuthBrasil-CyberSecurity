# Guia de Integração: AuthBrasil Frontend ↔ Backend

Este documento explica como conectar este Frontend (React) com o seu repositório de Backend (FastAPI).

## 1. Configuração do Backend (FastAPI)

No seu repositório [AuthBrasil-CyberSecurity-Ltda](https://github.com/Nilmarsilva/AuthBrasil-CyberSecurity-Ltda), você precisa garantir que o CORS (Cross-Origin Resource Sharing) está habilitado para permitir que o Frontend acesse a API.

No arquivo `app/main.py`, adicione ou verifique o seguinte código:

```python
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure as origens permitidas
origins = [
    "http://localhost:3000",
    "https://seu-app-frontend.run.app", # URL do AI Studio
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 2. Configuração do Frontend (Este Projeto)

### Variáveis de Ambiente
Crie ou edite o arquivo `.env` na raiz do projeto e adicione a URL da sua API:

```env
VITE_API_URL=http://localhost:8000
```

### Uso do Serviço de API
O arquivo `src/services/api.ts` já contém todas as funções necessárias mapeadas para os seus endpoints atuais.

Exemplo de uso em um componente:

```typescript
import { scanService } from '../services/api';

const handleStartScan = async (url: string) => {
  try {
    const newScan = await scanService.createScan(url);
    console.log('Scan iniciado:', newScan.id);
    // Redirecionar para o dashboard ou mostrar loading
  } catch (error) {
    console.error('Erro ao iniciar scan:', error);
  }
};
```

## 3. Próximos Passos Sugeridos

1.  **Autenticação com Supabase**:
    *   Integre o `supabase-js` no Frontend para gerenciar o login.
    *   No Backend, adicione uma dependência para validar o JWT enviado no cabeçalho `Authorization`.

2.  **Sincronização de Modelos**:
    *   Sempre que adicionar um novo campo no `schemas.py` do Backend, lembre-se de atualizar a interface correspondente no `src/services/api.ts`.

3.  **Webhooks**:
    *   Se desejar notificações em tempo real, considere usar WebSockets ou configurar o Backend para enviar um Webhook para o Frontend quando um scan for concluído.

---
*Documentação gerada para AuthBrasil CyberSecurity Ltda.*
