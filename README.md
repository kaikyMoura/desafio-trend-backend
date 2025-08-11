<div align="center">

# Desafio Trend Midia Backend - 👥 Clients Management API

**Clients Management API** É um backend robusto para gerenciar clientes com validação, paginação, filtragem e documentação API moderna. Este API demonstra princípios de arquitetura limpa, tratamento de erros apropriado e práticas industriais para construir aplicativos Node.js escaláveis.

</div>

<div align="center">
  
![GitHub top language](https://img.shields.io/github/languages/top/kaikyMoura/desafio-trend-backend)
![Repository size](https://img.shields.io/github/repo-size/kaikyMoura/desafio-trend-backend)
![Github last commit](https://img.shields.io/github/last-commit/kaikyMoura/desafio-trend-backend)
![License](https://img.shields.io/aur/license/LICENSE)
![Languages count](https://img.shields.io/github/languages/count/kaikyMoura/desafio-trend-backend)

</div>

## 1. About the Project

This project serves as a **coding challenge implementation** for a Clients Management API, demonstrating modern Node.js development practices and clean architecture principles.

Built with **Express.js**, **TypeScript**, **Prisma**, and **class-validator**, the Clients Management API provides a robust backend for managing clients with comprehensive validation, filtering, and pagination capabilities.

The API includes proper error handling, middleware architecture, logging, and comprehensive API documentation using Swagger/OpenAPI. This architecture ensures maintainable code, proper separation of concerns, and developer-friendly API consumption.

---

## 2. Features

### 👤 Client Management
- Complete CRUD operations for clients
- Advanced filtering and search capabilities
- Pagination with customizable page size
- Sorting by multiple fields (name, email, createdAt, updatedAt, cnpj, phone, sector)
- Bulk operations support

### ✅ Validation & Security
- Comprehensive input validation using class-validator
- Custom validation decorators
- Data transformation with class-transformer
- Input sanitization and type safety
- Proper error handling and logging

### 🔍 Advanced Filtering
- Multi-field filtering (name, email, cnpj, phone, sector)
- Search functionality across multiple fields
- Complex query building with nested filters
- Flexible sorting and ordering options

### 📚 API Documentation
- Interactive Swagger/OpenAPI documentation
- Comprehensive endpoint descriptions
- Request/response examples
- Schema definitions and validation rules
- Try-it-out functionality for testing

### 🏗️ Architecture & Quality
- Clean Architecture principles
- Domain-driven design
- Repository pattern implementation
- Service layer abstraction
- Comprehensive error handling
- Structured logging with Winston

---

## 3. Technologies

### 🎯 Backend Framework
- **Express.js 5.x** - Fast, unopinionated web framework for Node.js
- **TypeScript** - Type-safe JavaScript for better development experience

### 🗄️ Database & ORM
- **PostgreSQL** - Robust relational database
- **Prisma** - Modern database toolkit with type-safe queries
- **Prisma Migrate** - Database migration management

### ✅ Validation & Transformation
- **class-validator** - Decorator-based validation
- **class-transformer** - Object transformation and serialization
- **Zod** - Schema validation and environment configuration

### 📚 API Documentation
- **Swagger/OpenAPI 3.0** - API specification standard
- **swagger-jsdoc** - Generate OpenAPI specs from JSDoc
- **swagger-ui-express** - Interactive API documentation

### 🧪 Development & Quality
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **tsx** - TypeScript execution for development

---

## 4. Installation

### Prerequisites
- **Node.js** 22+ (LTS version recommended)
- **PostgreSQL** 14+
- **pnpm** (recommended package manager)

### Quick Start
```bash
# 1. Clone the repository
git clone https://github.com/kaikyMoura/desafio-trend-backend.git
cd desafio-trend-backend

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# 4. Set up database
pnpm prisma migrate deploy
pnpm prisma generate

# 5. Start development server
pnpm run dev
```

### Alternative: Docker Setup
```bash
# Using Docker Compose
docker-compose up -d

# Or build manually
docker build -t desafio-trend-backend .
docker run -p 5000:5000 desafio-trend-backend
```

---

## 5. Environment Setup

### Required Environment Variables
```env
# Application
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/clients_management"
```

### Environment Variables Guide
- **NODE_ENV**: Set to `development` for local development
- **PORT**: Application port (default: 5000)
- **DATABASE_URL**: PostgreSQL connection string

---

## 6. API Documentation

### Swagger UI
Access the interactive API documentation at:
```
http://localhost:5000/docs
```

### Available Endpoints

#### Clients
- `POST /api/clients` - Create a new client
- `GET /api/clients` - Get clients with pagination and filtering
- `GET /api/clients/:id` - Get client by ID
- `GET /api/clients/email/:email` - Get client by email
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client

### Request Examples

#### Create Client
```bash
POST /api/clients
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "phone": "(11) 99999-9999",
  "cnpj": "12.345.678/0001-90",
  "sector": "Technology"
}
```

#### Get Clients with Filtering
```bash
GET /api/clients?page=1&limit=10&search=joão&sort=name&order=asc
```

#### Filter by Specific Fields
```bash
GET /api/clients?filter[name]=João&filter[sector]=Technology&orderBy=desc
```

### Response Format
All API responses follow a consistent format:
```json
{
  "message": "Success message",
  "data": {
    // Response data
  }
}
```

---

## 7. Development

### Available Scripts
```bash
# Development
pnpm run dev          # Start development server with hot reload
pnpm run build        # Build the application
pnpm run start        # Start production server

# Database
pnpm prisma studio    # Open Prisma Studio
pnpm prisma migrate dev # Create and apply new migration
pnpm prisma generate  # Generate Prisma client

# Code Quality
pnpm run lint         # Run ESLint
pnpm run format       # Format code with Prettier
```

### Project Structure
```
src/
├── application/       # Application layer (DTOs, configs)
│   ├── config/       # Environment configuration
│   ├── dtos/         # Data Transfer Objects
│   └── schemas/      # Validation schemas
├── domain/           # Domain layer (entities, interfaces)
│   ├── entities/     # Domain entities
│   ├── exceptions/   # Custom exceptions
│   ├── interfaces/   # Repository interfaces
│   ├── mappers/      # Data mappers
│   └── validators/   # Custom validators
├── infrastructure/   # Infrastructure layer
│   ├── database/     # Database configuration
│   ├── logger/       # Logging service
│   ├── middlewares/  # Express middlewares
│   ├── repositories/ # Data access layer
│   └── services/     # Business logic services
└── presentation/     # Presentation layer
    ├── controllers/  # Request handlers
    ├── middlewares/  # Route middlewares
    └── routes/       # API routes
```

---

## 8. API Usage Examples

### Creating a Client
```bash
curl -X POST http://localhost:5000/api/clients \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Santos",
    "email": "maria@example.com",
    "phone": "(11) 88888-8888",
    "cnpj": "98.765.432/0001-10",
    "sector": "Finance"
  }'
```

### Getting Clients with Pagination
```bash
curl "http://localhost:5000/api/clients?page=1&limit=5&sort=name&order=asc"
```

### Filtering Clients
```bash
curl "http://localhost:5000/api/clients?filter[sector]=Technology&filter[name]=João"
```

### Searching Clients
```bash
curl "http://localhost:5000/api/clients?search=maria&page=1&limit=10"
```

### Updating a Client
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

### Client Entity
```sql
model Client {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  phone     String
  cnpj      String
  cep       String
  address   String
  number    String
  complement String
  neighborhood String
  city      String
  state     String

  sector    String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("clients")
}
```

### Key Features
- **UUID IDs**: Secure, collision-resistant identifiers
- **Timestamps**: Automatic creation and update tracking
- **Unique Constraints**: Email uniqueness enforced at database level
- **Optional Fields**: Sector is optional for flexibility

---

## 10. Error Handling

### Error Response Format
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

### Common Error Codes
- `VALIDATION_ERROR` - Input validation failed
- `CLIENT_NOT_FOUND` - Client doesn't exist
- `EMAIL_ALREADY_EXISTS` - Email is already registered
- `MISSING_ARGUMENTS` - Required parameters missing

### Validation Errors
The API provides detailed validation errors for each field:
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Email must be a valid email"
    },
    {
      "field": "email",
      "message": "Email must be a valid email"
    }
  ]
}
```

---

## 11. Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Follow TypeScript best practices
- Use clean architecture principles
- Write comprehensive documentation
- Ensure proper error handling
- Use conventional commit messages

---

## 12. Troubleshooting

### Common Issues

#### Database Connection Issues
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Reset database
pnpm prisma migrate reset
```

#### Validation Issues
- Ensure all required fields are provided
- Check email format validity
- Verify CNPJ format (Brazilian company registration)

#### Port Issues
- Ensure port 5000 is available
- Check for other running services

---

## 13. Deployment

### Production Setup
```bash
# Build the application
pnpm run build

# Start production server
pnpm run start
```

### Docker Deployment
```bash
# Build Docker image
docker build -t desafio-trend-backend .

# Run with environment variables
docker run -p 5000:5000 \
  -e DATABASE_URL="your_production_db_url" \
  desafio-trend-backend
```

### Environment Variables for Production
- Set `NODE_ENV=production`
- Configure production database
- Set up proper CORS origins
- Configure logging levels

---

## 📝 Project Information
- **Type**: Coding Challenge Implementation
- **Purpose**: Demonstrate Node.js development skills and clean architecture
- **Status**: Complete and functional
- **License**: MIT

## Author 👨‍💻
**Kaiky Tupinambá** - Fullstack Developer

---

<div align="center">

**Built with ❤️ for learning and portfolio purposes**

</div>
