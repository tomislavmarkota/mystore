import React from 'react'
import '../../App.scss'
import Preloader from '../../assets/preloader.svg'

interface Props {
  dynamicClass: string
}

const Loader: React.FC<Props> = ({dynamicClass}) => {
  return (
    <div className={dynamicClass}>
        <img src={Preloader} alt='preloader'/>
    </div>
  )
}

export default Loader