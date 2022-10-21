import { useEffect, useState } from "react";
import { Button, Spinner } from "reactstrap";
import {
    FcBusinessman,
    FcBusinesswoman,
    FcBusinessContact,
    FcCalendar,
    FcCellPhone,
    FcLock,
} from "react-icons/fc";
import { GrMapLocation } from "react-icons/gr";
import { IconContext } from "react-icons";
import "./Main.scss";
import Users from "../Users/Users";

const Main = () => {
    const [user, setUser] = useState({});
    const [selected, setSelected] = useState({});
    const [newUser, setNewUser] = useState(0);
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        fetch("https://randomuser.me/api/")
            .then(x => x.json())
            .then(x => setUser(x));
    }, [newUser]);

    const { results } = user;

    const addUser = () => {
        let newRow = [
            results[0].name.first,
            results[0].email,
            results[0].phone,
            results[0].dob.age,
        ];
        if (!userList.length) return setUserList([newRow]);
        if (newRow.join("") != userList[userList.length - 1].join(""))
            setUserList([...userList, newRow]);
    };

    const handleSelected = arg => {
        if (arg === "dob") {
            setSelected({ age: results[0][arg]["age"] });
        } else if (arg === "password") {
            setSelected({ [arg]: results[0]["login"][arg] });
        } else if (arg === "location") {
            setSelected({ [arg]: `${results[0][arg]["city"]}, ${results[0][arg]["country"]}` });
        } else if (arg === "name") {
            let title = Object.values(results[0].name).join(" ");
            setSelected({ [arg]: `${title}` });
        } else if (arg === "age") {
            setSelected({ [arg]: results[0]["dob"][arg] });
        } else {
            setSelected({ [arg]: results[0][arg] });
        }
    };

    const handleNewUser = () => {
        handleSelected("name");
        setNewUser(newUser + 1);
    };

    return (
        <div className="Main">
            {Object.keys(user).length ? (
                <>
                    <img src={results[0].picture.large} alt={results[0].name.first} />
                    <h3>My {Object.keys(selected)[0] || `name`} is</h3>
                    <h1>
                        {Object.values(selected)[0] || Object.values(results[0].name).join(" ")}
                    </h1>
                    <div className="icons">
                        <IconContext.Provider value={{ size: "4em", className: "icon" }}>
                            {results[0].gender === "female" ? (
                                <FcBusinesswoman onClick={() => handleSelected("name")} />
                            ) : (
                                <FcBusinessman onClick={() => handleSelected("name")} />
                            )}
                            <FcBusinessContact onClick={() => handleSelected("email")} />
                            <FcCalendar onClick={() => handleSelected("age")} />
                            <GrMapLocation onClick={() => handleSelected("location")} />
                            <FcCellPhone onClick={() => handleSelected("phone")} />
                            <FcLock onClick={() => handleSelected("password")} />
                        </IconContext.Provider>
                    </div>
                    <div className="buttons">
                        <Button className="button" onClick={handleNewUser}>
                            New User
                        </Button>
                        <Button className="button" onClick={addUser}>
                            Add User
                        </Button>
                    </div>
                    {userList.length !== 0 ? <Users userList={userList} /> : <></>}
                </>
            ) : (
                <Spinner></Spinner>
            )}
        </div>
    );
};

export default Main;
