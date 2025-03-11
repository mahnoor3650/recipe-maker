import logo from '../assets/logo.png'

export default function Header(){
    return (
      <div className='head'>
        <img src={logo} alt="logo" />
        <h1>Chef Claude</h1>
      </div>
    );
}