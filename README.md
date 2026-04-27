## 💻Frontend
Para executar o projeto frontend: acesse a pasta fronted, abra um terminal e rode o comando

```bash
npm start
```

Após o servidor estar em execução, abra seu navegador e acesse `http://localhost:4200/`


## ⚙️Backend

Para executar o projeto backend: acesse a pasta `backend\src\LeadsApi`, abra um terminal e rode o comando

```bash
dotnet run api
```

 Ao executar, abra seu navegador e acesse `http://localhost:5000/swagger`.


---
---
---
---
---


 # 🧪 Desafio Técnico – Angular + .NET Core (CRUD de Leads e Tasks)

Obrigado por participar do processo seletivo. Esta é a etapa prática do processo.

---

## 🎯 Objetivo
Construir um CRUD simples de **Leads** com **Tasks associadas**, usando obrigatoriamente:

- **Backend:** .NET 8 (Web API) + Entity Framework Core  
- **Frontend:** Angular 16+  

O desafio avalia **organização, clareza de código e domínio da stack**.  


---

## 🧱 Requisitos principais

### Funcionalidades obrigatórias
1. **Listagem de Leads**  
   - Filtro por **Status** (`New`, `Qualified`, `Won`, `Lost`)  
   - Busca por **nome** ou **email**

2. **CRUD de Leads**
   - Criar / Editar / Excluir / Listar  
   - Validação mínima: nome (≥3 caracteres) e e-mail válido  

3. **CRUD de Tasks**
   - Cada Lead pode ter várias Tasks  
   - Campos: título, data de vencimento e status (`Todo`, `Doing`, `Done`)

4. **Formulários com validação**
   - Exibir mensagens claras de sucesso e erro

5. **README** curto explicando como rodar o projeto

---

## 🗃️ Modelagem de Objetos

### 🖥️ Backend (.NET 8 / C#)

#### Entities
```csharp
public class Lead
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public LeadStatus Status { get; set; } = LeadStatus.New;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
}

public enum LeadStatus { New = 0, Qualified = 1, Won = 2, Lost = 3 }

public class TaskItem
{
    public int Id { get; set; }
    public int LeadId { get; set; }
    public string Title { get; set; } = null!;
    public DateTime? DueDate { get; set; }
    public TaskStatus Status { get; set; } = TaskStatus.Todo;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public Lead? Lead { get; set; }
}

public enum TaskStatus { Todo = 0, Doing = 1, Done = 2 }
```

#### DTOs
```csharp
public record LeadCreateDto(string Name, string Email, LeadStatus? Status);
public record LeadUpdateDto(string Name, string Email, LeadStatus Status);
public record LeadDto(int Id, string Name, string Email, LeadStatus Status, DateTime CreatedAt, DateTime UpdatedAt, int TasksCount);

public record TaskCreateDto(string Title, DateTime? DueDate, TaskStatus? Status);
public record TaskUpdateDto(string Title, DateTime? DueDate, TaskStatus Status);
public record TaskDto(int Id, int LeadId, string Title, DateTime? DueDate, TaskStatus Status, DateTime CreatedAt, DateTime UpdatedAt);
```

---

### 💻 Frontend (Angular / TypeScript)

#### Models
```ts
export type LeadStatus = 'New' | 'Qualified' | 'Won' | 'Lost';

export interface Lead {
  id: number;
  name: string;
  email: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
  tasksCount?: number;
}

export type TaskStatus = 'Todo' | 'Doing' | 'Done';

export interface TaskItem {
  id: number;
  leadId: number;
  title: string;
  dueDate?: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}
```

---

## 🔌 Endpoints REST

### Base URL
```
http://localhost:5000/api
```

### Leads
| Método | Endpoint | Descrição |
|--------|-----------|-----------|
| GET | `/leads?search=&status=` | Lista com filtros e paginação |
| GET | `/leads/{id}` | Retorna lead + tasks |
| POST | `/leads` | Cria lead |
| PUT | `/leads/{id}` | Atualiza lead |
| DELETE | `/leads/{id}` | Remove lead (hard delete) |

### Tasks
| Método | Endpoint | Descrição |
|--------|-----------|-----------|
| GET | `/leads/{leadId}/tasks` | Lista tasks do lead |
| POST | `/leads/{leadId}/tasks` | Cria task |
| PUT | `/leads/{leadId}/tasks/{taskId}` | Atualiza task |
| DELETE | `/leads/{leadId}/tasks/{taskId}` | Exclui task |

---

## 🖥️ Telas obrigatórias (Angular)
1. **Lista de Leads**  
   - Tabela com Nome, Email, Status, Data e Ações  
   - Filtro por status e campo de busca por nome/email  

2. **Formulário de Lead**  
   - Criar e editar  
   - Validação de campos  

3. **Tasks do Lead**  
   - CRUD de tarefas (pode ser em uma aba ou na mesma tela)  
   - Permitir mudar status (ex.: dropdown)

---

## 🧰 Stack e Ferramentas
- .NET 8 Web API + EF Core  
- Angular 16+  
- SQLite (ou SQL Server local)  
- UI: Angular Material / Bootstrap / Tailwind (opcional)

---

## 🌟 Bônus (opcionais)
- Soft Delete (`IsDeleted`)  
- Testes unitários (xUnit / Jasmine)  
- Dockerfile ou docker-compose  
- Guardas de rota / Interceptors  (caso opte em implementar algum meio de autenticação/autorização) 
- Paginação real no backend\
  
Obs: Autenticação/Autorização não são requisitos obrigatórios para o teste

---

## 📁 Estrutura sugerida

**Backend**
```
/backend
  /src
    /Api
    /Application
    /Domain
    /Infra
```

**Frontend**
```
/frontend
  /src/app
    /pages/leads
    /pages/lead-detail
    /core/models
    /core/services
    /shared/ui
```

---

## ▶️ Como rodar

### Backend (.NET)
```bash
cd backend
dotnet restore
dotnet ef database update   # se usar EF Core
dotnet run
# API: http://localhost:5000/swagger
```

### Frontend (Angular)
```bash
cd frontend
npm install
npm start
# App: http://localhost:4200
```


---

## 📦 Entrega
- Envie o **link do repositório público no GitHub** (ou ZIP)  
- Inclua um **README** com instruções claras de execução  
- Enviar para helenice.santos@tqsinfo.com.br
  

---

## 🤝 Observações finais
- Pode usar qualquer biblioteca visual (Material, Bootstrap, etc.)  
- Não suba segredos reais; use `.env.example` se necessário  
- Se usar boilerplate, cite no README (sem problemas)
- A vaga não é para UX/UI, mas uma boa apresentação é sugerida
