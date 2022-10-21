import { Table } from "reactstrap";

const Users = ({ userList }) => {
    return (
        <Table dark>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Age</th>
                </tr>
            </thead>
            {userList.map((x, i) => {
                return (
                    <tbody key={i}>
                        <tr>
                            <td>{x[0]}</td>
                            <td>{x[1]}</td>
                            <td>{x[2]}</td>
                            <td>{x[3]}</td>
                        </tr>
                    </tbody>
                );
            })}
        </Table>
    );
};

export default Users;
