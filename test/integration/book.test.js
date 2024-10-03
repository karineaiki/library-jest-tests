const request = require("supertest");
const app = require("../../server");

describe("Book API Integration Tests", () => {
  // Test pour la création d'un nouveau livre
  it("should create a new book", async () => {
    const newBook = { title: "1984", author: "George Orwell", copies: 5 };
    const res = await request(app).post("/books").send(newBook);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id"); // Vérifie que l'ID est retourné
  });

  // Test pour récupérer tous les livres (le code doit être 200 et le retour doit être un tableau)

  it("should retrieve all books", async ()=> {
    const res = await request(app).get("/books");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  })

  // Test pour récupérer un livre spécifique par son ID (le code doit être 200 et le titre du livre doit correspondre au résultat attendu)

  it("should retrive a book by id", async ()=> {
    const res = await request(app).get("/books/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual("1984")
  })
  // Test pour récupérer un livre par un identifiant incorrect (le code doit être 404)
  it("should retrive a book by id", async ()=> {
    const res = await request(app).get("/books/6");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({})
  })

  // Test pour mettre à jour un livre (le code doit être 200 et la propriété "updated" doit être vraie)
  it("should update book", async ()=> {
    const updatedBook = { title: "1985", author: "George Orwell", copies: 5 };
    const res = await request(app).put("/books/1").send(updatedBook);
    expect(res.statusCode).toEqual(200);
    expect(res.body.updated).toEqual(true)
  })

  // Test pour supprimer un livre (le code doit être 200 et la propriété "delete" doit être vraie)
  it("should delete book", async ()=> {
    const res = await request(app).delete("/books/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body.deleted).toBe(true)
  })


});