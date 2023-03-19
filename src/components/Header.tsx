import React from 'react';
import "../App.scss";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  title: string;
  icon: boolean
}

const Header: React.FC<HeaderProps> = ({ title, icon }) => {

  const navigate = useNavigate();

  return (
    <header className='header'>
      {icon ? <FontAwesomeIcon
              className="icon-header"
              icon={faCircleArrowLeft}
              onClick={() => navigate('/')}
            /> : null}
        <h1>{title}</h1>
    </header>
  );
};

export default Header;