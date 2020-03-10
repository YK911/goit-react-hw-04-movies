import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => (
  <header className={styles.hdr}>
    <nav>
      <ul className={styles.navList}>
        <li>
          <NavLink
            to='/'
            exact
            className={styles.hdrItem}
            activeStyle={{
              fontWeight: 'bold',
              color: 'palevioletred'
            }}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/movies'
            className={styles.hdrItem}
            activeStyle={{
              fontWeight: 'bold',
              color: 'palevioletred'
            }}
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
