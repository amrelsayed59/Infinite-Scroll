import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC<any> = () => {
  const [sticky, setSticky] = useState({ isSticky: false, offset: 0 });
  const headerRef = useRef<any>(null);

  // handle scroll event
  const handleScroll = (elTopOffset: number, elHeight: number) => {
    if (window.pageYOffset > elTopOffset + elHeight) {
      setSticky({ isSticky: true, offset: elHeight });
    } else {
      setSticky({ isSticky: false, offset: 0 });
    }
  };

  // add/remove scroll event listener
  useEffect(() => {
    var header = headerRef.current.getBoundingClientRect();
    const handleScrollEvent = () => {
      handleScroll(header.top, header.height);
    };

    window.addEventListener('scroll', handleScrollEvent);

    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

  return (
    <>
      <section style={{ marginTop: sticky.offset }}>
        <header
          className={`header ${sticky.isSticky ? ' sticky' : ''}`}
          ref={headerRef}
        >
          <div>
            <div className="header__box">
              <div className="header__logo">
                <Link to="/">
                  <p className="header__logo-text">JobsNow</p>
                </Link>
              </div>
              <ul className="header__links">
                <Link to="/">
                  <li>Home</li>
                </Link>
                <Link to="/search">
                  <li>Search</li>
                </Link>
                <Link to="/">
                  <li>History</li>
                </Link>
              </ul>
            </div>
          </div>
        </header>
      </section>
    </>
  );
};

export default Header;
