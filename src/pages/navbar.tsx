
export const Navbar = (props:any) => {
    return(

        <nav className='navbar'> 

            <div className='logo'>ESZUT</div>

            {/* props.loggedin ? */}
            <button className='navButton'>Admin</button>

            <button className='navButton'>logIn</button>
            
        </nav>  

    )
}
