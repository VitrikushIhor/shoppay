import styles from "../styles.module.scss";
import {BsPlusLg} from "react-icons/bs";
import {FaMinus} from "react-icons/fa";
import {useState} from "react";
import Link from "next/link";

export default function Card({category, categoryHandler, replaceQuery}) {
    const [show, setShow] = useState(false);
    const check = replaceQuery("category", category._id);
    return (
        <>
            <section>
                <li onClick={() => categoryHandler(category._id)}>
                    <input
                        type="radio"
                        name="filter"
                        id={category._id}
                        checked={check.active}
                    />
                    <label htmlFor={category._id}>
                        <Link href={""}>{category.name}</Link>
                    </label>
                    <span>{show ? <FaMinus/> : <BsPlusLg/>}</span>
                </li>
            </section>
        </>
    );
}
