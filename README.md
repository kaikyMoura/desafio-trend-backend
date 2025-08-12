<div align="center">

# Desafio Trend Midia Backend - 👥 Clients Management API

**Clients Management API** É um backend robusto para gerenciar clientes com validação avançada, paginação, filtragem inteligente e documentação API moderna. Este API demonstra princípios de arquitetura limpa, tratamento de erros robusto e práticas industriais para construir aplicativos Node.js escaláveis.

</div>

<div align="center">
  
![GitHub top language](https://img.shields.io/github/languages/top/kaikyMoura/desafio-trend-backend)
![Repository size](https://img.shields.io/github/repo-size/kaikyMoura/desafio-trend-backend)
![Github last commit](https://img.shields.io/github/last-commit/kaikyMoura/desafio-trend-backend)
![License](https://img.shields.io/aur/license/LICENSE)
![Languages count](https://img.shields.io/github/languages/count/kaikyMoura/desafio-trend-backend)

</div>

## 1. Sobre

Este projeto serve como uma **implementação do desafio da Trend Midia** para uma API de Gerenciamento de Clientes, demonstrando práticas modernas de desenvolvimento Node.js e princípios de arquitetura limpa.

Construído com **Express.js**, **TypeScript**, **Prisma**, e **class-validator**, a API de Gerenciamento de Clientes fornece um backend robusto para gerenciar clientes com validação avançada, filtragem inteligente e paginação abrangentes.

A API inclui tratamento de erros robusto, arquitetura de middleware, logging estruturado e documentação API moderna usando Swagger/OpenAPI. Esta arquitetura garante código manutenível, separação adequada de preocupações e consumo de API amigável para desenvolvedores.

---

## 2. Características

### 👤 Gerenciamento de Clientes
- CRUD completo para clientes
- **Filtragem inteligente e busca avançada**
- Paginação com tamanho de página personalizável
- Ordenação por múltiplos campos (name, email, createdAt, updatedAt, cnpj, phone, sector, cep, address, city, state)
- Suporte para operações em lote
- **Validação de CNPJ único e formato válido**

### ✅ Validação & Segurança
- Validação de entrada abrangente usando class-validator
- **Decoradores de validação personalizados para unicidade**
- **Validação condicional para campos opcionais**
- Transformação de dados com class-transformer
- Sanitização de entrada e segurança de tipo
- **Tratamento de erros robusto com códigos padronizados**
- **Logging estruturado para debugging**

### 🔍 Filtragem Avançada
- **Filtros específicos por campo** (where[name], where[email], where[cnpj], etc.)
- **Busca genérica em múltiplos campos** (search parameter)
- **Filtros aninhados** com conversão automática de parâmetros
- Construção de consultas complexas com filtros combinados
- Opções flexíveis de ordenação e classificação
- **Suporte para parâmetros de query aninhados**

### 📚 Documentação da API
- Documentação interativa Swagger/OpenAPI 3.0
- **Descrições atualizadas** de endpoints e parâmetros
- **Exemplos de filtragem** e busca avançada
- Definições de esquema e regras de validação
- **Função de teste "tente-o"** para testes interativos
- **Documentação de códigos de erro** padronizados

### 🏗️ Arquitetura & Qualidade
- Princípios de Arquitetura Limpa
- Design orientado a domínio
- Implementação do padrão Repository
- Abstração de camada de serviço
- **Tratamento de erros global com middleware personalizado**
- **Logging estruturado com Winston**
- **Validação de DTOs com middleware inteligente**

---

## 3. Tecnologias

### 🎯 Backend Framework
- **Express.js 5.x** - Framework web rápido e não-opcional para Node.js
- **TypeScript** - JavaScript de tipo seguro para uma melhor experiência de desenvolvimento

### 🗄️ Database & ORM
- **PostgreSQL** - Banco de dados relacional robusto
- **Supabase** - Banco de dados como serviço
- **Prisma** - Kit de ferramentas de banco de dados moderno com consultas de tipo seguro
- **Prisma Migrate** - Gerenciamento de migração de banco de dados

### ✅ Validação e Transformação
- **class-validator** - Validação baseada em decoradores
- **class-transformer** - Transformação de objetos e serialização
- **Validadores personalizados** para CNPJ, email e phone únicos
- **Zod** - Validação de esquema e configuração de ambiente

### 📚 Documentação da API
- **Swagger/OpenAPI 3.0** - Especificação de API padrão
- **swagger-jsdoc** - Gerar especificações OpenAPI a partir de JSDoc
- **swagger-ui-express** - Documentação interativa da API

### 🧪 Desenvolvimento & Qualidade
- **ESLint** - Linting de código e qualidade
- **Prettier** - Formatação de código
- **tsx** - Execução de TypeScript para desenvolvimento

---

## 4. Instalação

### Pré-requisitos
- **Node.js** 22+ (versão LTS recomendada)
- **PostgreSQL** 14+
- **pnpm** (gerenciador de pacotes recomendado)

### Início Rápido
```bash
# 1. Clone o repositório
git clone https://github.com/kaikyMoura/desafio-trend-backend.git
cd desafio-trend-backend

# 2. Instale as dependências
pnpm install

# 3. Configure as variáveis de ambiente
cp .env.example .env

# 4. Configure o banco de dados
pnpm prisma migrate deploy
pnpm prisma generate

# 5. Inicie o servidor de desenvolvimento
pnpm run dev
```

### Alternativa: Configuração com Docker
```bash
# Usando Docker Compose
docker-compose up -d

# Ou construa manualmente
docker build -t desafio-trend-backend .
docker run -p 5000:5000 desafio-trend-backend
```

---

## 5. Configuração do Ambiente

### Variáveis de Ambiente Necessárias
```env
# Application
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/clients_management"
```

### Guia de Variáveis de Ambiente
- **NODE_ENV**: Defina como `development` para desenvolvimento local
- **PORT**: Porta da aplicação (padrão: 5000)
- **DATABASE_URL**: String de conexão do PostgreSQL

---

## 6. Documentação da API

### Swagger UI
Acesse a documentação interativa da API em:
```
http://localhost:5000/docs
```

### Endpoints Disponíveis

#### Clientes
- `POST /api/clients` - Criar um novo cliente
- `GET /api/clients` - Obter clientes com paginação e filtragem avançada
- `GET /api/clients/:id` - Obter cliente por ID
- `GET /api/clients/email/:email` - Obter cliente por email
- `PUT /api/clients/:id` - Atualizar cliente
- `DELETE /api/clients/:id` - Deletar cliente

### Exemplos de Solicitação

#### Criar Cliente
```bash
POST /api/clients
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "phone": "(11) 99999-9999",
  "cnpj": "12.345.678/0001-90",
  "cep": "01234-567",
  "address": "Rua das Flores, 123",
  "number": "123",
  "neighborhood": "Centro",
  "city": "São Paulo",
  "state": "SP",
  "sector": "Technology"
}
```

#### Obter Clientes com Filtragem Avançada
```bash
# Busca genérica em múltiplos campos
GET /api/clients?page=1&limit=10&search=joão&sort=name&orderBy=asc

# Filtros específicos por campo (exato)
GET /api/clients?where[name]=João&where[sector]=Technology&orderBy=desc

# Filtros aninhados com conversão automática
GET /api/clients?where[name]=João&where[city]=São Paulo&page=1&limit=20
```

#### Filtros Disponíveis
- **Busca genérica**: `?search=termo` (busca em todos os campos)
- **Filtros específicos**: `?where[field]=value` (filtro exato por campo)
- **Paginação**: `?page=1&limit=20`
- **Ordenação**: `?sort=name&orderBy=asc`

### Formato de Resposta
Todas as respostas da API seguem um formato consistente:
```json
{
  "message": "Success message",
  "data": {
    // Dados da resposta
  }
}
```

---

## 7. Desenvolvimento

### Scripts Disponíveis
```bash
# Development
pnpm run dev          # Inicie o servidor de desenvolvimento com hot reload
pnpm run build        # Construa a aplicação
pnpm run start        # Inicie o servidor de produção

# Database
pnpm prisma studio    # Abra o Prisma Studio
pnpm prisma migrate dev # Crie e aplique uma nova migração
pnpm prisma generate  # Gere o cliente Prisma

# Code Quality
pnpm run lint         # Execute o ESLint
pnpm run format       # Formate o código com Prettier
```

### Estrutura do Projeto
```
src/
├── application/      # Camada de aplicação (DTOs, configs)
│   ├── config/       # Configuração do ambiente
│   ├── dtos/         # Data Transfer Objects
│   └── schemas/      # Esquemas de validação
├── domain/           # Camada de domínio (entidades, interfaces)
│   ├── entities/     # Entidades do domínio
│   ├── exceptions/   # Exceções personalizadas
│   ├── interfaces/   # Interfaces do repositório
│   ├── mappers/      # Mapeamento de dados
│   └── validators/   # Validadores personalizados
├── infrastructure/   # Camada de infraestrutura
│   ├── database/     # Configuração do banco de dados
│   ├── logger/       # Serviço de logging
│   ├── middlewares/  # Middlewares do Express
│   ├── repositories/ # Camada de acesso a dados
│   └── services/     # Serviços de lógica de negócios
└── presentation/     # Camada de apresentação
    ├── controllers/  # Manipuladores de solicitação
    ├── middlewares/  # Middlewares de rota
    └── routes/       # Rotas da API
```

---

## 8. Exemplos de Uso da API

### Criar um Cliente
```bash
curl -X POST http://localhost:5000/api/clients \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Santos",
    "email": "maria@example.com",
    "phone": "(11) 88888-8888",
    "cnpj": "98.765.432/0001-10",
    "cep": "01234-567",
    "address": "Rua das Flores, 123",
    "number": "123",
    "neighborhood": "Centro",
    "city": "São Paulo",
    "state": "SP",
    "sector": "Finance"
  }'
```

### Obter Clientes com Paginação
```bash
curl "http://localhost:5000/api/clients?page=1&limit=5&sort=name&orderBy=asc"
```

### Filtros Específicos por Campo
```bash
# Filtro por nome exato
curl "http://localhost:5000/api/clients?where[name]=João&page=1&limit=10"

# Filtro por setor e cidade
curl "http://localhost:5000/api/clients?where[sector]=Technology&where[city]=São Paulo"

# Filtro por CNPJ
curl "http://localhost:5000/api/clients?where[cnpj]=12345678000190"
```

### Busca Genérica em Múltiplos Campos
```bash
curl "http://localhost:5000/api/clients?search=maria&page=1&limit=10"
```

### Atualizar um Cliente
```bash
curl -X PUT http://localhost:5000/api/clients/CLIENT_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Santos Updated",
    "sector": "Marketing"
  }'
```

---

## 9. Database Schema

### Entidade Cliente
```sql
model Client {
  id        String   @id @default(uuid())
  name      String   @db.VarChar(255)
  email     String?  @db.VarChar(255)
  cnpj      String   @unique @db.VarChar(14)
  phone     String?  @db.VarChar(15)
  cep       String   @db.VarChar(8)
  address   String   @db.VarChar(255)
  number    String   @db.VarChar(10)
  neighborhood String   @db.VarChar(255)
  city      String   @db.VarChar(255)
  state     String   @db.VarChar(2)
  complement String?   @db.VarChar(255)
  sector    String   @db.VarChar(255)
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  deletedAt DateTime?

  @@unique([email], where: "email IS NOT NULL")
  @@unique([phone], where: "phone IS NOT NULL")
  @@map("clients")
}
```

### Principais Características
- **UUID IDs**: Identificadores seguros, resistentes a colisões
- **Timestamps**: Rastreamento automático de criação e atualização
- **Restrições Únicas Condicionais**: Unicidade aplicada apenas para valores não vazios
- **Campos Opcionais**: Email e phone são opcionais com validação condicional
- **Validação de CNPJ**: Formato válido e unicidade garantida

---

## 10. Tratamento de Erros

### Formato de Resposta de Erro Padronizado
```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": [
    {
      "field": "fieldName",
      "message": "Validation message"
    }
  ]
}
```

### Códigos de Erro Padronizados
- `VALIDATION_ERROR` - Validação falhou com detalhes específicos
- `MISSING_ARGUMENTS` - Argumentos obrigatórios faltando com lista específica
- `NOT_FOUND` - Recurso não encontrado
- `INVALID_JSON` - Formato JSON inválido
- `INTERNAL_ERROR` - Erro interno do servidor

### Exemplos de Respostas de Erro

#### Validação Falhou
```json
{
  "error": "Validation failed",
  "code": "VALIDATION_ERROR",
  "details": [
    {
      "field": "cnpj",
      "message": "CNPJ is invalid"
    },
    {
      "field": "email",
      "message": "This email is already registered"
    }
  ]
}
```

#### Argumentos Obrigatórios Faltando
```json
{
  "error": "Missing required arguments: id",
  "code": "MISSING_ARGUMENTS",
  "details": [
    {
      "field": "id",
      "message": "The field 'id' is required"
    }
  ]
}
```

#### JSON Inválido
```json
{
  "error": "Invalid JSON format",
  "code": "INVALID_JSON",
  "details": [
    {
      "field": "body",
      "message": "The request body contains invalid JSON"
    }
  ]
}
```

---

## 11. Filtragem e Busca

### Tipos de Filtros

#### 1. Busca Genérica (Search)
```bash
GET /api/clients?search=joão
```
- Busca em **todos os campos** de texto
- **Case-insensitive** (não diferencia maiúsculas/minúsculas)
- Suporta **busca parcial** (não precisa ser exato)

#### 2. Filtros Específicos (Where)
```bash
GET /api/clients?where[name]=João&where[sector]=Technology
```
- Filtro **exato** por campo específico
- **Case-sensitive** para precisão
- Suporta **múltiplos filtros** combinados

#### 3. Parâmetros de Paginação
```bash
GET /api/clients?page=1&limit=20&sort=name&orderBy=asc
```
- **page**: Número da página (padrão: 1)
- **limit**: Itens por página (padrão: 10, máximo: 100)
- **sort**: Campo para ordenação
- **orderBy**: Direção da ordenação (asc/desc)

### Campos Disponíveis para Filtragem
- **Identificação**: `name`, `email`, `cnpj`, `phone`
- **Endereço**: `cep`, `address`, `city`, `state`, `neighborhood`
- **Negócio**: `sector`
- **Sistema**: `createdAt`, `updatedAt`

### Exemplos de Consultas Complexas

#### Busca com Filtros Combinados
```bash
# Clientes de São Paulo no setor de Technology
GET /api/clients?where[city]=São Paulo&where[sector]=Technology&page=1&limit=20

# Clientes com nome João em qualquer cidade
GET /api/clients?where[name]=João&search=SP&page=1&limit=10

# Busca por CNPJ específico
GET /api/clients?where[cnpj]=12345678000190
```

---

## 12. Validação e Constraints

### Validações Implementadas

#### CNPJ
- **Formato válido** usando algoritmo de validação brasileiro
- **Unicidade** garantida no banco de dados
- **Transformação automática** para apenas números

#### Email
- **Formato válido** de email
- **Unicidade** para valores não vazios
- **Validação condicional** quando fornecido

#### Phone
- **Unicidade** para valores não vazios
- **Validação condicional** quando fornecido
- **Formato flexível** (aceita formatação)

### Validação Condicional
```typescript
@ValidateIf((o) => {
  const email = o.email;
  return email !== undefined && email !== null && email !== '' && email.trim() !== '';
})
@IsUniqueEmail({ message: "This email is already registered" })
email?: string;
```

### Transformação Automática
```typescript
@Transform(({ value }) => {
  if (value === '' || value === null || value === undefined) {
    return undefined;  // Converte string vazia para undefined
  }
  return value;
})
```

---

## 13. Contribuindo

### Fluxo de Desenvolvimento
1. Fork do repositório
2. Crie uma branch de recurso (`git checkout -b feature/amazing-feature`)
3. Commit suas alterações (`git commit -m 'Add amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

### Padrões de Código
- Siga as melhores práticas do TypeScript
- Use princípios de arquitetura limpa
- Escreva documentação abrangente
- Garanta o tratamento de erros apropriado
- Use mensagens de commit convencionais
- **Implemente validação condicional** para campos opcionais
- **Use o sistema de filtragem** implementado

---

## 14. Troubleshooting

### Problemas Comuns

#### Problemas de Conexão com o Banco de Dados
```bash
# Verifique se o PostgreSQL está em execução
sudo systemctl status postgresql

# Reiniciar o banco de dados
pnpm prisma migrate reset
```

#### Problemas de Validação
- Garanta que todos os campos obrigatórios sejam fornecidos
- Verifique a validade do formato de email
- **Use CNPJs válidos** (não fictícios)
- **Campos vazios** são permitidos para email e phone

#### Problemas de Filtragem
- **Use `where[field]=value`** para filtros exatos
- **Use `search=termo`** para busca genérica
- **Parâmetros aninhados** são convertidos automaticamente
- Verifique os logs para debug de filtros

#### Problemas de Porta
- Garanta que a porta 5000 esteja disponível
- Verifique outros serviços em execução

---

## 15. Deploy

### Configuração de Produção
```bash
# Construa a aplicação
pnpm run build

# Inicie o servidor de produção
pnpm run start
```

### Deploy com Docker
```bash
# Construa a imagem Docker
docker build -t desafio-trend-backend .

# Execute com as variáveis de ambiente
docker run -p 5000:5000 \
  -e DATABASE_URL="your_production_db_url" \
  desafio-trend-backend
```

### Variáveis de Ambiente para Produção
- Defina `NODE_ENV=production`
- Configure o banco de dados de produção
- Configure as origens CORS apropriadas
- Configure os níveis de logging

---

## 📝 Informações do Projeto
- **Tipo**: Implementação de Desafio de Código
- **Objetivo**: Demonstrar habilidades de desenvolvimento Node.js e arquitetura limpa
- **Status**: Completo e funcional com funcionalidades avançadas
- **Licença**: MIT

## Autor 👨‍💻
**Kaiky Tupinambá** - Fullstack Developer

---
