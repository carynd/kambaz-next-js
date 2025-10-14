import { ListGroup } from "react-bootstrap";
import todos from "./todos.json";
import TodoItem from "./TodoItem";

export default function TodoList() {
    return (
        <>
            <h3>Todo List</h3>
            <ListGroup>
                {todos.map(todo => {
                    return (<TodoItem todo={todo} />);
                })}
            </ListGroup><hr />
        </>
    );
}
