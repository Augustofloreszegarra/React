import styles from './NavButton.module.css'
import { Link } from 'react-router-dom';

function NavButton ({title, link}){
    return (
        <li className={styles["nav-li"]}>
          <Link className={styles.navA} to={`${link}`}>{title}</Link>
        </li>
    )
}

export default NavButton