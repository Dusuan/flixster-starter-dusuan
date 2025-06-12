import './styles/SideBar.css'
const SideBar = ({watchedMovies, likedMovies, setShowSidebar}) => {
    const handleSetHideBar = () => {
        setShowSidebar(false)
    }
    return (<div className="SideBar">
        <div className='SideBarContent'>
        <p>Pluh</p>
        <button onClick={handleSetHideBar}>Close</button>
        </div>
    </div>)
}

export default SideBar