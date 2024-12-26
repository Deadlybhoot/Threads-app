![Screenshot (722)](https://github.com/user-attachments/assets/cbbef831-7459-4ca5-9edb-4436777af134)
## **Architecture of Application**

The user is making a `fetchThread` request through **port 8000**.

### **1. GraphQL API Layer**
- **Queries and Mutations**:
  - **Queries** handle fetching data, such as `FetchThreads`, with resolvers connecting to services or data sources.
  - **Mutations** handle data modifications, such as creating or updating records, with their respective resolvers.

- **GraphQL Schema**: *(The layer before queries & mutations)*  
  Defines the data structure and relationships between entities, such as:
  - **Thread**: Contains fields like `id`, `title`, `description`, and `user`.
  - **User**: Contains fields like `id`, `name`, `email`, and `profile`.

### **2. Service Layer**
- Divided into individual services such as:
  - **Post Service**: Manages thread-related logic.
  - **User Service**: Manages user-related operations.
- Each service encapsulates business logic and acts as an intermediary between the GraphQL resolvers and the database.

### **3. Database Layer**
- **Prisma ORM**:
  - Acts as the bridge between the application and the PostgreSQL database.
  - Simplifies database queries and manages schema migrations.
- **PostgreSQL**:
  - Relational database used to store and manage data.

### **4. Real-Time Communication**
- **Socket.IO**:
  - Used for real-time updates, such as notifying users of new threads or changes.

### **5. External Integration**
- **REST API (gRPC)**:
  - Represents an additional communication layer or service for integrating with external systems.

### **6. Port and Endpoint**
- The GraphQL API is exposed on **PORT:8000** with an endpoint `/graphql`.

---

## **Data Flow**
1. A client sends a GraphQL query (e.g., `FetchThreads`) to `/graphql`.
2. The query is resolved through the appropriate resolver, which invokes a service method (e.g., `PostService.getAllThreads()`).
3. The service interacts with Prisma to fetch or modify data in the PostgreSQL database.
4. The response is sent back to the client.


## **Summary**
 - The Purpose behind this project is to learn How resolvers works, How to make Queries, Mutations in graphQL, How to setup Authentication / Authorization in GraphQL etc
