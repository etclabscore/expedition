const Todos = artifacts.require("./Todos.sol");

contract('Todos', accounts => {
  it("should get the todos", () => {
    return Todos.deployed()
      .then(todosContract => {
        return todosContract.getTodos().then(todos => {
          assert.equal(todos.length, 0, "todos length is not 0");
        });
      });
  });
});
