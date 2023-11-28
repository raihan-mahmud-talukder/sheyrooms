export const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    const logout = () => {
        localStorage.removeItem('currentUser')
        window.location.href ='/login'
    }
    return (
        <nav className="navbar navbar-dark navbar-expand-lg">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">SHEY ROOMS</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto me-5">
                        {user ? (
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {user.name}
                                </button>
                                <ul class="dropdown-menu dropdown-menu-dark">
                                    <li><a class="dropdown-item" href="#">Bookings</a></li>
                                    <li><a class="dropdown-item" href="#" onClick={logout}>Logout</a></li>
                                </ul>
                            </div>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/register">Register</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">Login</a>
                                </li>
                            </>
                        )}

                    </ul>
                </div>
            </div>
        </nav>
    )
}