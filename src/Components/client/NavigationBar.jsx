import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {toggleTheme} from '../../redux/themeSlice';
import { logoutUser } from '../../redux/authSlice';
import {Navbar,Nav,Button,Badge, Container,Collapse ,Dropdown} from 'react-bootstrap';
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { FiMenu, FiShoppingCart } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { FaUserCircle } from 'react-icons/fa';



const NavigationBar = () => {

  const {theme} = useSelector(state=> state.theme);
  const cartCount = useSelector(state=> state.cart.cartCount);
  const user = useSelector((state)=> state.auth.user);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleToggle = () => setIsMenuOpen(!isMenuOpen);
  
  useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 992) {
      setIsMenuOpen(false); // close menu on large screens
    }
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
  }, []);
 

  return (
    <>
    <Navbar expand="lg" className={`py-2 ${theme}`} fixed='top'>
        <Container fluid className="d-flex justify-content-between align-items-center">

          {/* Logo - Always visible */}
          <Navbar.Brand as={Link} to="/" className='logo fs-3 fw-bold'>
            <img
              src={theme === 'dark' ? '/logo-light.png' : '/logo-dark.png'}
              alt='Shopzy logo'
              style={{ width: '180px', height: '30px' }}
            />
          </Navbar.Brand>

          {/* Cart Icon (Small screen) */}
          <Nav.Link as={Link} to="/cart" className="d-lg-none position-relative">
            <FiShoppingCart size={25} className={theme === 'dark' ? 'text-white' : 'text-dark'} />
            {cartCount > 0 && (
              <Badge bg="success" pill className="position-absolute top-0 start-100 translate-middle">
                {cartCount}
              </Badge>
            )}
          </Nav.Link>

          {/* Login Button (Small screen) */}
         <div className="d-lg-none">
          {user ? (
          <Dropdown align="end" className="mt-2">
          <Dropdown.Toggle variant="" className={`${theme === 'dark' ? 'text-white': 'bg-none'} d-flex align-items-center text-capitalize fw-semibold w-100 border border-2`}>
          <FaUserCircle className="me-2" size={20} />
          {user}
          </Dropdown.Toggle>

          <Dropdown.Menu className="w-100">
          <Dropdown.Item onClick={() => dispatch(logoutUser())}>
            Logout
          </Dropdown.Item>
          </Dropdown.Menu>
          </Dropdown>
          ) : (
          <Nav.Link as={Link} to="/login" className="w-100">
          <Button variant='secondary' className='px-3 fw-bold w-100 mt-2'>Login</Button>
          </Nav.Link>
          )}
         </div>

          {/* Hamburger Menu (Small screen) */}
          <button
            className={` btn p-0 border-0 d-lg-none`}
            type="button"
            onClick={handleToggle}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? (
              <span className={`fs-1 ${theme === 'dark' ? 'text-white' : 'text-dark'}`}><RxCross2 /></span>
            ) : (
              <span className={`fs-1 ${theme === 'dark' ? 'text-white' : 'text-dark'}`}><FiMenu/></span>
            )}
          </button>

          {/* Large screen full navbar */}
          <Navbar.Collapse id="basic-navbar-nav" className="d-none d-lg-flex justify-content-between w-100">

            <div className='ms-auto d-flex align-items-center gap-4'>
               <Nav.Link as={Link} to="/" className={`fs-5 fw-semibold ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>
                  Home
                </Nav.Link>
              {/* Theme Toggle Button */}
              <Button
                variant="outline-none"
                onClick={() => dispatch(toggleTheme())}
                className={`d-flex align-items-center ${theme === 'dark' ? 'text-white' : 'text-dark'}`}
              >
                {theme === 'light' ? <IoMoonOutline size={22} /> : <IoSunnyOutline size={22} />}
              </Button>

              {/* Cart */}
              <Nav.Link as={Link} to="/cart" className="position-relative">
                <FiShoppingCart size={22} className={theme === 'dark' ? 'text-white' : 'text-dark'} />
                {cartCount > 0 && (
                  <Badge bg="success" pill className="position-absolute top-0 start-100 translate-middle">
                    {cartCount}
                  </Badge>
                )}
              </Nav.Link>

              {/* Login Button */}
              {user ? (
              <Dropdown align="end" className='me-4 ms-2'>
              <Dropdown.Toggle variant="" className={`${theme === 'dark' ? 'text-white': 'bg-none'} d-flex align-items-center text-capitalize fw-semibold border border-2 `}>
              <FaUserCircle className="me-2" size={20} />
              {user}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => dispatch(logoutUser())}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
              ) : (
              <Nav.Link as={Link} to="/login" >
                <Button variant='secondary' className='px-3 fw-bold me-4 ms-3'>Login</Button>
              </Nav.Link>
              )}
              
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Collapsible Dropdown (Mobile Only) */}
      <Collapse in={isMenuOpen}>
        <div className={`hamburger-icon ${theme} pb-3 text-center  z-1`}
        style={{width:'7rem',position: 'fixed',top: '4rem', right:'0'}}>
          <Nav className="flex-column mt-5">
            <Nav.Link as={Link} to="/" onClick={handleToggle} className={`fs-5 ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>
              Home
            </Nav.Link>

            <Button
              variant="outline-none"
              onClick={() => {
                dispatch(toggleTheme());
                setIsMenuOpen(false);
              }}
              className={`d-flex justify-content-center align-items-center mt-2 mx-auto ${theme === 'dark' ? 'text-white' : 'text-dark'}`}
            >
              {theme === 'light' ? <IoMoonOutline size={22} /> : <IoSunnyOutline size={22} />}
            </Button>
          </Nav>
        </div>
      </Collapse>
    </>
    
  );
};

export default NavigationBar
